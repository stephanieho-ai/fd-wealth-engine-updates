import "../../styles/treasury/treasury-escalation.css";

function getResolutionIntelligence(severity = "HIGH") {
  const level = String(severity || "HIGH").toUpperCase();

  if (level === "BLOCKED") {
    return {
      progress: 25,
      eta: "Awaiting Approval",
      confidence: "LOW",
      queue: "Governance Board",
      forecast: "Recovery cannot proceed until executive clearance is granted.",
    };
  }

  if (level === "CRITICAL") {
    return {
      progress: 45,
      eta: "Emergency Cycle",
      confidence: "MEDIUM",
      queue: "Executive Treasury Office",
      forecast: "Recovery depends on liquidity stabilization and reserve protection.",
    };
  }

  return {
    progress: 78,
    eta: "Normal Cycle",
    confidence: "STABLE",
    queue: "Treasury Operations",
    forecast: "Resolution path is stable under current treasury conditions.",
  };
}

export default function TreasuryResolutionIntelligence({ severity = "HIGH" }) {
  const model = getResolutionIntelligence(severity);

  return (
    <section className="treasury-resolution-intelligence">
      <div className="resolution-intel-header">
        <div>
          <p className="resolution-intel-eyebrow">
            Treasury Resolution Intelligence
          </p>
          <h2 className="resolution-intel-title">
            Resolution Intelligence Layer
          </h2>
        </div>

        <div className="resolution-intel-status">
          {model.confidence}
        </div>
      </div>

      <div className="resolution-intel-grid">
        <div className="resolution-intel-card">
          <span>Recovery Progress</span>
          <h3>{model.progress}%</h3>
          <div className="resolution-progress-track">
            <div
              className="resolution-progress-fill"
              style={{ width: `${model.progress}%` }}
            />
          </div>
        </div>

        <div className="resolution-intel-card">
          <span>Resolution ETA</span>
          <h3>{model.eta}</h3>
          <p>Estimated treasury resolution window.</p>
        </div>

        <div className="resolution-intel-card">
          <span>Approval Queue</span>
          <h3>{model.queue}</h3>
          <p>Current authority responsible for clearance.</p>
        </div>

        <div className="resolution-intel-card">
          <span>Recovery Forecast</span>
          <h3>AI Forecast</h3>
          <p>{model.forecast}</p>
        </div>
      </div>
    </section>
  );
}