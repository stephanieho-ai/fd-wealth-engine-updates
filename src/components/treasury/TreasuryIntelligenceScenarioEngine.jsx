import "../../styles/treasury/treasury-intelligence-scenario-engine.css";

export default function TreasuryIntelligenceScenarioEngine() {
  const scenarios = [
    {
      title: "Stable Market",
      probability: "62%",
      impact: "LOW",
      action: "Continue Laddering",
      futureState: "Treasury Stability Maintained",
      tone: "stable",
    },
    {
      title: "Rate Reduction",
      probability: "24%",
      impact: "MEDIUM",
      action: "Extend Duration Strategy",
      futureState: "Yield Compression Expected",
      tone: "watch",
    },
    {
      title: "Liquidity Stress",
      probability: "14%",
      impact: "HIGH",
      action: "Increase Cash Buffer",
      futureState: "Liquidity Protection Mode",
      tone: "stress",
    },
  ];

  const summaryMetrics = [
    { label: "Scenario Coverage", value: "3", note: "Future paths modeled" },
    { label: "Dominant Scenario", value: "STABLE", note: "Highest probability path" },
    { label: "Forecast Confidence", value: "86%", note: "Within operating range" },
    { label: "Risk Paths", value: "2", note: "Rate and liquidity watch" },
  ];

  return (
    <section className="treasury-scenario-engine">
      <div className="treasury-scenario-card">
        <div className="treasury-scenario-header">
          <div>
            <p className="treasury-scenario-eyebrow">
              Treasury Forecast Intelligence
            </p>

            <h2 className="treasury-scenario-title">
              Treasury Intelligence Scenario Engine
            </h2>

            <p className="treasury-scenario-description">
              Simulates multiple treasury future-state possibilities based on
              prediction signals, liquidity conditions and operating assumptions.
            </p>
          </div>

          <div className="treasury-scenario-status">
            <span>Scenario Status</span>
            <strong>Simulating</strong>
          </div>
        </div>

        <div className="treasury-scenario-metrics">
          {summaryMetrics.map((metric) => (
            <div className="treasury-scenario-metric" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.note}</p>
            </div>
          ))}
        </div>

        <div className="treasury-scenario-grid">
          {scenarios.map((scenario) => (
            <div
              className={`treasury-scenario-item ${scenario.tone}`}
              key={scenario.title}
            >
              <div className="scenario-header">
                <div>
                  <span className="scenario-pill">{scenario.impact}</span>
                  <h3>{scenario.title}</h3>
                </div>

                <strong>{scenario.probability}</strong>
              </div>

              <div className="scenario-row">
                <span>Liquidity Impact</span>
                <strong>{scenario.impact}</strong>
              </div>

              <div className="scenario-row">
                <span>Recommended Action</span>
                <strong>{scenario.action}</strong>
              </div>

              <div className="scenario-row">
                <span>Future State</span>
                <strong>{scenario.futureState}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="treasury-scenario-interpretation">
          <span>Scenario Interpretation</span>
          <p>
            Treasury Intelligence currently projects a stable operating
            environment, with moderate exposure to future rate adjustments and
            low liquidity stress.
          </p>
        </div>
      </div>
    </section>
  );
}