import "../../styles/treasury/treasury-intelligence-learning-engine.css";

export default function TreasuryIntelligenceLearningEngine() {
  const learningInsights = [
    {
      title: "Liquidity Rebalancing",
      detail: "Outcome confidence improved by +3% after execution review.",
    },
    {
      title: "Treasury Ladder Optimization",
      detail: "Idle cash exposure reduced by 5% through maturity learning.",
    },
    {
      title: "Governance Escalation Pattern",
      detail: "Risk detection accuracy improved by +2% before decision stage.",
    },
    {
      title: "Execution Consistency Pattern",
      detail: "Execution variance reduced by 4% across review cycles.",
    },
  ];

  return (
    <section className="treasury-learning-engine">
      <div className="treasury-learning-card">
        <div className="treasury-learning-header">
          <div>
            <p className="treasury-learning-eyebrow">
              Treasury Intelligence Learning Layer
            </p>

            <h2 className="treasury-learning-title">
              Treasury Intelligence Learning Engine
            </h2>

            <p className="treasury-learning-description">
              Learns from treasury execution outcomes, feedback signals and
              historical decision patterns to improve future treasury
              recommendations.
            </p>
          </div>

          <div className="treasury-learning-status">
            <span>Model Status</span>
            <strong>ACTIVE</strong>
          </div>
        </div>

        <div className="treasury-learning-metrics">
          <div className="treasury-learning-metric">
            <span>Learning Cycles</span>
            <strong>87</strong>
            <p>Completed</p>
          </div>

          <div className="treasury-learning-metric">
            <span>Knowledge Entries</span>
            <strong>142</strong>
            <p>Active memory</p>
          </div>

          <div className="treasury-learning-metric">
            <span>Pattern Accuracy</span>
            <strong>91%</strong>
            <p>Recognition level</p>
          </div>

          <div className="treasury-learning-metric">
            <span>Learning Confidence</span>
            <strong>94%</strong>
            <p>Stable signal</p>
          </div>
        </div>

        <div className="treasury-learning-body">
          <div className="treasury-learning-panel treasury-learning-insights">
            <h3>Recent Learning Intelligence</h3>

            <div className="treasury-learning-feed">
              {learningInsights.map((item) => (
                <div className="treasury-learning-feed-item" key={item.title}>
                  <div className="treasury-learning-check">✓</div>

                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="treasury-learning-panel treasury-learning-recommendation">
            <h3>Learning Recommendation Matrix</h3>

            <div className="treasury-learning-matrix">
              <div className="treasury-learning-matrix-item">
                <span>Recommended Strategy</span>
                <strong>Continue Treasury Allocation</strong>
              </div>

              <div className="treasury-learning-matrix-item">
                <span>Confidence Level</span>
                <strong>91%</strong>
              </div>

              <div className="treasury-learning-matrix-item">
                <span>Expected Outcome</span>
                <strong>Stable Treasury Growth</strong>
              </div>

              <div className="treasury-learning-matrix-item">
                <span>Next Review</span>
                <strong>7 Days</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="treasury-learning-interpretation">
          <span>Learning Interpretation</span>
          <p>
            Treasury Intelligence has completed feedback analysis and integrated
            execution outcomes into institutional learning memory for future
            decision enhancement.
          </p>
        </div>
      </div>
    </section>
  );
}