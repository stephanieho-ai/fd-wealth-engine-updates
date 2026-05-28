export default function ExecutiveAuthorityInfluenceMap() {
  const authorities = [
    {
      authority: "Treasury Board",
      influence: 96,
      role: "Capital Governance",
      impact: "PRIMARY",
      status: "Dominant",
      level: "high",
    },
    {
      authority: "Executive Committee",
      influence: 91,
      role: "Final Approval",
      impact: "EXECUTIVE",
      status: "Strong",
      level: "high",
    },
    {
      authority: "Risk Authority",
      influence: 84,
      role: "Exposure Control",
      impact: "RISK",
      status: "Elevated",
      level: "medium",
    },
    {
      authority: "Liquidity Command",
      influence: 76,
      role: "Liquidity Routing",
      impact: "OPERATIONAL",
      status: "Stable",
      level: "low",
    },
  ];

  return (
    <section className="executive-influence-map">
      <div className="executive-influence-header">
        <div>
          <p className="executive-influence-eyebrow">
            EXECUTIVE AUTHORITY INFLUENCE MAP
          </p>

          <h2>Distributed Authority Influence Ranking</h2>

          <p className="executive-influence-subtitle">
            Institutional governance influence mapping for executive decision
            power, approval weight and treasury authority impact scoring.
          </p>
        </div>

        <div className="executive-influence-pill">
          INFLUENCE MAP
        </div>
      </div>

      <div className="executive-influence-grid">
        {authorities.map((item) => (
          <div className="executive-influence-card" key={item.authority}>
            <div className="executive-influence-top">
              <span>{item.impact}</span>
              <strong>{item.status}</strong>
            </div>

            <h3>{item.authority}</h3>

            <p>{item.role}</p>

            <div className="executive-influence-score">
              {item.influence}%
            </div>

            <div className="executive-influence-track">
              <div
                className={`executive-influence-fill ${item.level}`}
                style={{ width: `${item.influence}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="executive-influence-ai-panel">
        <div>
          <small>AI INFLUENCE RECOMMENDATION</small>
          <h3>Treasury Board remains primary governance driver</h3>
        </div>

        <p>
          AI governance coordination identifies Treasury Board and Executive
          Committee as the highest-impact approval authorities for current
          institutional treasury routing.
        </p>
      </div>
    </section>
  );
}