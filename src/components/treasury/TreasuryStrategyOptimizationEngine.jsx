import "../../styles/treasury/treasury-strategy-optimization-engine.css";

export default function TreasuryStrategyOptimizationEngine() {
  const optimizationMetrics = [
    {
      label: "Optimization Target",
      value: "BALANCED",
      status: "Yield / Liquidity / Risk",
    },
    {
      label: "Current Strategy Score",
      value: "84%",
      status: "Optimized",
    },
    {
      label: "Strategy Efficiency",
      value: "HIGH",
      status: "Stable",
    },
    {
      label: "Optimization Confidence",
      value: "93%",
      status: "High Confidence",
    },
  ];

  const paths = [
    "Preserve June ladder liquidity strength.",
    "Avoid over-concentration in single maturity month.",
    "Maintain flexible deployment reserve.",
    "Prioritize balanced capital rotation.",
  ];

  return (
    <section className="treasury-strategy-optimization-engine">
      <div className="treasury-strategy-optimization-card">
        <div className="treasury-strategy-optimization-title-row">
          <div>
            <p className="treasury-eyebrow">
              Treasury Strategy Intelligence Layer
            </p>

            <h2 className="treasury-section-title">
              Treasury Strategy Optimization Engine
            </h2>

            <p className="treasury-section-description">
              Optimizes treasury allocation strategy by balancing yield,
              liquidity safety, maturity distribution and execution readiness.
            </p>
          </div>

          <div className="treasury-strategy-status">
            <span>Optimization Status</span>
            <strong>OPTIMIZING</strong>
          </div>
        </div>

        <div className="treasury-strategy-optimization-grid">
          {optimizationMetrics.map((item) => (
            <div
              className="treasury-strategy-optimization-metric"
              key={item.label}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.status}</small>
            </div>
          ))}
        </div>

        <div className="treasury-strategy-optimization-body">
          <div className="treasury-strategy-optimization-panel">
            <span className="treasury-panel-label">
              Recommended Optimization Path
            </span>

            <h3>Balanced Ladder Rebalancing</h3>

            <p>
              Current treasury strategy remains healthy. Optimization should
              focus on maintaining maturity balance while preserving enough
              deployable reserve for future opportunities.
            </p>
          </div>

          <div className="treasury-strategy-optimization-panel">
            <span className="treasury-panel-label">Optimization Logic</span>

            <div className="treasury-strategy-optimization-list">
              {paths.map((path) => (
                <div
                  className="treasury-strategy-optimization-item"
                  key={path}
                >
                  <span />
                  <p>{path}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="treasury-strategy-optimization-action">
          <span>Strategy Interpretation</span>
          <strong>
            Current treasury allocation remains balanced and aligned with
            liquidity preservation, yield optimization and maturity
            diversification objectives.
          </strong>
        </div>
      </div>
    </section>
  );
}