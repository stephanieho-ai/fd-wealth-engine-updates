export default function TreasuryAutonomousIntelligenceCore() {
  const metrics = [
    {
      label: "Autonomous Readiness",
      value: "92%",
      description: "AI monitoring active.",
    },
    {
      label: "Reasoning Confidence",
      value: "94%",
      description: "Analysis confidence stable.",
    },
    {
      label: "Decision Safety",
      value: "96%",
      description: "Operator safety protected.",
    },
  ];

  const observations = [
    "Runtime signals synchronized",
    "Treasury intelligence connected",
    "Governance inputs available",
    "Simulation environment ready",
  ];

  return (
    <section className="treasury-autonomous-core">
      <div className="autonomous-core-card">
        <div className="autonomous-core-top">
          <div>
            <p className="autonomous-core-eyebrow">
              TREASURY AUTONOMOUS INTELLIGENCE LAYER
            </p>

            <h2 className="autonomous-core-title">
              Treasury Autonomous Intelligence Core
            </h2>

            <p className="autonomous-core-description">
              Monitors runtime conditions, governance signals and autonomous
              decision readiness across the Treasury OS ecosystem.
            </p>
          </div>

          <div className="autonomous-core-score-card">
            <span className="score-label">AI CONFIDENCE</span>
            <div className="score-value">94%</div>
            <span className="score-status">ACTIVE</span>
          </div>
        </div>

        <div className="autonomous-core-pills">
          <span className="pill blue">OBSERVING</span>
          <span className="pill indigo">REASONING READY</span>
          <span className="pill green">OPERATOR SAFE</span>
        </div>

        <div className="autonomous-core-metrics">
          {metrics.map((item) => (
            <div key={item.label} className="autonomous-metric-card">
              <h4>{item.label}</h4>
              <div className="metric-value">{item.value}</div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="autonomous-core-grid">
          <div className="autonomous-panel">
            <h3>Autonomous Signal Center</h3>

            <div className="autonomous-signal-box">
              <div>
                <span>Current State</span>
                <strong>AUTONOMOUS MONITORING</strong>
              </div>

              <div>
                <span>Observation Status</span>
                <strong>ACTIVE</strong>
              </div>

              <div>
                <span>Reasoning Status</span>
                <strong>READY</strong>
              </div>
            </div>
          </div>

          <div className="autonomous-panel">
            <h3>Autonomous Observation Feed</h3>

            <div className="autonomous-feed-list">
              {observations.map((item) => (
                <div key={item} className="autonomous-feed-item">
                  <span>✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="autonomous-footer-banner">
          <span>AUTONOMOUS INTERPRETATION</span>

          <strong>
            Treasury Autonomous Intelligence is monitoring treasury conditions
            and preparing reasoning-driven decision support under operator
            governance controls.
          </strong>
        </div>
      </div>
    </section>
  );
}