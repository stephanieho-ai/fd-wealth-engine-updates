export default function TreasuryIntelligenceWhatIfEngine() {
  const scenarios = [
    {
      level: "LOW",
      title: "Deploy RM100K to 12M FD",
      liquidity: "+5",
      yield: "+8",
      flexibility: "-4",
    },
    {
      level: "MEDIUM",
      title: "Maintain Cash Position",
      liquidity: "+10",
      yield: "-6",
      flexibility: "+8",
    },
    {
      level: "RECOMMENDED",
      title: "Split Treasury Deployment",
      liquidity: "+7",
      yield: "+4",
      flexibility: "+5",
    },
  ];

  return (
    <section className="treasury-what-if-engine">
      <div className="treasury-what-if-card">

        <div className="treasury-what-if-header">

          <div>
            <p className="treasury-what-if-eyebrow">
              Treasury Forecast Intelligence
            </p>

            <h2 className="treasury-what-if-title">
              Treasury Intelligence What-If Analysis Engine
            </h2>

            <p className="treasury-what-if-description">
              Evaluates alternative treasury actions and
              simulates potential outcomes before execution.
            </p>
          </div>

          <div className="treasury-what-if-status">
            <span>WHAT-IF STATUS</span>
            <strong>ANALYZING</strong>
          </div>

        </div>

        <div className="treasury-what-if-summary">

          <div className="treasury-what-if-metric">
            <span>Alternative Actions</span>
            <strong>3</strong>
            <small>Decision paths modeled</small>
          </div>

          <div className="treasury-what-if-metric">
            <span>Recommended Path</span>
            <strong>SPLIT</strong>
            <small>Balanced allocation</small>
          </div>

          <div className="treasury-what-if-metric">
            <span>Confidence</span>
            <strong>91%</strong>
            <small>Decision confidence</small>
          </div>

          <div className="treasury-what-if-metric">
            <span>Impact Paths</span>
            <strong>3</strong>
            <small>Evaluated outcomes</small>
          </div>

        </div>

        <div className="treasury-what-if-grid">

          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className="treasury-what-if-scenario-card"
            >
              <div className="treasury-what-if-badge">
                {scenario.level}
              </div>

              <h3>{scenario.title}</h3>

              <div className="treasury-what-if-divider" />

              <div className="treasury-what-if-results">

                <div>
                  <span>Liquidity Impact</span>
                  <strong>{scenario.liquidity}</strong>
                </div>

                <div>
                  <span>Yield Impact</span>
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

        <div className="treasury-what-if-interpretation">

          <span>
            WHAT-IF INTERPRETATION
          </span>

          <p>
            Treasury Intelligence recommends a balanced
            deployment strategy based on current liquidity,
            yield optimization and operational flexibility
            requirements.
          </p>

        </div>

      </div>
    </section>
  );
}