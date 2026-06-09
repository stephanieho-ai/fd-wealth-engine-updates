export default function TreasuryRuntimeIntelligenceCore() {
  const metrics = [
    { label: "Runtime Status", value: "ACTIVE" },
    { label: "Confidence", value: "92%" },
    { label: "Intelligence Load", value: "73%" },
    { label: "Decision Readiness", value: "91%" },
  ];

  return (
    <section className="treasury-runtime-intelligence-core">
      <div className="treasury-runtime-intelligence-card">
        <div className="runtime-intelligence-header">
          <div>
            <p className="runtime-intelligence-eyebrow">
              Treasury Runtime Intelligence
            </p>

            <h2 className="runtime-intelligence-title">
              Runtime Intelligence Core
            </h2>

            <p className="runtime-intelligence-description">
              Central intelligence runtime responsible for treasury awareness,
              decision readiness, confidence monitoring and operational insight generation.
            </p>
          </div>

          <div className="runtime-intelligence-status">
            <span>Runtime</span>
            <strong>ACTIVE</strong>
          </div>
        </div>

        <div className="runtime-intelligence-grid">
          {metrics.map((metric) => (
            <div key={metric.label} className="runtime-intelligence-metric">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>

        <div className="runtime-intelligence-summary">
          <div className="runtime-summary-card">
            <span>Insight Generation</span>
            <strong>LIVE</strong>
          </div>

          <div className="runtime-summary-card">
            <span>Operational Awareness</span>
            <strong>HIGH</strong>
          </div>

          <div className="runtime-summary-card">
            <span>Monitoring Scope</span>
            <strong>GLOBAL</strong>
          </div>
        </div>

        <div className="runtime-intelligence-banner">
          <span>Runtime Intelligence</span>
          <strong>ACTIVE</strong>
        </div>
      </div>
    </section>
  );
}