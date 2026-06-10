export default function TreasuryRuntimeEscalationIntelligence() {
  const metrics = [
    {
      label: "Escalation Level",
      value: "HIGH",
    },
    {
      label: "Priority",
      value: "URGENT",
    },
    {
      label: "Confidence",
      value: "93%",
    },
    {
      label: "Governance Route",
      value: "BOARD",
    },
  ];

  const pipeline = [
    "Signal Detection",
    "Alert Validation",
    "Escalation Decision",
    "Governance Routing",
    "Executive Response",
  ];

  return (
    <section className="treasury-runtime-escalation-intelligence">
      <div className="runtime-escalation-card">

        <div className="runtime-escalation-header">
          <div>
            <p className="runtime-escalation-eyebrow">
              Treasury Runtime Intelligence
            </p>

            <h2 className="runtime-escalation-title">
              Runtime Escalation Intelligence
            </h2>

            <p className="runtime-escalation-description">
              Runtime escalation engine responsible for severity
              classification, escalation routing, priority intelligence
              and governance activation across treasury operations.
            </p>
          </div>

          <div className="runtime-escalation-status">
            <span>Status</span>
            <strong>ESCALATION ACTIVE</strong>
          </div>
        </div>

        <div className="runtime-escalation-hero">
          <div className="runtime-escalation-badge">
            HIGH PRIORITY
          </div>

          <h3>
            Governance Escalation Monitoring
          </h3>

          <p>
            Elevated runtime pressure detected. Escalation intelligence
            actively monitoring governance readiness and routing pathways.
          </p>
        </div>

        <div className="runtime-escalation-metrics">
          {metrics.map((item) => (
            <div
              key={item.label}
              className="runtime-escalation-metric"
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="runtime-escalation-pipeline">
          <div className="runtime-escalation-section-header">
            <h3>Escalation Pipeline</h3>
          </div>

          <div className="runtime-escalation-flow">
            {pipeline.map((step, index) => (
              <div
                key={step}
                className="runtime-escalation-step"
              >
                <span>{step}</span>

                {index !== pipeline.length - 1 && (
                  <div className="runtime-escalation-arrow">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="runtime-escalation-recommendation">
          <div className="runtime-escalation-section-header">
            <h3>AI Escalation Recommendation</h3>
          </div>

          <p>
            Increase governance attention due to elevated runtime
            pressure and rising alert concentration. Maintain
            continuous monitoring while preserving operational
            readiness and decision confidence.
          </p>
        </div>

      </div>
    </section>
  );
}