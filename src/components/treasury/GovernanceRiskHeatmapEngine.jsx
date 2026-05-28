export default function GovernanceRiskHeatmapEngine() {
  const riskZones = [
    {
      zone: "Consensus Vulnerability",
      status: "LOW",
      score: 24,
      detail: "Authority agreement remains durable.",
      level: "low",
    },
    {
      zone: "Escalation Exposure",
      status: "MONITOR",
      score: 58,
      detail: "Escalation ladder requires continued watch.",
      level: "medium",
    },
    {
      zone: "Routing Pressure",
      status: "ELEVATED",
      score: 72,
      detail: "Parallel approval routing shows moderate pressure.",
      level: "high",
    },
    {
      zone: "Authority Stress",
      status: "STABLE",
      score: 38,
      detail: "Executive authority load remains manageable.",
      level: "low",
    },
  ];

  return (
    <section className="governance-risk-heatmap">
      <div className="governance-risk-header">
        <div>
          <p className="governance-risk-eyebrow">
            GOVERNANCE RISK HEATMAP
          </p>

          <h2>Institutional Governance Risk Heatmap</h2>

          <p className="governance-risk-subtitle">
            Real-time governance risk visualization for consensus vulnerability,
            escalation exposure, routing pressure and authority stress.
          </p>
        </div>

        <div className="governance-risk-pill">
          RISK HEATMAP
        </div>
      </div>

      <div className="governance-risk-grid">
        {riskZones.map((item) => (
          <div className={`governance-risk-card ${item.level}`} key={item.zone}>
            <div className="governance-risk-top">
              <span>{item.zone}</span>
              <strong>{item.status}</strong>
            </div>

            <div className="governance-risk-score">{item.score}</div>

            <p>{item.detail}</p>

            <div className="governance-risk-track">
              <div
                className={`governance-risk-fill ${item.level}`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="governance-risk-ai-panel">
        <div>
          <small>AI GOVERNANCE RISK RECOMMENDATION</small>
          <h3>Routing pressure requires continued monitoring</h3>
        </div>

        <p>
          AI governance intelligence detects moderate routing pressure while
          consensus vulnerability remains low. Maintain monitored governance
          mode and continue escalation exposure watch.
        </p>
      </div>
    </section>
  );
}