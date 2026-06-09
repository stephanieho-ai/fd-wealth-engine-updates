import "../../styles/treasury/treasury-intelligence-recommendation-engine.css";

export default function TreasuryIntelligenceRecommendationEngine() {
  const recommendation = {
    action: "CONTINUE MONITORING",
    confidence: "92%",
    readiness: "READY",
    nextStep:
      "Continue treasury monitoring and maintain reserve discipline.",
    reason:
      "Current liquidity condition remains stable with no significant governance pressure detected.",
  };

  return (
    <section className="treasury-recommendation-card">
      <div className="treasury-recommendation-header">
        <div>
         <p className="treasury-eyebrow">
            Treasury Intelligence Layer
            </p>

          <h2>Treasury Intelligence Recommendation</h2>

          <p>
            AI-generated treasury recommendation based on liquidity pressure,
            governance exposure, operational readiness and recovery intelligence.
          </p>
        </div>

        <div className="treasury-recommendation-badge">
          <span>Recommendation Status</span>
          <strong>READY</strong>
        </div>
      </div>

      <div className="treasury-recommendation-metrics">
        <div className="treasury-recommendation-metric">
          <span>Recommended Action</span>
          <strong>{recommendation.action}</strong>
        </div>

        <div className="treasury-recommendation-metric">
          <span>Confidence</span>
          <strong>{recommendation.confidence}</strong>
        </div>

        <div className="treasury-recommendation-metric">
          <span>Execution Readiness</span>
          <strong>{recommendation.readiness}</strong>
        </div>
      </div>

      <div className="treasury-recommendation-panel">
        <span>Next Operator Step</span>
        <p>{recommendation.nextStep}</p>
      </div>

      <div className="treasury-recommendation-footer">
        <span>Recommendation Reason</span>
        <p>{recommendation.reason}</p>
      </div>
    </section>
  );
}