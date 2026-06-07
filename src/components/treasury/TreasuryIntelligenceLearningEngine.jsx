import "../../styles/treasury/treasury-intelligence-learning-engine.css";

export default function TreasuryIntelligenceLearningEngine() {
  return (
    <section className="treasury-learning-engine">
      <div className="treasury-learning-card">
        <p className="treasury-eyebrow">
          Treasury Intelligence Learning
        </p>

        <h2 className="treasury-section-title">
          Treasury Intelligence Learning Engine
        </h2>

        <p className="treasury-section-description">
          Learns from treasury execution outcomes, feedback signals
          and historical decision patterns to improve future
          recommendations.
        </p>

        <div className="treasury-learning-grid">
          <div className="treasury-learning-metric">
            <span>Learning Cycles</span>
            <strong>87</strong>
          </div>

          <div className="treasury-learning-metric">
            <span>Knowledge Entries</span>
            <strong>142</strong>
          </div>

          <div className="treasury-learning-metric">
            <span>Pattern Accuracy</span>
            <strong>91%</strong>
          </div>

          <div className="treasury-learning-metric">
            <span>Model Status</span>
            <strong>ACTIVE</strong>
          </div>
        </div>

        <div className="treasury-learning-body">
          <div className="treasury-learning-panel">
            <h3>Recent Learning Insights</h3>

            <div className="treasury-learning-item">
              <span>✓ Liquidity Rebalancing</span>
              <p>
                Outcome confidence improved by +3% after execution review.
              </p>
            </div>

            <div className="treasury-learning-item">
              <span>✓ Treasury Ladder Optimization</span>
              <p>
                Idle cash exposure reduced by 5% through maturity learning.
              </p>
            </div>

            <div className="treasury-learning-item">
              <span>✓ Governance Escalation Pattern</span>
              <p>
                Risk detection accuracy improved by +2% before decision stage.
              </p>
            </div>
          </div>

          <div className="treasury-learning-panel treasury-learning-recommendation">
            <h3>Learning Recommendation Matrix</h3>

            <div className="treasury-learning-recommendation-grid">
              <div className="treasury-learning-mini-card">
                <span>Recommended Strategy</span>
                <strong>Continue Treasury Allocation</strong>
              </div>

              <div className="treasury-learning-mini-card">
                <span>Confidence Level</span>
                <strong>91%</strong>
              </div>

              <div className="treasury-learning-mini-card">
                <span>Expected Outcome</span>
                <strong>Stable Treasury Growth</strong>
              </div>

              <div className="treasury-learning-mini-card">
                <span>Next Review</span>
                <strong>7 Days</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}