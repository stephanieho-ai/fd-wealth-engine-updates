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
    <section className="treasury-intelligence-card treasury-recommendation-engine-card">
      <div className="treasury-intelligence-card-inner">
        <p className="treasury-eyebrow">
          Treasury Intelligence Layer
        </p>

        <h2 className="treasury-section-title">
          Treasury Intelligence Recommendation
        </h2>

        <p className="treasury-section-description">
          AI-generated treasury recommendation based on liquidity pressure,
          governance exposure, operational readiness and recovery intelligence.
        </p>

        <div className="treasury-recommendation-metrics">
          <div className="treasury-intelligence-item">
            <span>Recommended Action</span>
            <strong>{recommendation.action}</strong>
          </div>

          <div className="treasury-intelligence-item">
            <span>Confidence</span>
            <strong>{recommendation.confidence}</strong>
          </div>

          <div className="treasury-intelligence-item">
            <span>Execution Readiness</span>
            <strong>{recommendation.readiness}</strong>
          </div>
        </div>

        <div className="treasury-recommendation-full-card">
          <span>Next Operator Step</span>
          <strong>{recommendation.nextStep}</strong>
        </div>

        <div className="treasury-recommendation-full-card">
          <span>Recommendation Reason</span>
          <p>{recommendation.reason}</p>
        </div>
      </div>
    </section>
  );
}