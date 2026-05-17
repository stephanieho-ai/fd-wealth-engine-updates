import "../../styles/dashboard/capital-panel.css";

function safeNumber(value) {
  const number = Number(value || 0);
  return Number.isFinite(number) ? number : 0;
}

function getMonthAmount(monthData) {
  return (
    safeNumber(monthData?.amount) ||
    safeNumber(monthData?.totalPrincipal) ||
    safeNumber(monthData?.totalFdAmount)
  );
}

function formatPercent(value) {
  return `${(safeNumber(value) * 100).toFixed(1)}%`;
}

function getExposureLevel(ratio, type = "fd") {
  const value = safeNumber(ratio);

  if (type === "liquidity") {
    if (value < 0.05) return "danger";
    if (value < 0.1) return "warning";
    return "good";
  }

  if (type === "bank") {
    if (value >= 0.7) return "danger";
    if (value >= 0.45) return "warning";
    return "good";
  }

  if (value > 0.9) return "danger";
  if (value > 0.8) return "warning";
  return "good";
}

function getExposureText(level) {
  if (level === "danger") return "Critical";
  if (level === "warning") return "Watch";
  if (level === "good") return "Healthy";
  return "Stable";
}

function getTreasuryStatus({
  fdExposureRatio,
  liquidityRatio,
  bankExposureRatio,
}) {
  if (
    fdExposureRatio > 0.9 ||
    liquidityRatio < 0.03 ||
    bankExposureRatio > 0.7
  ) {
    return {
      level: "danger",
      title: "CRITICAL",
      message:
        "Treasury liquidity is critically constrained and portfolio concentration risk is elevated.",
    };
  }

  if (
    fdExposureRatio > 0.8 ||
    liquidityRatio < 0.08 ||
    bankExposureRatio > 0.45
  ) {
    return {
      level: "warning",
      title: "WATCH",
      message:
        "Treasury exposure levels require monitoring. Liquidity or concentration risk may increase.",
    };
  }

  return {
    level: "good",
    title: "HEALTHY",
    message:
      "Treasury allocation structure is currently balanced with acceptable liquidity coverage.",
  };
}

function getTreasuryRecommendations({
  fdExposureRatio,
  liquidityRatio,
  largestBankExposure,
  totalActivePortfolio,
  totalDeployableFunds,
  reserveAmount,
  currency,
  formatMoney,
}) {
  const recommendations = [];

  const targetLiquidityAmount = totalActivePortfolio * 0.08;
  const liquidityGap = Math.max(targetLiquidityAmount - totalDeployableFunds, 0);

  if (liquidityRatio < 0.05) {
    recommendations.push({
      level: "danger",
      title: "Increase Liquidity Buffer",
      text: `Liquidity is critically low. Consider building at least ${formatMoney(
        liquidityGap,
        currency
      )} additional liquid reserve before further FD deployment.`,
    });
  } else if (liquidityRatio < 0.1) {
    recommendations.push({
      level: "warning",
      title: "Monitor Liquidity Reserve",
      text: "Liquidity is below preferred treasury comfort range. Avoid locking too much new capital until reserve improves.",
    });
  }

  if (fdExposureRatio > 0.9) {
    recommendations.push({
      level: "danger",
      title: "Reduce FD Overexposure",
      text: "FD allocation is above 90% of total portfolio. Future incoming funds should first strengthen Savings or Parking Cash.",
    });
  } else if (fdExposureRatio > 0.8) {
    recommendations.push({
      level: "warning",
      title: "Watch FD Concentration",
      text: "FD exposure is high. New deployments should be balanced with flexible cash and shorter maturity planning.",
    });
  }

  if (safeNumber(largestBankExposure?.ratio) >= 0.7) {
    recommendations.push({
      level: "danger",
      title: "Reduce Single-Bank Concentration",
      text: `${largestBankExposure?.bank || "The largest bank"} holds ${formatPercent(
        largestBankExposure?.ratio
      )} of total capital. Consider diversifying future placement across other banks.`,
    });
  } else if (safeNumber(largestBankExposure?.ratio) >= 0.45) {
    recommendations.push({
      level: "warning",
      title: "Diversify Bank Exposure",
      text: `${largestBankExposure?.bank || "The largest bank"} is above the watch zone. Future FD placement should reduce dependency on one institution.`,
    });
  }

  if (totalDeployableFunds < reserveAmount) {
    recommendations.push({
      level: "danger",
      title: "Reserve Target Not Covered",
      text: "Deployable funds are below the protected reserve amount. Execution should be paused until reserve is restored.",
    });
  }

  if (!recommendations.length) {
    recommendations.push({
      level: "good",
      title: "Treasury Structure Stable",
      text: "Liquidity, FD exposure and bank concentration are currently within acceptable monitoring range.",
    });
  }

  return recommendations;
}

/* =========================
   F6E Stress Simulation
========================= */

function buildScenario({
  name,
  type,
  liquidityChange = 0,
  fdChange = 0,
  totalActivePortfolio,
  totalFixedDeposits,
  totalDeployableFunds,
  largestBankExposure,
  currency,
  formatMoney,
}) {
  const projectedTotal =
    totalActivePortfolio + safeNumber(liquidityChange) + safeNumber(fdChange);

  const projectedFD = totalFixedDeposits + safeNumber(fdChange);
  const projectedLiquidity = totalDeployableFunds + safeNumber(liquidityChange);

  const projectedFdRatio = projectedTotal ? projectedFD / projectedTotal : 0;
  const projectedLiquidityRatio = projectedTotal
    ? projectedLiquidity / projectedTotal
    : 0;

  const projectedStatus = getTreasuryStatus({
    fdExposureRatio: projectedFdRatio,
    liquidityRatio: projectedLiquidityRatio,
    bankExposureRatio: largestBankExposure?.ratio || 0,
  });

  let note = "Scenario projection based on current treasury structure.";

  if (type === "liquidity") {
    note = `Adds ${formatMoney(
      liquidityChange,
      currency
    )} to liquid reserves and tests whether liquidity pressure improves.`;
  }

  if (type === "fd") {
    note = `Deploys additional ${formatMoney(
      fdChange,
      currency
    )} into FD and tests whether locked-capital exposure worsens.`;
  }

  return {
    name,
    type,
    level: projectedStatus.level,
    status: projectedStatus.title,
    projectedTotal,
    projectedFD,
    projectedLiquidity,
    projectedFdRatio,
    projectedLiquidityRatio,
    note,
  };
}

export default function CapitalPanel({
  currency = "MYR",
  reserveAmount = 0,
  setReserveAmount,
  capitalHealth,
  formatMoney,
  totalActivePortfolio = 0,
  totalFixedDeposits = 0,
  totalSavings = 0,
  totalParkingCash = 0,
  totalDeployableFunds = 0,
  totalDeployableWithUpcoming = 0,
  fdExposureRatio = 0,
  liquidityRatio = 0,
  largestBankExposure = {
    bank: "-",
    amount: 0,
    ratio: 0,
  },
  capitalSignal = "neutral",
  nextTargetMonth,
  strongestMonth,
  weakestMonth,
  idleCash = 0,
  liquidityBuffer = 0,
}) {
  const healthScore =
    typeof capitalHealth === "object"
      ? capitalHealth?.score ?? 0
      : capitalHealth ?? 0;

  const healthLabel =
    typeof capitalHealth === "object"
      ? capitalHealth?.label ?? "Capital status"
      : "Capital status";

  const healthReasons =
    typeof capitalHealth === "object" && Array.isArray(capitalHealth?.reasons)
      ? capitalHealth.reasons
      : [];

  const signalClass =
    capitalSignal === "moderate"
      ? "warning"
      : capitalSignal === "healthy"
      ? "good"
      : capitalSignal === "danger"
      ? "danger"
      : "stable";

  const fdExposureLevel = getExposureLevel(fdExposureRatio, "fd");
  const liquidityExposureLevel = getExposureLevel(liquidityRatio, "liquidity");
  const bankExposureLevel = getExposureLevel(largestBankExposure?.ratio, "bank");

  const treasuryStatus = getTreasuryStatus({
    fdExposureRatio,
    liquidityRatio,
    bankExposureRatio: largestBankExposure?.ratio,
  });

  const treasuryRecommendations = getTreasuryRecommendations({
    fdExposureRatio,
    liquidityRatio,
    largestBankExposure,
    totalActivePortfolio,
    totalDeployableFunds,
    reserveAmount,
    currency,
    formatMoney,
  });

  const stressScenarios = [
    buildScenario({
      name: "+50k Liquidity",
      type: "liquidity",
      liquidityChange: 50000,
      totalActivePortfolio,
      totalFixedDeposits,
      totalDeployableFunds,
      largestBankExposure,
      currency,
      formatMoney,
    }),
    buildScenario({
      name: "+100k Liquidity",
      type: "liquidity",
      liquidityChange: 100000,
      totalActivePortfolio,
      totalFixedDeposits,
      totalDeployableFunds,
      largestBankExposure,
      currency,
      formatMoney,
    }),
    buildScenario({
      name: "+50k FD Deployment",
      type: "fd",
      fdChange: 50000,
      totalActivePortfolio,
      totalFixedDeposits,
      totalDeployableFunds,
      largestBankExposure,
      currency,
      formatMoney,
    }),
  ];

  return (
    <section className="dashboard-section capital-panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">V33.2-F6E Treasury Stress Simulation Layer</p>
          <h2>Capital Engine</h2>
          <p className="muted">
            Treasury exposure monitoring with dynamic recommendations and
            stress simulation scenarios.
          </p>
        </div>

        <div className="score-card">
          <span>Risk Monitor</span>
          <strong>{healthScore}/100</strong>
          <small>{healthLabel}</small>
        </div>
      </div>

      <div className={`treasury-banner ${treasuryStatus.level}`}>
        <div>
          <span className="treasury-label">Treasury Status</span>
          <h2>{treasuryStatus.title}</h2>
          <p>{treasuryStatus.message}</p>
        </div>

        <div className="treasury-side-metric">
          <span>Liquidity Ratio</span>
          <strong>{formatPercent(liquidityRatio)}</strong>
        </div>
      </div>

      <div className="treasury-recommendation-panel">
        <div className="section-header compact">
          <div>
            <p className="eyebrow">Private Banker Recommendation</p>
            <h3>Dynamic Treasury Guidance</h3>
            <p className="muted">
              System-generated guidance based on liquidity, FD exposure and
              single-bank concentration.
            </p>
          </div>
        </div>

        <div className="treasury-recommendation-grid">
          {treasuryRecommendations.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className={`treasury-recommendation-card ${item.level}`}
            >
              <span>{item.level}</span>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="treasury-stress-panel">
        <div className="section-header compact">
          <div>
            <p className="eyebrow">Treasury Stress Simulation</p>
            <h3>What-If Scenario Engine</h3>
            <p className="muted">
              Simulates how liquidity and FD deployment changes may affect
              projected treasury status.
            </p>
          </div>
        </div>

        <div className="treasury-stress-grid">
          {stressScenarios.map((scenario) => (
            <div
              key={scenario.name}
              className={`treasury-stress-card ${scenario.level}`}
            >
              <span>{scenario.name}</span>
              <strong>{scenario.status}</strong>

              <div className="stress-metrics">
                <small>
                  Liquidity Ratio
                  <b>{formatPercent(scenario.projectedLiquidityRatio)}</b>
                </small>

                <small>
                  FD Exposure
                  <b>{formatPercent(scenario.projectedFdRatio)}</b>
                </small>

                <small>
                  Projected Liquidity
                  <b>{formatMoney(scenario.projectedLiquidity, currency)}</b>
                </small>
              </div>

              <p>{scenario.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span>Total Capital</span>
          <strong>{formatMoney(totalActivePortfolio, currency)}</strong>
          <small>FD + Savings + Parking Cash</small>
        </div>

        <div className="summary-card">
          <span>Savings</span>
          <strong>{formatMoney(totalSavings, currency)}</strong>
          <small>Available bank savings</small>
        </div>

        <div className="summary-card">
          <span>Parking Cash</span>
          <strong>{formatMoney(totalParkingCash, currency)}</strong>
          <small>Short-term reserve cash</small>
        </div>

        <div className="summary-card">
          <span>Locked FD Capital</span>
          <strong>{formatMoney(totalFixedDeposits, currency)}</strong>
          <small>Currently placed in FD</small>
        </div>
      </div>

      <div className="capital-grid">
        <div className="projection-card">
          <span>Liquidity Buffer</span>
          <strong>{formatMoney(liquidityBuffer, currency)}</strong>
          <small>Reserve and flexible cash layer</small>
        </div>

        <div className="projection-card">
          <span>Deployable Now</span>
          <strong>{formatMoney(totalDeployableFunds, currency)}</strong>
          <small>Available after reserve</small>
        </div>

        <div className="projection-card">
          <span>Reserve Amount</span>
          <input
            type="number"
            min="0"
            step="1000"
            value={reserveAmount}
            onChange={(e) => setReserveAmount?.(safeNumber(e.target.value))}
            placeholder="Example: 20000"
          />
          <small className="muted">
            Protected liquidity that should not be deployed.
          </small>
        </div>

        <div className="projection-card">
          <span>Idle Cash</span>
          <strong>{formatMoney(idleCash, currency)}</strong>
          <small>Savings + Parking Cash after reserve</small>
        </div>

        <div className="projection-card">
          <span>With Upcoming FD</span>
          <strong>{formatMoney(totalDeployableWithUpcoming, currency)}</strong>
          <small>Deployable + next maturity</small>
        </div>

        <div className="projection-card">
          <span>Strongest Month</span>
          <strong>{strongestMonth?.month || "-"}</strong>
          <small>{formatMoney(getMonthAmount(strongestMonth), currency)}</small>
        </div>

        <div className="projection-card">
          <span>Weakest Month</span>
          <strong>{weakestMonth?.month || "-"}</strong>
          <small>{formatMoney(getMonthAmount(weakestMonth), currency)}</small>
        </div>

        <div className="projection-card">
          <span>Next Target Month</span>
          <strong>{nextTargetMonth?.month || "-"}</strong>
          <small>Gap: {formatMoney(nextTargetMonth?.gap || 0, currency)}</small>
        </div>
      </div>

      <div className="section-header" style={{ marginTop: "24px" }}>
        <div>
          <p className="eyebrow">Treasury Exposure Monitor</p>
          <h3>Exposure Ratio Foundation</h3>
          <p className="muted">
            Monitors how much capital is locked, how much remains liquid, and
            whether capital is concentrated in one bank.
          </p>
        </div>
      </div>

      <div className="capital-grid">
        <div className={`projection-card ${fdExposureLevel}`}>
          <span>FD Exposure Ratio</span>
          <strong>{formatPercent(fdExposureRatio)}</strong>
          <small>
            {getExposureText(fdExposureLevel)} · Portion of capital locked in FD
          </small>
        </div>

        <div className={`projection-card ${liquidityExposureLevel}`}>
          <span>Liquidity Ratio</span>
          <strong>{formatPercent(liquidityRatio)}</strong>
          <small>
            {getExposureText(liquidityExposureLevel)} · Savings + Parking Cash
          </small>
        </div>

        <div className={`projection-card ${bankExposureLevel}`}>
          <span>Largest Bank Exposure</span>
          <strong>{largestBankExposure?.bank || "-"}</strong>
          <small>
            {formatPercent(largestBankExposure?.ratio)} ·{" "}
            {formatMoney(largestBankExposure?.amount || 0, currency)}
          </small>
        </div>

        <div className="projection-card stable">
          <span>Exposure Mode</span>
          <strong>Simulation</strong>
          <small>F6E stress engine active</small>
        </div>
      </div>

      <div className={`capital-signal ${signalClass}`}>
        <strong>Capital Intelligence Signal</strong>
        <p>
          {totalDeployableFunds > 20000
            ? `Excess idle capital detected: ${formatMoney(
                totalDeployableFunds,
                currency
              )}. Consider deploying capital into the FD ladder.`
            : totalDeployableFunds >= 5000
            ? `Moderate idle cash detected: ${formatMoney(
                totalDeployableFunds,
                currency
              )}. Monitor upcoming FD opportunities.`
            : totalDeployableFunds > 0
            ? `Healthy liquidity level: ${formatMoney(
                totalDeployableFunds,
                currency
              )}.`
            : "No deployable capital detected yet."}
        </p>
      </div>

      <div className={`capital-signal ${bankExposureLevel}`}>
        <strong>Exposure Intelligence Insight</strong>
        <p>
          FD exposure is currently {formatPercent(fdExposureRatio)}, liquidity
          ratio is {formatPercent(liquidityRatio)}, and the largest bank
          exposure is {largestBankExposure?.bank || "-"} at{" "}
          {formatPercent(largestBankExposure?.ratio)}.
        </p>
      </div>

      {healthReasons.length > 0 && (
        <div className="capital-signal stable">
          <strong>Capital Health Explanation</strong>
          {healthReasons.map((reason, index) => (
            <p key={index}>• {reason}</p>
          ))}
        </div>
      )}

      <div className="capital-signal stable">
        <strong>Banker Intelligence Insight</strong>
        <p>
          {weakestMonth?.month && strongestMonth?.month
            ? `Current strongest maturity concentration is ${strongestMonth.month}, while weakest coverage is ${weakestMonth.month}. Future deployment should improve weaker maturity periods.`
            : "Add more FD records to activate banker intelligence analysis."}
        </p>
      </div>
    </section>
  );
}