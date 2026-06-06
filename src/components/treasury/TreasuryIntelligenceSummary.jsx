import "../../styles/treasury/treasury-intelligence-summary.css";

export default function TreasuryIntelligenceSummary({
  liquidityStressLevel = "STABLE",
  treasurySignal = "TREASURY STABLE",
  livePolicyStatus = "COMPLIANT",
  liveActionSignal = "MONITOR",
}) {
  return (
    <section className="treasury-intelligence-summary">
      <div className="treasury-intelligence-card">
        <div className="treasury-intelligence-header">
          <div>
            <p className="treasury-eyebrow">Treasury Intelligence Layer</p>

            <h2 className="treasury-section-title">
              Treasury Intelligence Summary
            </h2>

            <p className="treasury-section-description">
              Centralized intelligence panel translating liquidity condition,
              governance pressure, policy status and operator action signal.
            </p>
          </div>

          <div className="treasury-intelligence-status">
            <span>LIVE INTELLIGENCE</span>
            <strong>{treasurySignal}</strong>
          </div>
        </div>

        <div className="treasury-intelligence-grid">
          <div className="treasury-intelligence-item">
            <span>Liquidity Condition</span>
            <strong>{liquidityStressLevel}</strong>
          </div>

          <div className="treasury-intelligence-item">
            <span>Governance Pressure</span>
            <strong>{livePolicyStatus}</strong>
          </div>

          <div className="treasury-intelligence-item">
            <span>Treasury Status</span>
            <strong>{treasurySignal}</strong>
          </div>

          <div className="treasury-intelligence-item">
            <span>Recommended Action</span>
            <strong>{liveActionSignal}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}