export default function TreasuryIntelligenceFeedbackLoopEngine() {
  const metrics = [
    { label: "Execution Result", value: "92%" },
    { label: "Feedback Confidence", value: "94%" },
    { label: "Cycle Health", value: "HEALTHY" },
    { label: "Refresh Status", value: "ACTIVE" },
  ];

  const feedbackItems = [
    "Execution completed successfully",
    "Liquidity conditions remain healthy",
    "Governance exposure remains low",
    "Intelligence cycle refreshed",
  ];

  const impacts = [
    { label: "Signal Impact", value: "+3" },
    { label: "Assessment Impact", value: "+2" },
    { label: "Recommendation", value: "STABLE" },
  ];

  return (
    <section className="treasury-feedback-loop-engine">
      <div className="treasury-feedback-card">
        <div className="treasury-feedback-header">
          <div>
            <p className="treasury-eyebrow">Treasury Intelligence Cycle</p>

            <h2 className="treasury-section-title">
              Treasury Intelligence Feedback Loop
            </h2>

            <p className="treasury-section-description">
              Captures execution outcomes and refreshes treasury intelligence
              signals, assessments and recommendations.
            </p>
          </div>

          <div className="treasury-feedback-status">
            <span>Cycle Status</span>
            <strong>ACTIVE</strong>
          </div>
        </div>

        <div className="treasury-feedback-grid">
          {metrics.map((item) => (
            <div className="treasury-feedback-metric" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="treasury-feedback-body">
          <div className="treasury-feedback-summary">
            <h3>Latest Feedback Summary</h3>

            <div className="treasury-feedback-list">
              {feedbackItems.map((item) => (
                <div className="treasury-feedback-item" key={item}>
                  <span>✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="treasury-feedback-impact">
            <h3>Feedback Impact</h3>

            <div className="treasury-feedback-impact-list">
              {impacts.map((item) => (
                <div className="treasury-impact-row" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="treasury-feedback-runtime">
          Treasury Intelligence is now operating as a continuous feedback cycle,
          linking execution results back into signal, assessment and
          recommendation refresh.
        </div>
      </div>
    </section>
  );
}