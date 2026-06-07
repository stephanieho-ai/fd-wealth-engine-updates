export default function TreasuryIntelligenceScenarioEngine() {
  const scenarios = [
    {
      name: "Stable Market",
      probability: "62%",
      impact: "LOW",
      action: "Continue Laddering",
      futureState: "Treasury Stability Maintained",
    },
    {
      name: "Rate Reduction",
      probability: "24%",
      impact: "MEDIUM",
      action: "Extend Duration Strategy",
      futureState: "Yield Compression Expected",
    },
    {
      name: "Liquidity Stress",
      probability: "14%",
      impact: "HIGH",
      action: "Increase Cash Buffer",
      futureState: "Liquidity Protection Mode",
    },
  ];

  return (
    <section className="treasury-scenario-engine">
      <div className="treasury-scenario-card">

        <p className="treasury-eyebrow">
          Treasury Forecast Intelligence
        </p>

        <h2 className="treasury-section-title">
          Treasury Intelligence Scenario Engine
        </h2>

        <p className="treasury-section-description">
          Simulates multiple treasury future-state possibilities
          based on prediction signals, liquidity conditions,
          and treasury operating assumptions.
        </p>

        <div className="treasury-scenario-grid">
          {scenarios.map((scenario) => (
            <div
              key={scenario.name}
              className="treasury-scenario-item"
            >
              <div className="scenario-header">
                <h3>{scenario.name}</h3>
                <span>{scenario.probability}</span>
              </div>

              <div className="scenario-content">

                <div className="scenario-row">
                  <label>Liquidity Impact</label>
                  <strong>{scenario.impact}</strong>
                </div>

                <div className="scenario-row">
                  <label>Recommended Action</label>
                  <strong>{scenario.action}</strong>
                </div>

                <div className="scenario-row">
                  <label>Future State</label>
                  <strong>{scenario.futureState}</strong>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}