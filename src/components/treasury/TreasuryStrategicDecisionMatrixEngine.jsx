export default function TreasuryStrategicDecisionMatrixEngine({
  currency = "MYR",
}) {
  const strategies = [
    {
      name: "FD Ladder Expansion",
      score: 92,
      confidence: "HIGH",
    },
    {
      name: "Liquidity Reserve Focus",
      score: 88,
      confidence: "HIGH",
    },
    {
      name: "Yield Optimization Route",
      score: 81,
      confidence: "MEDIUM",
    },
  ];

  return (
    <section className="treasury-strategic-decision-matrix-engine">
      <div className="treasury-strategic-decision-card">

        <p className="treasury-eyebrow">
          Treasury Strategy Intelligence
        </p>

        <h2 className="treasury-section-title">
          Treasury Strategic Decision Matrix
        </h2>

        <p className="treasury-section-description">
          Evaluates competing treasury strategies and
          determines the most suitable execution path
          based on risk, liquidity, governance and
          institutional confidence.
        </p>

        <div className="treasury-decision-ranking-grid">

          {strategies.map((strategy) => (
            <div
              key={strategy.name}
              className="treasury-decision-ranking-card"
            >
              <span>{strategy.name}</span>

              <strong>
                {strategy.score}
              </strong>

              <small>
                {strategy.confidence}
              </small>
            </div>
          ))}

        </div>

        <div className="treasury-decision-highlight">

          <div>
            <span>Recommended Strategy</span>
            <strong>FD Ladder Expansion</strong>
          </div>

          <div>
            <span>Decision Confidence</span>
            <strong>92%</strong>
          </div>

          <div>
            <span>Governance Alignment</span>
            <strong>HIGH</strong>
          </div>

          <div>
            <span>Execution Readiness</span>
            <strong>READY</strong>
          </div>

        </div>

      </div>
    </section>
  );
}