import "../../styles/treasury/treasury-intelligence-summary.css";

export default function TreasuryIntelligenceSummary({
  liquidityStressLevel = "STABLE",
  treasurySignal = "TREASURY STABLE",
  livePolicyStatus = "COMPLIANT",
  liveActionSignal = "MONITOR",
}) {
  const getLiquidityClass = (value) => {
    if (value === "CRITICAL") return "signal-red";
    if (value === "HIGH") return "signal-orange";
    if (value === "ELEVATED") return "signal-amber";
    return "signal-blue";
  };

  const getGovernanceClass = (value) => {
    if (value === "BLOCKED") return "signal-red";
    if (value === "PROTECTED") return "signal-amber";
    return "signal-blue";
  };

  const getTreasuryClass = (value) => {
    if (value.includes("CRITICAL")) return "signal-red";
    if (value.includes("ESCALATION")) return "signal-amber";
    if (value.includes("RECOVERY")) return "signal-green";
    return "signal-blue";
  };

  const getActionClass = (value) => {
    if (value.includes("LOCKDOWN")) return "signal-red";
    if (value.includes("PAUSE")) return "signal-purple";
    if (value.includes("PROTECT")) return "signal-amber";
    return "signal-blue";
  };

  const intelligenceStatusClass = getTreasuryClass(treasurySignal);

  return (
    <section className="treasury-intelligence-summary">
      <div className="treasury-intelligence-card">
        <div className="treasury-intelligence-header">
          <div>
            <p className="treasury-eyebrow">
              Treasury Intelligence Layer
            </p>

            <h2 className="treasury-section-title">
              Treasury Intelligence Summary
            </h2>

            <p className="treasury-section-description">
              Centralized intelligence panel translating liquidity condition,
              governance pressure, policy status and operator action signal.
            </p>
          </div>

          <div
            className={`treasury-intelligence-status ${intelligenceStatusClass}`}
          >
            <span>LIVE INTELLIGENCE</span>
            <strong>{treasurySignal}</strong>
          </div>
        </div>

        <div className="treasury-intelligence-grid">
          <div
            className={`treasury-intelligence-item ${getLiquidityClass(
              liquidityStressLevel
            )}`}
          >
            <span>Liquidity Condition</span>
            <strong>{liquidityStressLevel}</strong>
          </div>

          <div
            className={`treasury-intelligence-item ${getGovernanceClass(
              livePolicyStatus
            )}`}
          >
            <span>Governance Pressure</span>
            <strong>{livePolicyStatus}</strong>
          </div>

          <div
            className={`treasury-intelligence-item ${getTreasuryClass(
              treasurySignal
            )}`}
          >
            <span>Treasury Status</span>
            <strong>{treasurySignal}</strong>
          </div>

          <div
            className={`treasury-intelligence-item ${getActionClass(
              liveActionSignal
            )}`}
          >
            <span>Recommended Action</span>
            <strong>{liveActionSignal}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}