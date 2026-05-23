import React, { useMemo, useState } from "react";

import TreasuryTimeline from "../components/dashboard/TreasuryTimeline";
import PolicyBreachPanel from "../components/dashboard/PolicyBreachPanel";
import { validateTreasuryPolicies } from "../selectors/policyValidator";

import { writeLedgerEntry } from "../utils/ledgerUtils";

import CapitalPanel from "../components/dashboard/CapitalPanel";
import AdvisorPanel from "../components/dashboard/AdvisorPanel";
import AuditTrail from "../components/dashboard/AuditTrail";
import ExecutionPanel from "../components/dashboard/ExecutionPanel";
import MaturityAlerts from "../components/dashboard/MaturityAlerts";
import SummaryGrid from "../components/dashboard/SummaryGrid";
import TreasuryAlertModal from "../components/dashboard/TreasuryAlertModal";

const treasuryRuntimeStyle = `
@keyframes treasuryPulse {
  0% { transform: scale(1); opacity: 0.85; box-shadow: 0 0 0 rgba(239, 68, 68, 0.22); }
  50% { transform: scale(1.22); opacity: 1; box-shadow: 0 0 18px rgba(239, 68, 68, 0.9); }
  100% { transform: scale(1); opacity: 0.85; box-shadow: 0 0 0 rgba(239, 68, 68, 0.22); }
}

@keyframes treasuryStatusGlow {
  0% { box-shadow: 0 24px 60px rgba(239,68,68,0.12); }
  50% { box-shadow: 0 28px 78px rgba(239,68,68,0.22); }
  100% { box-shadow: 0 24px 60px rgba(239,68,68,0.12); }
}

@keyframes treasurySignalFloat {
  0% { transform: translateY(0); opacity: 0.96; }
  50% { transform: translateY(-1px); opacity: 1; }
  100% { transform: translateY(0); opacity: 0.96; }
}

@keyframes treasuryWallBreathing {
  0% {
    transform: translateY(0px);
    filter: saturate(1);
  }

  50% {
    transform: translateY(-2px);
    filter: saturate(1.04);
  }

  100% {
    transform: translateY(0px);
    filter: saturate(1);
  }
}

.treasury-runtime-shell {
  animation: treasuryWallBreathing 8s ease-in-out infinite;
  transition: all 0.4s ease;
  transform-style: preserve-3d;
}
`;

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function getAmount(record) {
  return toNumber(record?.principal ?? record?.principal_rm ?? record?.amount ?? 0);
}

function isClosed(record) {
  return String(record?.status || "").toUpperCase() === "CLOSED";
}

function normalizeType(record) {
  return String(record?.recordType || record?.type || "FD")
    .toUpperCase()
    .replace(/\s+/g, "_");
}

function isFD(record) {
  return normalizeType(record) === "FD";
}

function isDeployableRecord(record) {
  const type = normalizeType(record);
  return type === "SAVINGS" || type === "PARKING_CASH";
}

function getMaturityDate(record) {
  return record?.maturityDate || record?.maturity_date || record?.maturity || "";
}

function getMonthKey(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "-";

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function daysUntil(dateString) {
  if (!dateString) return null;

  const today = new Date();
  const target = new Date(dateString);

  if (Number.isNaN(target.getTime())) return null;

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  return Math.ceil((target - today) / 86400000);
}

function formatMoney(value, currency = "MYR") {
  return `${currency} ${toNumber(value).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function getBestOffer(offers = []) {
  const activeOffers = offers.filter((offer) => {
    const status = String(offer?.status || "ACTIVE").toUpperCase();
    return status !== "INACTIVE";
  });

  if (!activeOffers.length) return null;

  return activeOffers.reduce((best, current) => {
    const bestRate = toNumber(best?.ratePa ?? best?.rate ?? 0);
    const currentRate = toNumber(current?.ratePa ?? current?.rate ?? 0);
    return currentRate > bestRate ? current : best;
  }, activeOffers[0]);
}

function getCapitalHealthScore({
  totalPortfolio,
  totalFD,
  deployableFunds,
  reserveAmount,
}) {
  if (!totalPortfolio) {
    return {
      score: 0,
      label: "No portfolio data",
      reasons: [
        "Add FD, Savings or Parking Cash records to activate capital health scoring.",
      ],
    };
  }

  const fdRatio = totalFD / totalPortfolio;
  const liquidityRatio = deployableFunds / totalPortfolio;
  const reserveGap =
    deployableFunds >= reserveAmount
      ? 1
      : deployableFunds / Math.max(reserveAmount, 1);

  let score = 70;
  const reasons = [];

  if (fdRatio > 0.9) {
    score -= 20;
    reasons.push("FD concentration is above 90%. Liquidity may be too tight.");
  } else if (fdRatio >= 0.55 && fdRatio <= 0.85) {
    score += 10;
    reasons.push("FD allocation is within a balanced portfolio range.");
  }

  if (liquidityRatio < 0.05) {
    score -= 15;
    reasons.push("Liquidity ratio is below 5% of total portfolio.");
  } else if (liquidityRatio >= 0.08) {
    score += 10;
    reasons.push("Liquidity buffer is healthy relative to total capital.");
  }

  if (reserveGap < 1) {
    score -= 15;
    reasons.push("Deployable funds are below the reserve target.");
  } else {
    reasons.push("Reserve target is currently covered.");
  }

  const finalScore = Math.max(0, Math.min(100, Math.round(score)));

  let label = "Stable";
  if (finalScore >= 80) label = "Healthy";
  else if (finalScore >= 60) label = "Watch";
  else if (finalScore > 0) label = "Needs Attention";

  return {
    score: finalScore,
    label,
    reasons,
  };
}

function getLargestBankExposure(records = [], totalPortfolio = 0) {
  if (!totalPortfolio) {
    return {
      bank: "-",
      amount: 0,
      ratio: 0,
    };
  }

  const bankMap = {};

  records.forEach((record) => {
    const bank = record?.bank || "Unknown Bank";
    bankMap[bank] = (bankMap[bank] || 0) + getAmount(record);
  });

  const bankEntries = Object.entries(bankMap);

  if (!bankEntries.length) {
    return {
      bank: "-",
      amount: 0,
      ratio: 0,
    };
  }

  const [bank, amount] = bankEntries.reduce(
    (largest, current) => (current[1] > largest[1] ? current : largest),
    bankEntries[0]
  );

  return {
    bank,
    amount,
    ratio: amount / totalPortfolio,
  };
}

function getSeverityRank(severity) {
  const rank = {
    SAFE: 0,
    INFO: 1,
    WARNING: 2,
    WATCH: 2,
    HIGH: 3,
    CRITICAL: 4,
    BREACH: 5,
    BLOCKED: 5,
  };

  return rank[String(severity || "SAFE").toUpperCase()] ?? 0;
}

function getTreasuryPolicyBreachEngine({
  totalActivePortfolio,
  totalFixedDeposits,
  totalDeployableFunds,
  reserveAmount,
  largestBankExposure,
  upcomingMaturityAmount,
}) {
  const liquidityRatioPercent = totalActivePortfolio
    ? (totalDeployableFunds / totalActivePortfolio) * 100
    : 0;

  const fdConcentrationPercent = totalActivePortfolio
    ? (totalFixedDeposits / totalActivePortfolio) * 100
    : 0;

  const bankExposurePercent = largestBankExposure?.ratio
    ? largestBankExposure.ratio * 100
    : 0;

  const reserveCoveragePercent = reserveAmount
    ? (totalDeployableFunds / reserveAmount) * 100
    : 100;

  const breaches = [];

  if (totalActivePortfolio <= 0) {
    return {
      severity: "SAFE",
      title: "Treasury Policy Engine Standby",
      message: "Add portfolio records to activate treasury policy monitoring.",
      blocked: false,
      approvalRequired: false,
      escalationRequired: false,
      breaches: [],
      metrics: {
        liquidityRatioPercent,
        fdConcentrationPercent,
        bankExposurePercent,
        reserveCoveragePercent,
      },
    };
  }

  if (liquidityRatioPercent < 5) {
    breaches.push({
      code: "LIQUIDITY_BREACH",
      severity: "BREACH",
      label: "Liquidity below 5%",
      message:
        "Liquidity has fallen below institutional minimum safety threshold.",
    });
  } else if (liquidityRatioPercent < 10) {
    breaches.push({
      code: "LIQUIDITY_CRITICAL",
      severity: "CRITICAL",
      label: "Liquidity below 10%",
      message:
        "Liquidity buffer is critically low and may affect treasury flexibility.",
    });
  } else if (liquidityRatioPercent < 15) {
    breaches.push({
      code: "LIQUIDITY_WARNING",
      severity: "WARNING",
      label: "Liquidity below 15%",
      message:
        "Liquidity buffer is below recommended treasury monitoring threshold.",
    });
  }

  if (fdConcentrationPercent > 90) {
    breaches.push({
      code: "FD_CONCENTRATION_HIGH",
      severity: "HIGH",
      label: "FD concentration above 90%",
      message:
        "Too much capital is locked in FD positions, reducing liquidity flexibility.",
    });
  }

  if (reserveAmount > 0 && totalDeployableFunds < reserveAmount) {
    breaches.push({
      code: "RESERVE_SHORTFALL",
      severity: "CRITICAL",
      label: "Reserve target not covered",
      message:
        "Deployable funds are below reserve target. Treasury reserve protection is required.",
    });
  }

  if (bankExposurePercent > 70) {
    breaches.push({
      code: "BANK_EXPOSURE_HIGH",
      severity: "HIGH",
      label: "Single bank exposure above 70%",
      message:
        "Largest bank concentration is high. Diversification review is recommended.",
    });
  }

  if (upcomingMaturityAmount <= 0 && liquidityRatioPercent < 15) {
    breaches.push({
      code: "MATURITY_GAP_RISK",
      severity: "WARNING",
      label: "Low liquidity with no upcoming maturity",
      message:
        "No near-term FD maturity detected to support liquidity recovery.",
    });
  }

  const highestSeverity =
    breaches.reduce((highest, item) => {
      return getSeverityRank(item.severity) > getSeverityRank(highest)
        ? item.severity
        : highest;
    }, "SAFE") || "SAFE";

  const blocked =
    highestSeverity === "BREACH" ||
    (highestSeverity === "CRITICAL" && totalDeployableFunds < reserveAmount);

  return {
    severity: highestSeverity,
    title:
      highestSeverity === "SAFE"
        ? "Treasury Policy Stable"
        : "Treasury Policy Breach Detected",
    message:
      highestSeverity === "SAFE"
        ? "Treasury position is within current policy thresholds."
        : breaches[0]?.message ||
          "Treasury policy monitoring detected risk conditions.",
    blocked,
    approvalRequired: getSeverityRank(highestSeverity) >= getSeverityRank("HIGH"),
    escalationRequired:
      getSeverityRank(highestSeverity) >= getSeverityRank("CRITICAL"),
    breaches,
    metrics: {
      liquidityRatioPercent,
      fdConcentrationPercent,
      bankExposurePercent,
      reserveCoveragePercent,
    },
  };
}

function getTreasuryIntelligenceModel({
  totalActivePortfolio,
  totalFixedDeposits,
  totalDeployableFunds,
  totalDeployableWithUpcoming,
  reserveAmount,
  liquidityBuffer,
  upcomingMaturityAmount,
  fdExposureRatio,
  liquidityRatio,
  largestBankExposure,
  weakestMonth,
  strongestMonth,
  treasuryPolicyDecision,
}) {
  if (!totalActivePortfolio) {
    return {
      score: 0,
      level: "STANDBY",
      outlook: "NO DATA",
      forecastSignal: "Portfolio records are required before intelligence scoring can begin.",
      liquidityProjection: "No active capital available for projection.",
      stabilityLevel: "Standby",
      riskOutlook: "No treasury risk detected because no active portfolio exists.",
      reasoning: [
        "Add FD, Savings or Parking Cash records to activate Treasury Intelligence.",
        "Once records exist, the system will evaluate liquidity, concentration, reserve coverage and maturity balance.",
      ],
      actions: ["Add records", "Set reserve target", "Review capital structure"],
      metrics: {
        liquidityScore: 0,
        reserveScore: 0,
        concentrationScore: 0,
        maturityScore: 0,
        policyScore: 0,
      },
    };
  }

  const liquidityPercent = liquidityRatio * 100;
  const fdConcentrationPercent = fdExposureRatio * 100;
  const bankExposurePercent = (largestBankExposure?.ratio || 0) * 100;
  const reserveCoveragePercent = reserveAmount
    ? (totalDeployableFunds / reserveAmount) * 100
    : 100;

  const liquidityScore =
    liquidityPercent >= 20
      ? 95
      : liquidityPercent >= 15
      ? 85
      : liquidityPercent >= 10
      ? 70
      : liquidityPercent >= 5
      ? 45
      : 20;

  const reserveScore =
    reserveCoveragePercent >= 150
      ? 95
      : reserveCoveragePercent >= 100
      ? 85
      : reserveCoveragePercent >= 75
      ? 60
      : reserveCoveragePercent >= 50
      ? 40
      : 20;

  const concentrationScore =
    fdConcentrationPercent > 92
      ? 30
      : fdConcentrationPercent > 85
      ? 50
      : fdConcentrationPercent >= 55
      ? 88
      : fdConcentrationPercent >= 30
      ? 78
      : 65;

  const bankExposureScore =
    bankExposurePercent > 75
      ? 35
      : bankExposurePercent > 60
      ? 55
      : bankExposurePercent > 45
      ? 75
      : 90;

  const maturityScore =
    weakestMonth && strongestMonth
      ? strongestMonth.amount > 0 &&
        weakestMonth.amount / Math.max(strongestMonth.amount, 1) >= 0.65
        ? 88
        : strongestMonth.amount > 0 &&
          weakestMonth.amount / Math.max(strongestMonth.amount, 1) >= 0.35
        ? 68
        : 48
      : 55;

  const policyScore = treasuryPolicyDecision?.blocked
    ? 25
    : treasuryPolicyDecision?.escalationRequired
    ? 45
    : treasuryPolicyDecision?.approvalRequired
    ? 62
    : 88;

  const score = Math.round(
    liquidityScore * 0.24 +
      reserveScore * 0.22 +
      concentrationScore * 0.18 +
      bankExposureScore * 0.12 +
      maturityScore * 0.12 +
      policyScore * 0.12
  );

  let level = "STABLE";
  if (score >= 85) level = "INTELLIGENTLY STABLE";
  else if (score >= 72) level = "STABLE";
  else if (score >= 58) level = "WATCH";
  else if (score >= 42) level = "DEFENSIVE";
  else level = "CRITICAL";

  let outlook = "BALANCED";
  if (treasuryPolicyDecision?.blocked) outlook = "RESTRICTED";
  else if (liquidityPercent < 8) outlook = "LIQUIDITY PRESSURE";
  else if (fdConcentrationPercent > 90) outlook = "LOCKED CAPITAL RISK";
  else if (totalDeployableWithUpcoming > totalDeployableFunds * 1.5)
    outlook = "MATURITY SUPPORTED";
  else if (score >= 85) outlook = "STRONG";

  const reasoning = [];

  if (liquidityPercent < 10) {
    reasoning.push(
      "Liquidity is below preferred treasury comfort range. The system should reduce aggressive deployment."
    );
  } else {
    reasoning.push(
      "Liquidity remains within an acceptable operating range for current treasury monitoring."
    );
  }

  if (reserveAmount > 0 && totalDeployableFunds < reserveAmount) {
    reasoning.push(
      "Reserve target is not fully covered. Treasury should prioritize reserve restoration before new placement."
    );
  } else {
    reasoning.push(
      "Reserve coverage is currently supported by available deployable capital."
    );
  }

  if (fdConcentrationPercent > 90) {
    reasoning.push(
      "FD concentration is high. Capital is efficient for yield but less flexible during liquidity pressure."
    );
  } else {
    reasoning.push(
      "FD concentration is not currently breaching the strongest treasury lock-up threshold."
    );
  }

  if (treasuryPolicyDecision?.blocked) {
    reasoning.push(
      "Policy engine is blocking execution. Intelligence layer recommends governance review before action."
    );
  } else if (treasuryPolicyDecision?.approvalRequired) {
    reasoning.push(
      "Policy engine allows monitoring but requires higher review before aggressive deployment."
    );
  } else {
    reasoning.push(
      "Policy engine is not blocking treasury execution at this moment."
    );
  }

  const forecastSignal =
    liquidityPercent < 8
      ? "Forecast: liquidity pressure may continue unless maturity recovery or fresh savings increases deployable funds."
      : upcomingMaturityAmount > 0
      ? "Forecast: upcoming maturity will strengthen deployable capital and improve short-term treasury flexibility."
      : fdConcentrationPercent > 90
      ? "Forecast: high FD lock-up may reduce response speed if emergency liquidity is needed."
      : "Forecast: treasury position is stable under current portfolio structure.";

  const liquidityProjection =
    totalDeployableWithUpcoming > totalDeployableFunds
      ? "Liquidity projection improves with upcoming maturity support."
      : liquidityPercent >= 15
      ? "Liquidity projection remains comfortable under current reserve setting."
      : "Liquidity projection should be monitored because deployable funds are limited.";

  const stabilityLevel =
    score >= 85
      ? "Institutional Stable"
      : score >= 72
      ? "Operational Stable"
      : score >= 58
      ? "Monitoring Required"
      : score >= 42
      ? "Defensive Mode"
      : "Critical Governance";

  const riskOutlook =
    treasuryPolicyDecision?.blocked
      ? "Risk outlook is restricted because policy engine has blocked deployment."
      : liquidityPercent < 10
      ? "Risk outlook is liquidity-sensitive. Avoid large deployment until reserve improves."
      : fdConcentrationPercent > 90
      ? "Risk outlook is concentration-sensitive. Consider staggered maturity recovery."
      : "Risk outlook is manageable. Continue monitoring maturity ladder and reserve coverage.";

  const actions = [];

  if (treasuryPolicyDecision?.blocked) {
    actions.push("Resolve policy block");
  }

  if (totalDeployableFunds < reserveAmount) {
    actions.push("Restore reserve coverage");
  }

  if (liquidityPercent < 10) {
    actions.push("Pause aggressive deployment");
  }

  if (fdConcentrationPercent > 90) {
    actions.push("Reduce FD lock-up concentration");
  }

  if (weakestMonth?.month) {
    actions.push(`Strengthen weak maturity month ${weakestMonth.month}`);
  }

  if (!actions.length) {
    actions.push("Maintain current treasury structure");
    actions.push("Continue maturity monitoring");
  }

  return {
    score,
    level,
    outlook,
    forecastSignal,
    liquidityProjection,
    stabilityLevel,
    riskOutlook,

    reasoning,
    actions,
    metrics: {
      liquidityScore,
      reserveScore,
      concentrationScore,
      bankExposureScore,
      maturityScore,
      policyScore,
    },
  };
}

function IntelligenceMetric({ label, value, note }) {
  return (
    <div
      style={{
        border: "1px solid rgba(148, 163, 184, 0.24)",
        borderRadius: 18,
        padding: 14,
        background: "rgba(15, 23, 42, 0.04)",
      }}
    >
      <div style={{ fontSize: 11, opacity: 0.72, textTransform: "uppercase" }}>
        {label}
      </div>
      <strong style={{ display: "block", fontSize: 22, marginTop: 6 }}>
        {value}
      </strong>
      {note && (
        <p style={{ margin: "6px 0 0", fontSize: 12, opacity: 0.72 }}>{note}</p>
      )}
    </div>
  );
}

function TreasuryIntelligencePanel({
  currency,
  formatMoney,
  totalActivePortfolio,
  totalFixedDeposits,
  totalDeployableFunds,
  totalDeployableWithUpcoming,
  reserveAmount,
  liquidityBuffer,
  upcomingMaturityAmount,
  fdExposureRatio,
  liquidityRatio,
  largestBankExposure,
  weakestMonth,
  strongestMonth,
  treasuryPolicyDecision,
}) {
  const intelligence = useMemo(
    () =>
      getTreasuryIntelligenceModel({
        totalActivePortfolio,
        totalFixedDeposits,
        totalDeployableFunds,
        totalDeployableWithUpcoming,
        reserveAmount,
        liquidityBuffer,
        upcomingMaturityAmount,
        fdExposureRatio,
        liquidityRatio,
        largestBankExposure,
        weakestMonth,
        strongestMonth,
        treasuryPolicyDecision,
      }),
    [
      totalActivePortfolio,
      totalFixedDeposits,
      totalDeployableFunds,
      totalDeployableWithUpcoming,
      reserveAmount,
      liquidityBuffer,
      upcomingMaturityAmount,
      fdExposureRatio,
      liquidityRatio,
      largestBankExposure,
      weakestMonth,
      strongestMonth,
      treasuryPolicyDecision,
    ]
  );

  const scoreTone =
    intelligence.level === "CRITICAL" || intelligence.level === "DEFENSIVE"
      ? {
          background: "linear-gradient(135deg, #fff1f2, #ffe4e6)",
          borderColor: "rgba(244, 63, 94, 0.32)",
          color: "#9f1239",
        }
      : intelligence.level === "WATCH"
      ? {
          background: "linear-gradient(135deg, #fffbeb, #fef3c7)",
          borderColor: "rgba(245, 158, 11, 0.36)",
          color: "#92400e",
        }
      : {
          background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
          borderColor: "rgba(16, 185, 129, 0.32)",
          color: "#065f46",
        };

  const commandMetrics = [
    {
      label: "Risk Outlook",
      value: intelligence.outlook,
      note: intelligence.stabilityLevel,
      style: {
        background: "linear-gradient(135deg, #fff1f2, #ffe4e6)",
        borderColor: "rgba(244, 63, 94, 0.25)",
      },
    },
    {
      label: "Deployable Now",
      value: formatMoney(totalDeployableFunds, currency),
      note: "Current liquidity base",
      style: {
        background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
        borderColor: "rgba(59, 130, 246, 0.22)",
      },
    },
    {
      label: "With Upcoming FD",
      value: formatMoney(totalDeployableWithUpcoming, currency),
      note: "Projected liquidity support",
      style: {
        background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
        borderColor: "rgba(34, 197, 94, 0.22)",
      },
    },
    {
      label: "Policy Status",
      value: treasuryPolicyDecision?.severity || "SAFE",
      note: treasuryPolicyDecision?.blocked
        ? "Execution restricted"
        : "Execution governance active",
      style: {
        background: "linear-gradient(135deg, #fef2f2, #fee2e2)",
        borderColor: "rgba(239, 68, 68, 0.24)",
      },
    },
  ];

  const scoreMetrics = [
    ["Liquidity", intelligence.metrics.liquidityScore],
    ["Reserve", intelligence.metrics.reserveScore],
    ["Concentration", intelligence.metrics.concentrationScore],
    ["Maturity", intelligence.metrics.maturityScore],
    ["Policy", intelligence.metrics.policyScore],
  ];

  return (
    <section
      className="treasury-intelligence-panel treasury-intelligence-horizontal"
      style={{
        width: "100%",
        border: "1px solid rgba(148, 163, 184, 0.28)",
        borderRadius: 30,
        padding: 28,
        margin: "28px 0",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(239,246,255,0.96))",
        boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 150px",
          gap: 24,
          alignItems: "start",
          marginBottom: 22,
        }}
      >
        <div>
          <p className="eyebrow" style={{ margin: "0 0 8px" }}>
            V33.2-G12 Treasury Intelligence
          </p>
          <h2 style={{ margin: 0, fontSize: 34, lineHeight: 1.05 }}>
            Intelligence Command Center
          </h2>
          <p className="muted" style={{ marginTop: 10, maxWidth: 760 }}>
            Horizontal treasury intelligence layer for AI reasoning, liquidity
            forecast, risk scoring and predictive orchestration.
          </p>
        </div>

        <div
          style={{
            textAlign: "center",
            border: "1px solid rgba(148, 163, 184, 0.28)",
            borderRadius: 24,
            padding: "16px 18px",
            ...scoreTone,
          }}
        >
          <div style={{ fontSize: 11, opacity: 0.75 }}>INTELLIGENCE SCORE</div>
          <strong style={{ display: "block", fontSize: 40, lineHeight: 1 }}>
            {intelligence.score}
          </strong>
          <div style={{ fontSize: 12, marginTop: 7 }}>{intelligence.level}</div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 18,
          marginBottom: 16,
        }}
      >
        {commandMetrics.map((metric) => (
          <div
            key={metric.label}
            style={{
              border: "1px solid rgba(148, 163, 184, 0.22)",
              borderRadius: 22,
              padding: "20px 22px",
              ...metric.style,
            }}
          >
            <div
              style={{
                fontSize: 12,
                opacity: 0.72,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 8,
              }}
            >
              {metric.label}
            </div>
            <strong style={{ display: "block", fontSize: 32, lineHeight: 1.05 }}>
              {metric.value}
            </strong>
            <p className="muted" style={{ margin: "8px 0 0", fontSize: 12 }}>
              {metric.note}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.25fr 0.9fr 0.9fr",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(99, 102, 241, 0.18)",
            borderRadius: 22,
            padding: 18,
            background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
          }}
        >
          <strong>AI Treasury Reasoning</strong>
          <ul style={{ margin: "10px 0 0", paddingLeft: 18 }}>
            {intelligence.reasoning.map((item, index) => (
              <li key={`${item}-${index}`} style={{ marginBottom: 6 }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            border: "1px solid rgba(59, 130, 246, 0.2)",
            borderRadius: 22,
            padding: 18,
            background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
          }}
        >
          <strong>Forecast Signal</strong>
          <p className="muted" style={{ marginTop: 10 }}>
            {intelligence.forecastSignal}
          </p>
          <strong style={{ display: "block", marginTop: 14 }}>
            Liquidity Projection
          </strong>
          <p className="muted" style={{ marginBottom: 0 }}>
            {intelligence.liquidityProjection}
          </p>
        </div>

        <div
          style={{
            border: "1px solid rgba(168, 85, 247, 0.18)",
            borderRadius: 22,
            padding: 18,
            background: "linear-gradient(135deg, #faf5ff, #eef2ff)",
          }}
        >
          <strong>Recommended Orchestration</strong>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            {intelligence.actions.map((action) => (
              <span
                key={action}
                style={{
                  border: "1px solid rgba(99, 102, 241, 0.22)",
                  borderRadius: 999,
                  padding: "6px 10px",
                  fontSize: 12,
                  background: "rgba(255, 255, 255, 0.72)",
                }}
              >
                {action}
              </span>
            ))}
          </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(110px, 1fr))",
                gap: 10,
                marginTop: 16,
              }}
            >
          
            {scoreMetrics.map(([label, value]) => (
              <div
                key={label}
                style={{
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: 14,
                  padding: 10,
                  background: "rgba(255,255,255,0.7)",
                }}
              >
           <div
              style={{
                fontSize: 9,
                opacity: 0.65,
                textTransform: "uppercase",
                lineHeight: 1.2,
                letterSpacing: "0.04em",
                wordBreak: "break-word",
              }}
            >
              {label}
            </div>
                <strong style={{ display: "block", fontSize: 20, marginTop: 4 }}>
                  {value}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="muted" style={{ marginTop: 14, marginBottom: 0, fontSize: 12 }}>
        {intelligence.riskOutlook}
      </p>
    </section>
  );
}


export default function DashboardPage({
  records = [],
  offers = [],
  currency = "MYR",
  settings = {},
  onUndoExecution,
  onAddRecord,
  onDeleteRecord,
  onUpdateRecord,
}) {
  const [reserveAmount, setReserveAmount] = useState(
    toNumber(settings?.reserveAmount ?? 0)
  );

  const [toastMessage, setToastMessage] = useState("");
  const [treasuryToast, setTreasuryToast] = useState("");
  const [activeAlert, setActiveAlert] = useState(null);

  const safeRecords = Array.isArray(records) ? records : [];
  const safeOffers = Array.isArray(offers) ? offers : [];

  const activeRecords = useMemo(
    () => safeRecords.filter((record) => !isClosed(record)),
    [safeRecords]
  );

  const activeFDRecords = useMemo(
    () => activeRecords.filter((record) => isFD(record)),
    [activeRecords]
  );

  const deployableRecords = useMemo(
    () => activeRecords.filter((record) => isDeployableRecord(record)),
    [activeRecords]
  );

  const totalActivePortfolio = useMemo(
    () => activeRecords.reduce((sum, record) => sum + getAmount(record), 0),
    [activeRecords]
  );

  const totalFixedDeposits = useMemo(
    () => activeFDRecords.reduce((sum, record) => sum + getAmount(record), 0),
    [activeFDRecords]
  );

  const totalSavings = useMemo(
    () =>
      activeRecords
        .filter((record) => normalizeType(record) === "SAVINGS")
        .reduce((sum, record) => sum + getAmount(record), 0),
    [activeRecords]
  );

  const totalParkingCash = useMemo(
    () =>
      activeRecords
        .filter((record) => normalizeType(record) === "PARKING_CASH")
        .reduce((sum, record) => sum + getAmount(record), 0),
    [activeRecords]
  );

  const totalDeployableFunds = useMemo(
    () => deployableRecords.reduce((sum, record) => sum + getAmount(record), 0),
    [deployableRecords]
  );

  const fdExposureRatio = totalActivePortfolio
    ? totalFixedDeposits / totalActivePortfolio
    : 0;

  const liquidityRatio = totalActivePortfolio
    ? totalDeployableFunds / totalActivePortfolio
    : 0;

  const largestBankExposure = useMemo(
    () => getLargestBankExposure(activeRecords, totalActivePortfolio),
    [activeRecords, totalActivePortfolio]
  );

  const maturityMap = useMemo(() => {
    const map = {};

    activeFDRecords.forEach((record) => {
      const key = getMonthKey(getMaturityDate(record));
      if (key === "-") return;
      map[key] = (map[key] || 0) + getAmount(record);
    });

    return map;
  }, [activeFDRecords]);

  const maturityMonths = useMemo(() => {
    return Object.entries(maturityMap)
      .map(([month, amount]) => ({
        month,
        amount,
        totalPrincipal: amount,
        totalFdAmount: amount,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [maturityMap]);

  const strongestMonth = useMemo(() => {
    if (!maturityMonths.length) return null;

    return maturityMonths.reduce(
      (best, item) => (item.amount > best.amount ? item : best),
      maturityMonths[0]
    );
  }, [maturityMonths]);

  const weakestMonth = useMemo(() => {
    if (!maturityMonths.length) return null;

    return maturityMonths.reduce(
      (weak, item) => (item.amount < weak.amount ? item : weak),
      maturityMonths[0]
    );
  }, [maturityMonths]);

  const upcomingMaturityAmount = useMemo(() => {
    return activeFDRecords.reduce((sum, record) => {
      const days = daysUntil(getMaturityDate(record));

      if (days !== null && days >= 0 && days <= 30) {
        return sum + getAmount(record);
      }

      return sum;
    }, 0);
  }, [activeFDRecords]);

  const totalDeployableWithUpcoming =
    totalDeployableFunds + upcomingMaturityAmount;

  const idleCash = Math.max(totalDeployableFunds - reserveAmount, 0);
  const liquidityBuffer = totalDeployableFunds;

  const nextTargetMonth = weakestMonth || maturityMonths[0] || null;
  const bestOffer = getBestOffer(safeOffers);

  const capitalHealth = useMemo(
    () =>
      getCapitalHealthScore({
        totalPortfolio: totalActivePortfolio,
        totalFD: totalFixedDeposits,
        deployableFunds: totalDeployableFunds,
        reserveAmount,
      }),
    [
      totalActivePortfolio,
      totalFixedDeposits,
      totalDeployableFunds,
      reserveAmount,
    ]
  );

  const capitalSignal = useMemo(() => {
    if (!totalActivePortfolio) return "neutral";

    if (totalDeployableFunds < reserveAmount) return "danger";
    if (fdExposureRatio > 0.9) return "moderate";
    if (idleCash > 0) return "healthy";

    return "stable";
  }, [
    totalActivePortfolio,
    totalDeployableFunds,
    reserveAmount,
    fdExposureRatio,
    idleCash,
  ]);

  const notificationCount = useMemo(() => {
    return activeFDRecords.filter((record) => {
      const days = daysUntil(getMaturityDate(record));
      return days !== null && days <= 7;
    }).length;
  }, [activeFDRecords]);

  const validatorDecision = useMemo(
    () =>
      validateTreasuryPolicies({
        deploymentAmount: totalDeployableFunds,
        deployableAmount: totalDeployableFunds,
        reserveAmount,
        liquidityRatio: liquidityRatio * 100,
        highestBankExposureRatio: largestBankExposure.ratio * 100,
      }),
    [
      totalDeployableFunds,
      reserveAmount,
      liquidityRatio,
      largestBankExposure.ratio,
    ]
  );

  const treasuryBreachEngine = useMemo(
    () =>
      getTreasuryPolicyBreachEngine({
        totalActivePortfolio,
        totalFixedDeposits,
        totalDeployableFunds,
        reserveAmount,
        largestBankExposure,
        upcomingMaturityAmount,
      }),
    [
      totalActivePortfolio,
      totalFixedDeposits,
      totalDeployableFunds,
      reserveAmount,
      largestBankExposure,
      upcomingMaturityAmount,
    ]
  );

  const treasuryPolicyDecision = useMemo(() => {
    const validatorSeverity = String(validatorDecision?.severity || "SAFE").toUpperCase();
    const breachSeverity = String(treasuryBreachEngine?.severity || "SAFE").toUpperCase();

    const finalSeverity =
      getSeverityRank(breachSeverity) > getSeverityRank(validatorSeverity)
        ? breachSeverity
        : validatorSeverity;

    return {
      ...validatorDecision,
      ...treasuryBreachEngine,
      severity: finalSeverity,
      allowed:
        !validatorDecision?.blocked &&
        !treasuryBreachEngine?.blocked &&
        finalSeverity !== "BREACH",
      blocked:
        Boolean(validatorDecision?.blocked) ||
        Boolean(treasuryBreachEngine?.blocked),
      approvalRequired:
        Boolean(validatorDecision?.approvalRequired) ||
        Boolean(treasuryBreachEngine?.approvalRequired),
      escalationRequired:
        Boolean(validatorDecision?.escalationRequired) ||
        Boolean(treasuryBreachEngine?.escalationRequired),
      policyVersion: validatorDecision?.policyVersion || "F7B-POLICY-BREACH",
      source: "F7B Treasury Policy Breach Engine",
    };
  }, [validatorDecision, treasuryBreachEngine]);

  const treasuryAlerts = useMemo(() => {
    const alerts = [];

    if (liquidityRatio < 0.05) {
      alerts.push({
        level: "critical",
        label: "LIQUIDITY CRITICAL",
        title: "Treasury Liquidity Alert",
        message:
          "Liquidity ratio has fallen below treasury reserve threshold. Immediate liquidity review is recommended.",
        metrics: [
          {
            label: "Liquidity Ratio",
            value: `${(liquidityRatio * 100).toFixed(1)}%`,
          },
          {
            label: "Deployable Funds",
            value: formatMoney(totalDeployableFunds, currency),
          },
          {
            label: "Reserve Target",
            value: formatMoney(reserveAmount, currency),
          },
        ],
        actions: [
          "Review liquidity buffer",
          "Pause deployment",
          "Increase reserve capital",
        ],
      });
    }

    if (treasuryPolicyDecision.breaches?.length > 0) {
      alerts.push({
        level:
          treasuryPolicyDecision.severity === "BREACH"
            ? "blocked"
            : treasuryPolicyDecision.severity === "CRITICAL"
            ? "critical"
            : "danger",
        label: `POLICY ${treasuryPolicyDecision.severity}`,
        title: "Treasury Policy Breach Engine",
        message: treasuryPolicyDecision.message,
        metrics: [
          {
            label: "Liquidity Ratio",
            value: `${treasuryPolicyDecision.metrics?.liquidityRatioPercent?.toFixed(
              1
            )}%`,
          },
          {
            label: "FD Concentration",
            value: `${treasuryPolicyDecision.metrics?.fdConcentrationPercent?.toFixed(
              1
            )}%`,
          },
          {
            label: "Largest Bank Exposure",
            value: `${treasuryPolicyDecision.metrics?.bankExposurePercent?.toFixed(
              1
            )}%`,
          },
        ],
        records: treasuryPolicyDecision.breaches.map((breach) => ({
          id: breach.code,
          bank: breach.severity,
          date: breach.label,
          amount: breach.message,
        })),
        actions: [
          "Review treasury policy",
          "Review liquidity buffer",
          "Reduce concentration risk",
          "Increase reserve capital",
        ],
      });
    }

    const overdueRecords = activeFDRecords.filter((record) => {
      const days = daysUntil(getMaturityDate(record));
      return days !== null && days < 0;
    });

    if (overdueRecords.length > 0) {
      alerts.push({
        level: "danger",
        label: `${overdueRecords.length} FD OVERDUE`,
        title: "FD Maturity Escalation",
        message:
          "One or more FD positions have matured and require treasury action.",
        metrics: [
          {
            label: "Overdue Positions",
            value: overdueRecords.length,
          },
          {
            label: "Affected Capital",
            value: formatMoney(
              overdueRecords.reduce((sum, record) => sum + getAmount(record), 0),
              currency
            ),
          },
        ],
        records: overdueRecords.map((record) => ({
          id: record.id,
          bank: record.bank,
          date: getMaturityDate(record),
          amount: formatMoney(getAmount(record), currency),
        })),
        actions: ["Review matured FD", "Move to savings", "Redeploy capital"],
      });
    }

    if (upcomingMaturityAmount > 0) {
      const nextRecords = activeFDRecords
        .filter((record) => {
          const days = daysUntil(getMaturityDate(record));
          return days !== null && days >= 0 && days <= 30;
        })
        .slice(0, 5);

      alerts.push({
        level: "info",
        label: `NEXT MATURITY ${formatMoney(upcomingMaturityAmount, currency)}`,
        title: "Upcoming Treasury Maturity",
        message:
          "Upcoming maturity events detected within treasury operational window.",
        metrics: [
          {
            label: "Upcoming Capital",
            value: formatMoney(upcomingMaturityAmount, currency),
          },
          {
            label: "Affected Records",
            value: nextRecords.length,
          },
        ],
        records: nextRecords.map((record) => ({
          id: record.id,
          bank: record.bank,
          date: getMaturityDate(record),
          amount: formatMoney(getAmount(record), currency),
        })),
        actions: [
          "Prepare reinvestment",
          "Review maturity ladder",
          "Monitor timeline",
        ],
      });
    }

    if (treasuryPolicyDecision.blocked) {
      alerts.push({
        level: "blocked",
        label: "POLICY ENGINE BLOCKED",
        title: "Treasury Governance Block",
        message: "Treasury policy engine has restricted deployment execution.",
        metrics: [
          {
            label: "Liquidity Ratio",
            value: `${(liquidityRatio * 100).toFixed(1)}%`,
          },
          {
            label: "FD Exposure",
            value: `${(fdExposureRatio * 100).toFixed(1)}%`,
          },
          {
            label: "Largest Bank",
            value: `${largestBankExposure.bank}`,
          },
        ],
        actions: [
          "Review treasury policy",
          "Reduce concentration risk",
          "Increase liquidity ratio",
        ],
      });
    }

    return alerts;
  }, [
    liquidityRatio,
    totalDeployableFunds,
    reserveAmount,
    activeFDRecords,
    upcomingMaturityAmount,
    treasuryPolicyDecision,
    currency,
    fdExposureRatio,
    largestBankExposure,
  ]);

  const handleExecuteDeployment = () => {
   if (treasuryPolicyDecision.blocked) {
  setToastMessage(
    `Execution blocked by Treasury Policy Engine: ${treasuryPolicyDecision.severity}`
  );

  setTimeout(() => {
    setToastMessage("");
  }, 3000);

  return;
}

    if (idleCash <= 0) {
      setToastMessage("No deployable idle cash available.");
      return;
    }

    let remainingAmount = idleCash;

    const sourceBreakdown = deployableRecords
      .map((record) => {
        if (remainingAmount <= 0) return null;

        const availableAmount = getAmount(record);
        const usedAmount = Math.min(availableAmount, remainingAmount);

        remainingAmount -= usedAmount;

        return {
          id: record.id,
          bank: record.bank,
          recordType: normalizeType(record),
          amount: usedAmount,
        };
      })
      .filter(Boolean);

    const executionRecord = {
      id: `AUTO-${Date.now()}`,
      bank: bestOffer?.bank || "Suggested FD",
      principal: idleCash,
      rate: bestOffer?.rate || 0,
      tenureMonths: bestOffer?.tenureMonths || 6,
      startDate: new Date().toISOString().split("T")[0],
      maturityDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6)
        .toISOString()
        .split("T")[0],
      status: "ACTIVE",
      tag: "AUTO_EXECUTED",
      recordType: "FD",
      sourceBreakdown,
    };

    sourceBreakdown.forEach((source) => {
      const originalRecord = safeRecords.find((record) => record.id === source.id);
      if (!originalRecord) return;

      const newAmount = getAmount(originalRecord) - Number(source.amount || 0);

      onUpdateRecord?.({
        ...originalRecord,
        principal: Math.max(newAmount, 0),
        amount: Math.max(newAmount, 0),
        note: `${originalRecord.note || ""} | Used for execution ${
          executionRecord.id
        }`,
      });
    });

    onAddRecord?.(executionRecord);

    writeLedgerEntry({
      type: "EXECUTE",
      amount: getAmount(executionRecord),
      currency,
      recordId: executionRecord.id,
      sourceBreakdown,
      note: "Auto execution created FD from deployable capital.",
    });

    window.dispatchEvent(new Event("ledgerUpdated"));

    const auditEntry = {
      id: `AUDIT-${Date.now()}`,
      type: "EXECUTE",
      amount: idleCash,
      currency,
      batchId: executionRecord.id,
      timestamp: new Date().toISOString(),
      governanceSeverity: treasuryPolicyDecision.severity,
      policyVersion: treasuryPolicyDecision.policyVersion,
      approvalRequired: treasuryPolicyDecision.approvalRequired,
      escalationRequired: treasuryPolicyDecision.escalationRequired,
      blocked: treasuryPolicyDecision.blocked,
      breachCount: treasuryPolicyDecision.breaches?.length || 0,
    };

    const existingAudit = JSON.parse(
      localStorage.getItem("fd_execution_history") || "[]"
    );

    localStorage.setItem(
      "fd_execution_history",
      JSON.stringify([...existingAudit, auditEntry])
    );

    window.dispatchEvent(new Event("auditTrailUpdated"));

    setToastMessage(
      `Execution completed. ${currency} ${idleCash.toLocaleString()} deployed.`
    );

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handleUndoExecution = () => {
    const autoRecords = safeRecords.filter(
      (record) => record.tag === "AUTO_EXECUTED"
    );

    if (!autoRecords.length) {
      setToastMessage("No auto execution to undo.");
      return;
    }

    const latestAutoRecord = autoRecords[autoRecords.length - 1];

    onDeleteRecord?.(latestAutoRecord.id);

    (latestAutoRecord.sourceBreakdown || []).forEach((source) => {
      const originalRecord = safeRecords.find((record) => record.id === source.id);
      if (!originalRecord) return;

      const restoredAmount = getAmount(originalRecord) + Number(source.amount || 0);

      onUpdateRecord?.({
        ...originalRecord,
        principal: restoredAmount,
        amount: restoredAmount,
        note: `${originalRecord.note || ""} | Restored from undo ${
          latestAutoRecord.id
        }`,
      });
    });

    writeLedgerEntry({
      type: "UNDO",
      amount: getAmount(latestAutoRecord),
      currency,
      recordId: latestAutoRecord.id,
      sourceBreakdown: latestAutoRecord.sourceBreakdown || [],
      note: "Undo reversed auto execution and restored original source balances.",
    });

    window.dispatchEvent(new Event("ledgerUpdated"));

    const auditEntry = {
      id: `AUDIT-${Date.now()}`,
      type: "UNDO",
      amount: getAmount(latestAutoRecord),
      currency,
      batchId: latestAutoRecord.id,
      timestamp: new Date().toISOString(),
    };

    const existingAudit = JSON.parse(
      localStorage.getItem("fd_execution_history") || "[]"
    );

    localStorage.setItem(
      "fd_execution_history",
      JSON.stringify([...existingAudit, auditEntry])
    );

    window.dispatchEvent(new Event("auditTrailUpdated"));

    setToastMessage(
      `Undo completed. ${currency} ${getAmount(
        latestAutoRecord
      ).toLocaleString()} reversed.`
    );

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const treasuryHeatmapItems = useMemo(() => {
    const today = new Date();
    const nextSixMonths = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(today.getFullYear(), today.getMonth() + index, 1);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    });

    const strongestAmount = Math.max(
      ...maturityMonths.map((item) => toNumber(item.amount)),
      1
    );

    return nextSixMonths.map((month) => {
      const maturity = maturityMonths.find((item) => item.month === month);
      const amount = toNumber(maturity?.amount ?? 0);
      const ratioToStrongest = amount / strongestAmount;

      let status = "LOW";
      let color = "#2563eb";
      let bg = "rgba(59,130,246,0.10)";
      let border = "rgba(59,130,246,0.16)";
      let note = "Thin maturity support. Monitor liquidity dependency.";

      if (amount <= 0 && totalActivePortfolio > 0) {
        status = "GAP";
        color = "#dc2626";
        bg = "rgba(220,38,38,0.10)";
        border = "rgba(220,38,38,0.18)";
        note = "No maturity support detected in this treasury cycle.";
      } else if (ratioToStrongest < 0.25) {
        status = "CRITICAL";
        color = "#dc2626";
        bg = "rgba(220,38,38,0.12)";
        border = "rgba(220,38,38,0.18)";
        note = "Weak maturity month with limited liquidity recovery.";
      } else if (ratioToStrongest < 0.5) {
        status = "WATCH";
        color = "#ea580c";
        bg = "rgba(234,88,12,0.12)";
        border = "rgba(234,88,12,0.18)";
        note = "Maturity support exists but remains below comfort range.";
      } else if (ratioToStrongest >= 0.85) {
        status = "HIGH";
        color = "#f59e0b";
        bg = "rgba(245,158,11,0.12)";
        border = "rgba(245,158,11,0.18)";
        note = "High maturity concentration. Review redeployment timing.";
      } else {
        status = "NORMAL";
        color = "#16a34a";
        bg = "rgba(22,163,74,0.10)";
        border = "rgba(22,163,74,0.16)";
        note = "Balanced maturity support for this cycle.";
      }

      return {
        month,
        status,
        amount,
        color,
        bg,
        border,
        note,
      };
    });
  }, [maturityMonths, totalActivePortfolio]);

  const heatmapSystemHeat = useMemo(() => {
    const criticalCount = treasuryHeatmapItems.filter((item) =>
      ["GAP", "CRITICAL"].includes(item.status)
    ).length;

    const highCount = treasuryHeatmapItems.filter((item) =>
      ["HIGH", "WATCH"].includes(item.status)
    ).length;

    if (treasuryPolicyDecision.blocked || criticalCount >= 2) {
      return {
        label: "HIGH",
        color: "#dc2626",
        bg: "rgba(220,38,38,0.10)",
        border: "rgba(220,38,38,0.18)",
      };
    }

    if (highCount >= 2) {
      return {
        label: "WATCH",
        color: "#ea580c",
        bg: "rgba(234,88,12,0.10)",
        border: "rgba(234,88,12,0.18)",
      };
    }

    return {
      label: "STABLE",
      color: "#16a34a",
      bg: "rgba(22,163,74,0.10)",
      border: "rgba(22,163,74,0.16)",
    };
  }, [treasuryHeatmapItems, treasuryPolicyDecision.blocked]);

  const summaryItems = [
    {
      label: "Active Portfolio",
      value: formatMoney(totalActivePortfolio, currency),
      note: "Total active capital",
    },
    {
      label: "FD Alerts",
      value: notificationCount,
      note: "Due / upcoming alerts",
    },
    {
      label: "Capital Health",
      value: `${capitalHealth.score}/100`,
      note: capitalHealth.label,
    },
    {
      label: "Policy Engine",
      value: treasuryPolicyDecision.severity,
      note: treasuryPolicyDecision.allowed
        ? "Treasury governance active"
        : "Deployment restriction active",
    },
  ];

  return (
    <main className="dashboard-page">
      <style>{treasuryRuntimeStyle}</style>

      {toastMessage && <div className="toast-message">{toastMessage}</div>}

      {treasuryToast && <div className="treasury-toast">{treasuryToast}</div>}

      <section
        className="dashboard-hero treasury-monitoring-wall treasury-runtime-shell"
        style={{
          display: "block",
          position: "relative",
          overflow: "hidden",
          isolation: "isolate",
          borderRadius: 44,
          padding: "48px 46px",
          marginBottom: 28,
          background:
            treasuryPolicyDecision.blocked
              ? "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(254,242,242,0.96), rgba(254,226,226,0.92), rgba(255,228,230,0.90))"
              : treasuryPolicyDecision.severity === "WARNING" ||
                treasuryPolicyDecision.severity === "WATCH"
              ? "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,251,235,0.96), rgba(254,243,199,0.92), rgba(255,237,213,0.90))"
              : "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(241,245,249,0.96), rgba(219,234,254,0.92), rgba(224,231,255,0.90))",
          border: treasuryPolicyDecision.blocked
            ? "1px solid rgba(239,68,68,0.16)"
            : treasuryPolicyDecision.severity === "WARNING" ||
              treasuryPolicyDecision.severity === "WATCH"
            ? "1px solid rgba(245,158,11,0.16)"
            : "1px solid rgba(59,130,246,0.16)",
          boxShadow: treasuryPolicyDecision.blocked
            ? "0 50px 120px rgba(127,29,29,0.12), 0 20px 60px rgba(239,68,68,0.12), inset 0 1px 0 rgba(255,255,255,0.72)"
            : treasuryPolicyDecision.severity === "WARNING" ||
              treasuryPolicyDecision.severity === "WATCH"
            ? "0 50px 120px rgba(120,53,15,0.10), 0 20px 60px rgba(245,158,11,0.10), inset 0 1px 0 rgba(255,255,255,0.72)"
            : "0 40px 100px rgba(15,23,42,0.08), 0 12px 40px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.72)",
          backdropFilter: "blur(26px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              treasuryPolicyDecision.blocked
                ? "radial-gradient(circle at top right, rgba(239,68,68,0.16), transparent 34%), radial-gradient(circle at bottom left, rgba(251,113,133,0.12), transparent 32%)"
                : treasuryPolicyDecision.severity === "WARNING" ||
                  treasuryPolicyDecision.severity === "WATCH"
                ? "radial-gradient(circle at top right, rgba(245,158,11,0.14), transparent 34%), radial-gradient(circle at bottom left, rgba(251,191,36,0.10), transparent 32%)"
                : "radial-gradient(circle at top right, rgba(37,99,235,0.16), transparent 34%), radial-gradient(circle at bottom left, rgba(16,185,129,0.10), transparent 32%)",
            pointerEvents: "none",
            zIndex: 0,
            filter: "blur(12px)",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, minmax(130px, 1fr))",
            gap: 14,
            marginBottom: 26,
            position: "relative",
            zIndex: 2,
          }}
        >
          {[
            {
              label: "LIQUIDITY",
              value: liquidityRatio < 0.1 ? "CRITICAL" : "STABLE",
              color: liquidityRatio < 0.1 ? "#dc2626" : "#2563eb",
              glow:
                liquidityRatio < 0.1
                  ? "rgba(220,38,38,0.16)"
                  : "rgba(37,99,235,0.12)",
            },
            {
              label: "TREASURY HEAT",
              value: fdExposureRatio > 0.9 ? "HIGH" : "NORMAL",
              color: fdExposureRatio > 0.9 ? "#f59e0b" : "#16a34a",
              glow:
                fdExposureRatio > 0.9
                  ? "rgba(245,158,11,0.14)"
                  : "rgba(22,163,74,0.12)",
            },
            {
              label: "RESERVE",
              value: totalDeployableFunds <= reserveAmount ? "TIGHT" : "HEALTHY",
              color: totalDeployableFunds <= reserveAmount ? "#ea580c" : "#2563eb",
              glow:
                totalDeployableFunds <= reserveAmount
                  ? "rgba(234,88,12,0.14)"
                  : "rgba(37,99,235,0.12)",
            },
            {
              label: "DEPLOYMENT",
              value: treasuryPolicyDecision.blocked ? "PAUSED" : "ACTIVE",
              color: treasuryPolicyDecision.blocked ? "#dc2626" : "#16a34a",
              glow: treasuryPolicyDecision.blocked
                ? "rgba(220,38,38,0.16)"
                : "rgba(22,163,74,0.12)",
            },
            {
              label: "POLICY",
              value: treasuryPolicyDecision.severity,
              color:
                treasuryPolicyDecision.severity === "BLOCKED" ||
                treasuryPolicyDecision.severity === "CRITICAL" ||
                treasuryPolicyDecision.blocked
                  ? "#dc2626"
                  : "#2563eb",
              glow:
                treasuryPolicyDecision.severity === "BLOCKED" ||
                treasuryPolicyDecision.severity === "CRITICAL" ||
                treasuryPolicyDecision.blocked
                  ? "rgba(220,38,38,0.16)"
                  : "rgba(37,99,235,0.12)",
            },
            {
              label: "CONFIDENCE",
              value: treasuryPolicyDecision.blocked ? "LOW" : "STABLE",
              color: treasuryPolicyDecision.blocked ? "#dc2626" : "#16a34a",
              glow: treasuryPolicyDecision.blocked
                ? "rgba(220,38,38,0.16)"
                : "rgba(22,163,74,0.12)",
            },
          ].map((signal) => (
            <div
              key={signal.label}
              style={{
                borderRadius: 18,
                padding: "14px 16px",
                background: signal.glow,
                border: `1px solid ${signal.glow}`,
                backdropFilter: "blur(10px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
                animation: "treasurySignalFloat 3.6s infinite ease-in-out",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  color: "#64748b",
                  marginBottom: 8,
                  whiteSpace: "nowrap",
                }}
              >
                {signal.label}
              </div>

              <div
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: signal.color,
                  lineHeight: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {signal.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 300px",
            gap: 30,
            alignItems: "stretch",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(219,234,254,0.92)",
                border: "1px solid rgba(59,130,246,0.18)",
                marginBottom: 18,
                boxShadow: "0 10px 24px rgba(37,99,235,0.10)",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background:
                    treasuryPolicyDecision.severity === "BREACH" ||
                    treasuryPolicyDecision.severity === "CRITICAL" ||
                    treasuryPolicyDecision.blocked
                      ? "#ef4444"
                      : treasuryPolicyDecision.severity === "WARNING" ||
                        treasuryPolicyDecision.severity === "WATCH"
                      ? "#f59e0b"
                      : "#22c55e",
                  boxShadow:
                    treasuryPolicyDecision.severity === "BREACH" ||
                    treasuryPolicyDecision.severity === "CRITICAL" ||
                    treasuryPolicyDecision.blocked
                      ? "0 0 14px rgba(239,68,68,0.75)"
                      : treasuryPolicyDecision.severity === "WARNING" ||
                        treasuryPolicyDecision.severity === "WATCH"
                      ? "0 0 14px rgba(245,158,11,0.72)"
                      : "0 0 14px rgba(34,197,94,0.72)",
                  animation: "treasuryPulse 2.2s infinite ease-in-out",
                }}
              />

              <span
                style={{
                  color: "#1d4ed8",
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  fontWeight: 800,
                }}
              >
                LIVE TREASURY MONITORING
              </span>
            </div>

            <p
              className="eyebrow"
              style={{
                color: "#2563eb",
                marginBottom: 12,
                letterSpacing: "0.10em",
              }}
            >
              FD WEALTH ENGINE · TREASURY COMMAND CENTER
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: 52,
                lineHeight: 1,
                color: "#0f172a",
                letterSpacing: "-0.045em",
                textShadow: "0 1px 0 rgba(255,255,255,0.75)",
              }}
            >
              Treasury Operations Wall
            </h1>

            <p
              style={{
                marginTop: 18,
                maxWidth: 780,
                color: "#475569",
                fontSize: 15,
                lineHeight: 1.7,
              }}
            >
              Real-time treasury monitoring environment for liquidity supervision,
              deployment governance, operational escalation and institutional capital
              orchestration.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(220px, 1fr))",
                gap: 18,
                marginTop: 28,
              }}
            >
              {[
                {
                  label: "ACTIVE FD",
                  value: activeFDRecords.length,
                },
                {
                  label: "LIQUIDITY",
                  value: `${(liquidityRatio * 100).toFixed(1)}%`,
                },
                {
                  label: "DEPLOYABLE",
                  value: formatMoney(totalDeployableFunds, currency),
                },
                {
                  label: "RISK",
                  value: treasuryPolicyDecision.severity,
                },
                {
                  label: "ALERTS",
                  value: treasuryAlerts.length,
                },
                {
                  label: "POLICY",
                  value: treasuryPolicyDecision.blocked ? "BLOCKED" : "ACTIVE",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    borderRadius: 20,
                    padding: "20px 22px",
                    background: "rgba(255,255,255,0.78)",
                    border: "1px solid rgba(148,163,184,0.20)",
                    boxShadow:
                      "0 16px 36px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.74)",
                    backdropFilter: "blur(14px)",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "#64748b",
                      marginBottom: 8,
                      letterSpacing: "0.07em",
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </div>

                  <strong
                    style={{
                      display: "block",
                      color:
                        item.label === "POLICY" && item.value === "BLOCKED"
                          ? "#dc2626"
                          : item.label === "RISK" &&
                            (item.value === "BREACH" ||
                              item.value === "CRITICAL" ||
                              item.value === "BLOCKED")
                          ? "#dc2626"
                          : "#0f172a",
                      fontSize: 26,
                      lineHeight: 1.05,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.value}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              borderRadius: 30,
              padding: "24px 24px",
              background:
                treasuryPolicyDecision.severity === "BREACH" ||
                treasuryPolicyDecision.severity === "CRITICAL" ||
                treasuryPolicyDecision.blocked
                  ? "linear-gradient(135deg, rgba(254,242,242,0.98), rgba(255,228,230,0.92))"
                  : treasuryPolicyDecision.severity === "WARNING" ||
                    treasuryPolicyDecision.severity === "WATCH"
                  ? "linear-gradient(135deg, rgba(255,251,235,0.98), rgba(254,243,199,0.92))"
                  : "linear-gradient(135deg, rgba(236,253,245,0.98), rgba(209,250,229,0.92))",
              border:
                treasuryPolicyDecision.severity === "BREACH" ||
                treasuryPolicyDecision.severity === "CRITICAL" ||
                treasuryPolicyDecision.blocked
                  ? "1px solid rgba(239,68,68,0.22)"
                  : treasuryPolicyDecision.severity === "WARNING" ||
                    treasuryPolicyDecision.severity === "WATCH"
                  ? "1px solid rgba(245,158,11,0.24)"
                  : "1px solid rgba(16,185,129,0.22)",
              boxShadow:
                treasuryPolicyDecision.severity === "BREACH" ||
                treasuryPolicyDecision.severity === "CRITICAL" ||
                treasuryPolicyDecision.blocked
                  ? "0 24px 60px rgba(239,68,68,0.14)"
                  : treasuryPolicyDecision.severity === "WARNING" ||
                    treasuryPolicyDecision.severity === "WATCH"
                  ? "0 24px 60px rgba(245,158,11,0.12)"
                  : "0 24px 60px rgba(16,185,129,0.12)",
              animation:
                treasuryPolicyDecision.severity === "BREACH" ||
                treasuryPolicyDecision.severity === "CRITICAL" ||
                treasuryPolicyDecision.blocked
                  ? "treasuryStatusGlow 3.4s infinite ease-in-out"
                  : "none",
              backdropFilter: "blur(14px)",
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "#64748b",
                  letterSpacing: "0.09em",
                  marginBottom: 10,
                  fontWeight: 800,
                }}
              >
                TREASURY STATUS
              </div>

              <strong
                style={{
                  display: "block",
                  fontSize: 38,
                  color:
                    treasuryPolicyDecision.severity === "BREACH" ||
                    treasuryPolicyDecision.severity === "CRITICAL" ||
                    treasuryPolicyDecision.blocked
                      ? "#b91c1c"
                      : treasuryPolicyDecision.severity === "WARNING" ||
                        treasuryPolicyDecision.severity === "WATCH"
                      ? "#b45309"
                      : "#047857",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                {treasuryPolicyDecision.severity}
              </strong>

              <p
                style={{
                  marginTop: 14,
                  marginBottom: 0,
                  fontSize: 13,
                  color: "#475569",
                  lineHeight: 1.65,
                }}
              >
                {treasuryPolicyDecision.blocked
                  ? "Treasury governance restriction active. Deployment requires review before execution."
                  : "Treasury operations remain within monitored policy thresholds."}
              </p>
            </div>

            <div
              style={{
                marginTop: 22,
                paddingTop: 16,
                borderTop: "1px solid rgba(148,163,184,0.22)",
                fontSize: 12,
                color: "#64748b",
                lineHeight: 1.55,
              }}
            >
              <strong style={{ color: "#334155" }}>Last Treasury Scan</strong>
              <br />
              {new Date().toLocaleString()}
            </div>
          </div>
        </div>


        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              treasuryPolicyDecision.blocked
                ? "radial-gradient(circle at 78% 20%, rgba(239,68,68,0.12), transparent 28%), radial-gradient(circle at 8% 88%, rgba(251,113,133,0.08), transparent 30%)"
                : treasuryPolicyDecision.severity === "WARNING" ||
                  treasuryPolicyDecision.severity === "WATCH"
                ? "radial-gradient(circle at 78% 20%, rgba(245,158,11,0.10), transparent 28%), radial-gradient(circle at 8% 88%, rgba(251,191,36,0.08), transparent 30%)"
                : "radial-gradient(circle at 78% 20%, rgba(59,130,246,0.10), transparent 28%), radial-gradient(circle at 8% 88%, rgba(16,185,129,0.08), transparent 30%)",
            zIndex: 0,
            pointerEvents: "none",
            filter: "blur(14px)",
          }}
        />
      </section>

      {treasuryAlerts.length > 0 && (
        <section className="treasury-alert-ribbon">
          {treasuryAlerts.map((alert, index) => (
            <button
              key={`${alert.label}-${index}`}
              type="button"
              className={`treasury-alert-pill ${alert.level}`}
              onClick={() => setActiveAlert(alert)}
            >
              {alert.label}
            </button>
          ))}
        </section>
      )}

      <SummaryGrid items={summaryItems} />

      <div id="capital-engine-section">
        <CapitalPanel
          currency={currency}
          reserveAmount={reserveAmount}
          setReserveAmount={setReserveAmount}
          capitalHealth={capitalHealth}
          formatMoney={formatMoney}
          totalActivePortfolio={totalActivePortfolio}
          totalFixedDeposits={totalFixedDeposits}
          totalSavings={totalSavings}
          totalParkingCash={totalParkingCash}
          totalDeployableFunds={totalDeployableFunds}
          totalDeployableWithUpcoming={totalDeployableWithUpcoming}
          fdExposureRatio={fdExposureRatio}
          liquidityRatio={liquidityRatio}
          largestBankExposure={largestBankExposure}
          capitalSignal={capitalSignal}
          nextTargetMonth={nextTargetMonth}
          strongestMonth={strongestMonth}
          weakestMonth={weakestMonth}
          idleCash={idleCash}
          liquidityBuffer={liquidityBuffer}
        />
      </div>

      <TreasuryIntelligencePanel
        currency={currency}
        formatMoney={formatMoney}
        totalActivePortfolio={totalActivePortfolio}
        totalFixedDeposits={totalFixedDeposits}
        totalDeployableFunds={totalDeployableFunds}
        totalDeployableWithUpcoming={totalDeployableWithUpcoming}
        reserveAmount={reserveAmount}
        liquidityBuffer={liquidityBuffer}
        upcomingMaturityAmount={upcomingMaturityAmount}
        fdExposureRatio={fdExposureRatio}
        liquidityRatio={liquidityRatio}
        largestBankExposure={largestBankExposure}
        weakestMonth={weakestMonth}
        strongestMonth={strongestMonth}
        treasuryPolicyDecision={treasuryPolicyDecision}
      />

      <section
  className="treasury-operations-workspace"
  style={{
    width: "100%",
    marginTop: 36,
    padding: 30,
    borderRadius: 36,
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(239,246,255,0.92))",
    border: "1px solid rgba(148, 163, 184, 0.18)",
    boxShadow: "0 30px 70px rgba(15, 23, 42, 0.08)",
    overflow: "hidden",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
      gap: 20,
      flexWrap: "wrap",
    }}
  >
    <div>
      <p
        className="eyebrow"
        style={{
          margin: "0 0 8px",
        }}
      >
        TREASURY OPERATIONS DESK
      </p>

      <h2
        style={{
          margin: 0,
          fontSize: 34,
          lineHeight: 1.05,
        }}
      >
        Institutional Treasury Workspace
      </h2>

      <p
        className="muted"
        style={{
          marginTop: 10,
          maxWidth: 720,
        }}
      >
        Operational treasury coordination layer for deployment execution,
        maturity monitoring, liquidity orchestration and governance oversight.
      </p>
    </div>

    <div
      style={{
        minWidth: 160,
        borderRadius: 24,
        padding: "16px 20px",
        background:
          "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(99,102,241,0.14))",
        border: "1px solid rgba(59,130,246,0.16)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          opacity: 0.7,
          marginBottom: 6,
          letterSpacing: "0.05em",
        }}
      >
        ACTIVE OPERATIONS
      </div>

      <strong
        style={{
          fontSize: 34,
          lineHeight: 1,
          display: "block",
        }}
      >
        4
      </strong>

      <div
        style={{
          fontSize: 12,
          marginTop: 6,
          opacity: 0.72,
        }}
      >
        Treasury modules online
      </div>
    </div>
  </div>

  <div
    className="dashboard-console-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1.1fr 0.92fr 0.92fr",
        gap: 24,
        alignItems: "start",
        alignContent: "start",
        width: "100%",
      }}
    >
      <AdvisorPanel
        currency={currency}
        targetMonth={nextTargetMonth?.month || "-"}
        weakMonth={weakestMonth?.month || "-"}
        deployable={totalDeployableWithUpcoming}
        bestOffer={bestOffer}
      />

      <div id="maturity-command-section">
        <MaturityAlerts
          records={safeRecords}
          currency={currency}
        />
      </div>

      <div id="execution-section">
        <ExecutionPanel
          currency={currency}
          upcomingMaturityAmount={upcomingMaturityAmount}
          idleCash={idleCash}
          onExecute={handleExecuteDeployment}
          onUndoExecution={handleUndoExecution}
          treasuryPolicyDecision={treasuryPolicyDecision}
        />
      </div>

      <AuditTrail />
    </div>
  </section>


      <section
        className="dashboard-section treasury-heatmap-engine"
        style={{
          marginTop: 40,
          width: "100%",
          maxWidth: 1600,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 36,
            padding: "34px 32px",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(248,250,252,0.93), rgba(239,246,255,0.88))",
            border: "1px solid rgba(255,255,255,0.72)",
            boxShadow:
              "0 30px 80px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.76)",
            backdropFilter: "blur(22px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                heatmapSystemHeat.label === "HIGH"
                  ? "radial-gradient(circle at top right, rgba(239,68,68,0.12), transparent 32%)"
                  : heatmapSystemHeat.label === "WATCH"
                  ? "radial-gradient(circle at top right, rgba(245,158,11,0.12), transparent 32%)"
                  : "radial-gradient(circle at top right, rgba(37,99,235,0.10), transparent 32%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 22,
              marginBottom: 28,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  color: "#4f46e5",
                  marginBottom: 8,
                }}
              >
                V33.2-G17 · TREASURY HEATMAP ENGINE
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: 36,
                  fontWeight: 900,
                  color: "#0f172a",
                  letterSpacing: "-0.035em",
                }}
              >
                Treasury Maturity Heatmap
              </h2>

              <p
                style={{
                  marginTop: 10,
                  maxWidth: 820,
                  color: "#64748b",
                  fontSize: 15,
                  lineHeight: 1.7,
                }}
              >
                Monitor maturity pressure, liquidity imbalance and deployment
                concentration across upcoming treasury cycles.
              </p>
            </div>

            <div
              style={{
                minWidth: 160,
                borderRadius: 24,
                padding: "18px 22px",
                background: heatmapSystemHeat.bg,
                border: `1px solid ${heatmapSystemHeat.border}`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.62)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  color: "#64748b",
                  marginBottom: 8,
                }}
              >
                SYSTEM HEAT
              </div>

              <div
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color: heatmapSystemHeat.color,
                  lineHeight: 1,
                }}
              >
                {heatmapSystemHeat.label}
              </div>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(140px, 1fr))",
              gap: 18,
            }}
          >
            {treasuryHeatmapItems.map((heat) => (
              <div
                key={heat.month}
                style={{
                  borderRadius: 26,
                  padding: "22px 18px",
                  background: heat.bg,
                  border: `1px solid ${heat.border}`,
                  minHeight: 180,
                  boxShadow:
                    "0 18px 42px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.62)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    color: "#64748b",
                    marginBottom: 18,
                  }}
                >
                  {heat.month}
                </div>

                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: heat.color,
                    marginBottom: 14,
                    lineHeight: 1,
                  }}
                >
                  {heat.status}
                </div>

                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#0f172a",
                    marginBottom: 12,
                  }}
                >
                  {formatMoney(heat.amount, currency)}
                </div>

                <div
                  style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "#64748b",
                  }}
                >
                  {heat.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className="dashboard-bottom-grid"
        style={{
          width: "100%",
          maxWidth: 1600,
          margin: "40px auto 0",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 36,
          alignItems: "stretch",
        }}
      >
        <div
          id="treasury-timeline-section"
          style={{
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <TreasuryTimeline records={safeRecords} currency={currency} />
        </div>

        <div
          id="policy-breach-section"
          style={{
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <PolicyBreachPanel decision={treasuryPolicyDecision} />
        </div>
      </div>

      <TreasuryAlertModal
        alert={activeAlert}
        onClose={() => setActiveAlert(null)}
        onAction={(action, payload) => {
          if (action === "Move to savings") {
            const recordsToMove = payload?.records || activeAlert?.records || [];

            if (!recordsToMove.length) {
              setToastMessage("No matured FD record selected.");
              setActiveAlert(null);
              return;
            }

            recordsToMove.forEach((item) => {
              const originalFD = safeRecords.find(
                (record) => record.id === item.id
              );

              if (!originalFD) return;

              const recoveryAmount = getAmount(originalFD);
              const recoveryId = `SAV-${Date.now()}-${item.id}`;

              onUpdateRecord?.({
                ...originalFD,
                status: "CLOSED",
                closedDate: new Date().toISOString().split("T")[0],
                note: `${
                  originalFD.note || ""
                } | Moved to savings via Treasury Recovery Engine`,
              });

              onAddRecord?.({
                id: recoveryId,
                bank: originalFD.bank || "Treasury Savings",
                recordType: "SAVINGS",
                type: "SAVINGS",
                principal: recoveryAmount,
                amount: recoveryAmount,
                status: "ACTIVE",
                startDate: new Date().toISOString().split("T")[0],
                note: `Recovered from matured FD ${originalFD.id}`,
              });

              writeLedgerEntry({
                type: "TREASURY_RECOVERY",
                amount: recoveryAmount,
                currency,
                recordId: recoveryId,
                sourceBreakdown: [
                  {
                    id: originalFD.id,
                    bank: originalFD.bank,
                    recordType: "FD",
                    amount: recoveryAmount,
                  },
                ],
                note: `Matured FD ${originalFD.id} moved to savings.`,
              });
            });

            const auditEntry = {
              id: `AUDIT-${Date.now()}`,
              type: "TREASURY_RECOVERY",
              amount: recordsToMove.reduce((sum, item) => {
                const originalFD = safeRecords.find(
                  (record) => record.id === item.id
                );
                return sum + getAmount(originalFD);
              }, 0),
              currency,
              batchId: `RECOVERY-${Date.now()}`,
              timestamp: new Date().toISOString(),
              note: "Matured FD moved to savings account.",
            };

            const existingAudit = JSON.parse(
              localStorage.getItem("fd_execution_history") || "[]"
            );

            localStorage.setItem(
              "fd_execution_history",
              JSON.stringify([...existingAudit, auditEntry])
            );

            window.dispatchEvent(new Event("ledgerUpdated"));
            window.dispatchEvent(new Event("auditTrailUpdated"));

            setActiveAlert(null);

            setToastMessage(
              `Treasury recovery completed. ${recordsToMove.length} FD moved to savings.`
            );

            setTreasuryToast(
              `✅ Treasury Recovery Completed — ${recordsToMove.length} FD restored to liquidity reserve`
            );

            setTimeout(() => {
              setToastMessage("");
            }, 3000);

            setTimeout(() => {
              setTreasuryToast("");
            }, 4000);

            return;
          }

          const targetMap = {
            "Review liquidity buffer": "capital-engine-section",
            "Increase reserve capital": "capital-engine-section",
            "Pause deployment": "policy-breach-section",

            "Review matured FD": "maturity-command-section",
            "Redeploy capital": "execution-section",

            "Prepare reinvestment": "treasury-timeline-section",
            "Review maturity ladder": "treasury-timeline-section",
            "Monitor timeline": "treasury-timeline-section",

            "Review treasury policy": "policy-breach-section",
            "Reduce concentration risk": "capital-engine-section",
            "Increase liquidity ratio": "capital-engine-section",

            OPEN_RECORD: "maturity-command-section",
          };

          const targetId = targetMap[action];

          setActiveAlert(null);

          setTimeout(() => {
            if (targetId) {
              document.getElementById(targetId)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }

            setToastMessage(`Opened treasury action: ${action}`);

            setTimeout(() => {
              setToastMessage("");
            }, 2500);
          }, 120);
        }}
      />
    </main>
  );
}