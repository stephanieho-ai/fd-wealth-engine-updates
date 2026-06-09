import "../../styles/treasury/treasury-os-health-intelligence-engine.css";

export default function TreasuryOSHealthIntelligenceEngine() {
  const vitalSigns = [
    { label: "Operations Runtime", status: "NORMAL", value: "96%" },
    { label: "Governance Runtime", status: "STABLE", value: "92%" },
    { label: "Operator Runtime", status: "ACTIVE", value: "94%" },
    { label: "Intelligence Runtime", status: "ONLINE", value: "95%" },
    { label: "Strategy Runtime", status: "ALIGNED", value: "93%" },
  ];

  const healthFeed = [
    "Runtime coordination operating normally",
    "Cross-layer synchronization remains active",
    "No critical treasury interruption detected",
    "Governance and strategy layers remain aligned",
  ];

  return (
    <section className="treasury-os-health-engine">
      <div className="treasury-os-health-card">
        <div className="treasury-os-health-header">
          <div>
            <p className="treasury-eyebrow">Treasury OS Monitoring Layer</p>

            <h2 className="treasury-section-title">
              Treasury OS Health Intelligence
            </h2>

            <p className="treasury-section-description">
              Monitors operating system health, runtime vitality,
              synchronization condition and coordination pressure across the
              Treasury OS architecture.
            </p>

            <div className="treasury-os-health-status-strip">
              <div className="treasury-os-health-pill healthy">HEALTHY</div>
              <div className="treasury-os-health-pill">SYNC ACTIVE</div>
              <div className="treasury-os-health-pill">LOW PRESSURE</div>
            </div>
          </div>

          <div className="treasury-os-health-score">
            <span>OS Health Score</span>
            <strong>96%</strong>
            <p>HEALTHY</p>
          </div>
        </div>

        <div className="treasury-os-health-grid">
          <div className="treasury-os-health-panel">
            <span>Synchronization Health</span>
            <strong>94%</strong>
            <p>Cross-layer synchronization is active and stable.</p>
          </div>

          <div className="treasury-os-health-panel">
            <span>Coordination Pressure</span>
            <strong>LOW</strong>
            <p>Runtime coordination pressure remains controlled.</p>
          </div>

          <div className="treasury-os-health-panel">
            <span>Stability Index</span>
            <strong>92%</strong>
            <p>Treasury OS stability condition remains strong.</p>
          </div>
        </div>

        <div className="treasury-os-monitoring-grid">
          <div className="treasury-os-vital-section">
            <h3>Runtime Vital Signs</h3>

            <div className="treasury-os-vital-list">
              {vitalSigns.map((item) => (
                <div className="treasury-os-vital-row" key={item.label}>
                  <div>
                    <span>{item.label}</span>
                    <strong>{item.status}</strong>
                  </div>

                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="treasury-os-health-feed">
            <h3>Health Monitoring Feed</h3>

            <div className="treasury-os-health-feed-list">
              {healthFeed.map((item) => (
                <div className="treasury-os-health-feed-item" key={item}>
                  <span>✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}