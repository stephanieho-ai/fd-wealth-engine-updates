import "../../styles/treasury/treasury-strategic-decision-matrix-engine.css";

export default function TreasuryStrategicDecisionMatrixEngine() {
  const strategies = [
    {
      rank: "01",
      code: "DMX-01",
      title: "FD Ladder Expansion",
      score: 92,
      confidence: "HIGH",
      status: "RECOMMENDED",
      liquidity: 95,
      risk: "LOW",
      governance: "HIGH",
    },
    {
      rank: "02",
      code: "DMX-02",
      title: "Liquidity Reserve Focus",
      score: 88,
      confidence: "HIGH",
      status: "STRONG",
      liquidity: 98,
      risk: "V-LOW",
      governance: "HIGH",
    },
    {
      rank: "03",
      code: "DMX-03",
      title: "Yield Optimization Route",
      score: 81,
      confidence: "MED",
      status: "WATCH",
      liquidity: 82,
      risk: "MED",
      governance: "ALIGNED",
    },
  ];

  return (
    <section className="treasury-strategic-decision-matrix-engine">
      <div className="treasury-strategic-decision-card">

        <div className="treasury-decision-header">

          <div>
            <p className="treasury-decision-eyebrow">
              Treasury Strategy Command Wall
            </p>

            <h2 className="treasury-decision-title">
              Treasury Strategic Decision Matrix
            </h2>

            <p className="treasury-decision-description">
              Evaluates competing treasury strategies and determines the most
              suitable execution path based on risk, liquidity, governance and
              institutional confidence.
            </p>
          </div>

          <div className="treasury-decision-status">
            <span>Decision Status</span>
            <strong>READY</strong>
          </div>

        </div>

        <div className="treasury-decision-summary-grid">

          <div className="treasury-decision-summary-card">
            <span>Strategies Reviewed</span>
            <strong>03</strong>
          </div>

          <div className="treasury-decision-summary-card">
            <span>Best Score</span>
            <strong>92</strong>
          </div>

          <div className="treasury-decision-summary-card">
            <span>Decision Confidence</span>
            <strong>92%</strong>
          </div>

          <div className="treasury-decision-summary-card">
            <span>Execution Readiness</span>
            <strong>READY</strong>
          </div>

        </div>

        <div className="treasury-decision-ranking-grid">

          {strategies.map((strategy) => (
            <div
              key={strategy.code}
              className={
                strategy.status === "RECOMMENDED"
                  ? "treasury-decision-ranking-card is-recommended"
                  : "treasury-decision-ranking-card"
              }
            >
              <div className="treasury-decision-rank-row">
                <span>{strategy.code}</span>
                <small>{strategy.status}</small>
              </div>

              <div className="treasury-decision-rank-badge">
                RANK {strategy.rank}
              </div>

              <h3>{strategy.title}</h3>

              <div className="treasury-decision-score">
                {strategy.score}
              </div>

              <div className="treasury-decision-mini-grid">

                <div>
                  <span>Liquidity</span>
                  <strong>{strategy.liquidity}</strong>
                </div>

                <div>
                  <span>Risk</span>
                  <strong>{strategy.risk}</strong>
                </div>

                <div>
                  <span>Governance</span>
                  <strong>{strategy.governance}</strong>
                </div>

              </div>

              <p className="treasury-decision-confidence">
                Confidence: {strategy.confidence}
              </p>

            </div>
          ))}

        </div>

        <div className="treasury-decision-command-bar">

          <div>
            <span>Final Decision Command</span>
            <strong>FD Ladder Expansion</strong>
          </div>

          <p>
            Prioritize ladder expansion while preserving liquidity reserve and
            governance-aligned execution readiness.
          </p>

          <em>COMMAND READY</em>

        </div>

      </div>
    </section>
  );
}