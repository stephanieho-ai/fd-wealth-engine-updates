import { useState } from "react";
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

function getTreasuryStatus({ fdExposureRatio, liquidityRatio, bankExposureRatio }) {
  if (fdExposureRatio > 0.9 || liquidityRatio < 0.03 || bankExposureRatio > 0.7) {
    return {
      level: "danger",
      title: "CRITICAL",
      message:
        "Treasury liquidity is critically constrained and portfolio concentration risk is elevated.",
    };
  }

  if (fdExposureRatio > 0.8 || liquidityRatio < 0.08 || bankExposureRatio > 0.45) {
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

  return {
    name,
    type,
    level: projectedStatus.level,
    status: projectedStatus.title,
    projectedLiquidity,
    projectedFdRatio,
    projectedLiquidityRatio,
    note:
      type === "liquidity"
        ? `Adds ${formatMoney(
            liquidityChange,
            currency
          )} to liquid reserves and tests whether liquidity pressure improves.`
        : `Deploys additional ${formatMoney(
            fdChange,
            currency
          )} into FD and tests whether locked-capital exposure worsens.`,
  };
}

function MetricRow({ label, value, tone = "" }) {
  return (
    <div className="capital-engine-row">
      <span>{label}</span>
      <strong className={tone}>{value}</strong>
    </div>
  );
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
  nextTargetMonth,
  strongestMonth,
  weakestMonth,
  idleCash = 0,
  liquidityBuffer = 0,
}) {
  const [showCapitalDetails, setShowCapitalDetails] = useState(false);

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

  const fdExposureLevel = getExposureLevel(fdExposureRatio, "fd");
  const liquidityExposureLevel = getExposureLevel(liquidityRatio, "liquidity");
  const bankExposureLevel = getExposureLevel(largestBankExposure?.ratio, "bank");

  const treasuryStatus = getTreasuryStatus({
    fdExposureRatio,
    liquidityRatio,
    bankExposureRatio: largestBankExposure?.ratio,
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
      <div className="capital-console-grid">
        <div className="capital-engine-compact">
          <div className="capital-card-title">
            <span className="capital-card-icon">♜</span>
            <p>Capital Engine</p>
          </div>

          <div className="capital-engine-table">
            <MetricRow
              label="Total Active Portfolio"
              value={formatMoney(totalActivePortfolio, currency)}
            />
            <MetricRow
              label="Total Fixed Deposits"
              value={formatMoney(totalFixedDeposits, currency)}
            />
            <MetricRow
              label="Deployable Funds (Savings + Parking)"
              value={formatMoney(totalDeployableFunds, currency)}
            />
            <MetricRow
              label="Liquidity Ratio"
              value={formatPercent(liquidityRatio)}
              tone={liquidityExposureLevel === "danger" ? "danger" : ""}
            />
            <MetricRow
              label="FD Exposure Ratio"
              value={formatPercent(fdExposureRatio)}
              tone={fdExposureLevel === "danger" ? "danger" : ""}
            />
            <MetricRow
              label="Largest Bank Exposure"
              value={`${largestBankExposure?.bank || "-"} · ${formatPercent(
                largestBankExposure?.ratio
              )}`}
              tone={bankExposureLevel === "danger" ? "danger" : ""}
            />
            <MetricRow
              label="Reserve Amount"
              value={formatMoney(reserveAmount, currency)}
            />
            <MetricRow
              label="Idle Cash (Deployable - Reserve)"
              value={formatMoney(idleCash, currency)}
            />
          </div>

          <button
            type="button"
            className="capital-engine-link"
            onClick={() => setShowCapitalDetails((value) => !value)}
          >
            {showCapitalDetails
              ? "Hide Capital Engine Details ↑"
              : "View Capital Engine Details →"}
          </button>
        </div>

        <div className="capital-advisor-compact">
          <div className="capital-card-title">
            <span className="capital-card-icon">♙</span>
            <p>Risk Monitor</p>
          </div>

          <div className="capital-risk-score">
            <strong>{healthScore}/100</strong>
            <span>{healthLabel}</span>
          </div>

          <div className={`treasury-status-mini ${treasuryStatus.level}`}>
            <span>Treasury Status</span>
            <strong>{treasuryStatus.title}</strong>
            <p>{treasuryStatus.message}</p>
          </div>
        </div>

        <div className="capital-stress-compact">
          <div className="capital-card-title">
            <span className="capital-card-icon">⌁</span>
            <p>Treasury Stress Simulation</p>
          </div>

          <div className="capital-stress-row">
            {stressScenarios.map((scenario) => (
              <div
                key={scenario.name}
                className={`capital-stress-mini ${scenario.level}`}
              >
                <span>{scenario.name}</span>
                <strong>{scenario.status}</strong>

                <small>
                  Liquidity Ratio{" "}
                  <b>{formatPercent(scenario.projectedLiquidityRatio)}</b>
                </small>
                <small>
                  FD Exposure <b>{formatPercent(scenario.projectedFdRatio)}</b>
                </small>
                <small>
                  Projected Liquidity{" "}
                  <b>{formatMoney(scenario.projectedLiquidity, currency)}</b>
                </small>

                <p>{scenario.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCapitalDetails && (
        <>
          <div className="capital-mini-grid">
            <div className="projection-card">
              <span>Total Capital</span>
              <strong>{formatMoney(totalActivePortfolio, currency)}</strong>
              <small>FD + Savings + Parking Cash</small>
            </div>

            <div className="projection-card">
              <span>Savings</span>
              <strong>{formatMoney(totalSavings, currency)}</strong>
              <small>Available bank savings</small>
            </div>

            <div className="projection-card">
              <span>Parking Cash</span>
              <strong>{formatMoney(totalParkingCash, currency)}</strong>
              <small>Short-term reserve cash</small>
            </div>

            <div className="projection-card">
              <span>Locked FD Capital</span>
              <strong>{formatMoney(totalFixedDeposits, currency)}</strong>
              <small>Currently placed in FD</small>
            </div>

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
              <small>Protected liquidity that should not be deployed.</small>
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

          <div className="capital-exposure-block">
            <div>
              <p className="eyebrow">Treasury Exposure Monitor</p>
              <h3>Exposure Ratio Foundation</h3>
              <p className="muted">
                Monitors how much capital is locked, how much remains liquid,
                and whether capital is concentrated in one bank.
              </p>
            </div>

            <div className="capital-mini-grid exposure">
              <div className={`projection-card ${fdExposureLevel}`}>
                <span>FD Exposure Ratio</span>
                <strong>{formatPercent(fdExposureRatio)}</strong>
                <small>Portion of capital locked in FD</small>
              </div>

              <div className={`projection-card ${liquidityExposureLevel}`}>
                <span>Liquidity Ratio</span>
                <strong>{formatPercent(liquidityRatio)}</strong>
                <small>Savings + Parking Cash</small>
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
          </div>

          <div className="capital-signal stable">
            <strong>Capital Health Explanation</strong>
            {healthReasons.length ? (
              healthReasons.map((reason, index) => <p key={index}>• {reason}</p>)
            ) : (
              <p>No capital health explanation available yet.</p>
            )}
          </div>
        </>
      )}
    </section>
  );
}