export default function TreasuryStrategicAlternativesEngine({
  currency = "MYR",
}) {
  const alternatives = [
    {
      title: "Growth Focus",
      yieldRate: "4.2%",
      liquidity: "MEDIUM",
      risk: "LOW",
    },
    {
      title: "Balanced Allocation",
      yieldRate: "3.9%",
      liquidity: "HIGH",
      risk: "LOW",
    },
    {
      title: "Defensive Treasury",
      yieldRate: "3.4%",
      liquidity: "VERY HIGH",
      risk: "VERY LOW",
    },
    {
      title: "Aggressive Yield",
      yieldRate: "4.5%",
      liquidity: "LOW",
      risk: "MEDIUM",
    },
  ];

  return (
    <section className="treasury-strategic-alternatives-engine">
      <div className="treasury-strategic-alternatives-card">

        <p className="treasury-eyebrow">
          Treasury Strategy Intelligence
        </p>

        <h2 className="treasury-section-title">
          Treasury Strategic Alternatives
        </h2>

        <p className="treasury-section-description">
          Evaluates multiple treasury strategy paths and
          compares expected yield, liquidity profile and
          institutional risk exposure.
        </p>

        <div className="treasury-strategy-alt-metrics">

          <div className="treasury-alt-metric">
            <span>Alternatives Generated</span>
            <strong>5</strong>
          </div>

          <div className="treasury-alt-metric">
            <span>Best Alternative</span>
            <strong>Balanced</strong>
          </div>

          <div className="treasury-alt-metric">
            <span>Confidence</span>
            <strong>91%</strong>
          </div>

          <div className="treasury-alt-metric">
            <span>Expected Benefit</span>
            <strong>+12%</strong>
          </div>

        </div>

        <div className="treasury-alt-grid">

          {alternatives.map((item) => (
            <div
              key={item.title}
              className="treasury-alt-item"
            >

              <div className="treasury-alt-header">
                <h3>{item.title}</h3>

                <span className="treasury-alt-badge">
                  Strategy
                </span>
              </div>

              <div className="treasury-alt-values">

                <span>
                  Yield
                  <strong>{item.yieldRate}</strong>
                </span>

                <span>
                  Liquidity
                  <strong>{item.liquidity}</strong>
                </span>

                <span>
                  Risk
                  <strong>{item.risk}</strong>
                </span>

              </div>

            </div>
          ))}

        </div>

        <div className="treasury-alt-recommendation">

          <h3>
            AI Recommended Strategy
          </h3>

          <strong>
            Balanced Allocation
          </strong>

          <p>
            Provides the best balance between
            yield generation, liquidity preservation
            and treasury risk management.
          </p>

        </div>

      </div>
    </section>
  );
}