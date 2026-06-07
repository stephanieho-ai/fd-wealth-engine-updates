import "./../../styles/treasury/treasury-strategy-intelligence-overview.css";

export default function TreasuryStrategyIntelligenceOverview() {
  const strategySignals = [
    {
      label: "Strategic Liquidity Posture",
      value: "BALANCED",
      note: "Liquidity remains positioned for controlled deployment.",
    },
    {
      label: "Capital Direction",
      value: "SELECTIVE",
      note: "Capital should move only toward validated ladder gaps.",
    },
    {
      label: "Yield Strategy Bias",
      value: "DEFENSIVE",
      note: "Protect rate quality while avoiding unnecessary lock-in risk.",
    },
    {
      label: "Treasury Strategy Confidence",
      value: "91%",
      note: "Strategy layer operating within stable confidence range.",
    },
  ];

  return (
    <section className="treasury-strategy-intelligence-overview">
      <div className="treasury-strategy-overview-card">
        <div className="treasury-strategy-header">
          <div>
            <p className="treasury-strategy-eyebrow">
              V33.2-G22 · Treasury Strategy Intelligence Layer
            </p>

            <h2 className="treasury-strategy-title">
              Treasury Strategy Intelligence Overview
            </h2>

            <p className="treasury-strategy-description">
              Converts treasury intelligence, future-state signals and what-if
              outcomes into strategic capital direction, yield posture and
              operator-level treasury priorities.
            </p>
          </div>

          <div className="treasury-strategy-status-badge">
            STRATEGY ACTIVE
          </div>
        </div>

        <div className="treasury-strategy-grid">
          {strategySignals.map((item) => (
            <div className="treasury-strategy-signal-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </div>
          ))}
        </div>

        <div className="treasury-strategy-flow">
          <div className="treasury-strategy-flow-step">
            <span>01</span>
            <strong>Read Intelligence</strong>
            <p>Absorb prediction, scenario and future-state outputs.</p>
          </div>

          <div className="treasury-strategy-flow-arrow">→</div>

          <div className="treasury-strategy-flow-step">
            <span>02</span>
            <strong>Define Direction</strong>
            <p>Identify capital movement, ladder focus and defense bias.</p>
          </div>

          <div className="treasury-strategy-flow-arrow">→</div>

          <div className="treasury-strategy-flow-step">
            <span>03</span>
            <strong>Recommend Strategy</strong>
            <p>Prepare next treasury strategy actions for operator review.</p>
          </div>
        </div>

        <div className="treasury-strategy-summary-panel">
          <div>
            <span>Current Strategic Reading</span>
            <strong>
              Maintain balanced liquidity while preparing selective capital
              deployment.
            </strong>
          </div>

          <div>
            <span>Next Strategic Operator Step</span>
            <strong>
              Review upcoming maturity months and identify the safest strategic
              allocation window.
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}