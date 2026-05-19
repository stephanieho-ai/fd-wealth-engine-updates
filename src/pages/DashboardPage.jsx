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
      {toastMessage && <div className="toast-message">{toastMessage}</div>}

      {treasuryToast && <div className="treasury-toast">{treasuryToast}</div>}

      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">FD Wealth Engine</p>
          <h1>Private Banking Console</h1>
          <p className="muted">
            V33.2-F7B Treasury Policy Breach Engine with liquidity protection,
            reserve threshold monitoring and governance escalation.
          </p>
        </div>

        <div className="hero-alert">
          <span>Policy Engine</span>
          <strong>{treasuryPolicyDecision.severity}</strong>
        </div>
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

      <div className="dashboard-console-grid">
        <AdvisorPanel
          currency={currency}
          targetMonth={nextTargetMonth?.month || "-"}
          weakMonth={weakestMonth?.month || "-"}
          deployable={totalDeployableWithUpcoming}
          bestOffer={bestOffer}
        />

        <div id="maturity-command-section">
          <MaturityAlerts records={safeRecords} currency={currency} />
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

      <div className="dashboard-bottom-grid">
        <div id="treasury-timeline-section">
          <TreasuryTimeline records={safeRecords} currency={currency} />
        </div>

        <div id="policy-breach-section">
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