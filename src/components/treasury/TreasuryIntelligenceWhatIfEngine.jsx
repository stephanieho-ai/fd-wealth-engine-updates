export default function TreasuryIntelligenceWhatIfEngine() {
  const scenarios = [
    {
      action: "Deploy RM100K to 12M FD",
      liquidity: "+5",
      yield: "+8",
      flexibility: "-4",
    },
    {
      action: "Maintain Cash Position",
      liquidity: "+10",
      yield: "-6",
      flexibility: "+8",
    },
    {
      action: "Split Treasury Deployment",
      liquidity: "+7",
      yield: "+4",
      flexibility: "+5",
    },
  ];

  return (
    <section className="treasury-what-if-engine">
      <div className="treasury-what-if-card">

        <p className="treasury-eyebrow">
          Treasury Intelligence Layer
        </p>

        <h2 className="treasury-section-title">
          Treasury Intelligence What-If Analysis Engine
        </h2>

        <p className="treasury-section-description">
          Simulates potential treasury outcomes based on
          alternative operator actions, enabling proactive
          decision support before execution.
        </p>

        <div className="treasury-what-if-summary">

          <div className="treasury-what-if-metric">
            <span>Analysis Status</span>
            <strong>ACTIVE</strong>
          </div>

          <div className="treasury-what-if-metric">
            <span>Scenarios Evaluated</span>
            <strong>3</strong>
          </div>

          <div className="treasury-what-if-metric">
            <span>Confidence</span>
            <strong>91%</strong>
          </div>

        </div>

        <div className="treasury-what-if-grid">

          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className="treasury-what-if-scenario-card"
            >
              <h3>{scenario.action}</h3>

              <div className="treasury-what-if-results">

                <div>
                  <span>Liquidity</span>
                  <strong>{scenario.liquidity}</strong>
                </div>

                <div>
                  <span>Yield</span>
                  <strong>{scenario.yield}</strong>
                </div>

                <div>
                  <span>Flexibility</span>
                  <strong>{scenario.flexibility}</strong>
                </div>

              </div>
            </div>
          ))}

        </div>

        <div className="treasury-what-if-recommendation">
          <span>Recommended Outcome</span>

          <strong>
            Split Treasury Deployment provides the most
            balanced liquidity, yield and diversification
            profile under current treasury conditions.
          </strong>
        </div>

      </div>
    </section>
  );
}