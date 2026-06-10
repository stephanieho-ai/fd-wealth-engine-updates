export default function TreasuryRuntimeEscalationIntelligence() {
  const metrics = [
    { label: "Escalation Level", value: "HIGH" },
    { label: "Priority", value: "URGENT" },
    { label: "Confidence", value: "93%" },
    { label: "Governance Route", value: "BOARD" },
  ];

  const engineMetrics = [
    { label: "Escalation Condition", value: "HIGH" },
    { label: "Validation Confidence", value: "93%" },
    { label: "Escalation Priority", value: "URGENT" },
  ];

  const domains = [
    { title: "Alert Escalation", status: "ACTIVE" },
    { title: "Governance Routing", status: "MONITORING" },
    { title: "Executive Response", status: "STANDBY" },
  ];

  const pipeline = [
    {
      stage: "Signal Detection",
      status: "Complete",
      priority: "Low",
      confidence: "94%",
    },
    {
      stage: "Alert Validation",
      status: "Complete",
      priority: "Medium",
      confidence: "91%",
    },
    {
      stage: "Escalation Decision",
      status: "Active",
      priority: "High",
      confidence: "93%",
    },
    {
      stage: "Governance Routing",
      status: "Monitoring",
      priority: "Urgent",
      confidence: "92%",
    },
    {
      stage: "Executive Response",
      status: "Standby",
      priority: "Board",
      confidence: "90%",
    },
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
              Runtime escalation engine responsible for severity classification,
              escalation routing, priority intelligence and governance activation
              across treasury operations.
            </p>
          </div>

          <div className="runtime-escalation-status">
            <span>Status</span>
            <strong>ESCALATION ACTIVE</strong>
          </div>
        </div>

        <div className="runtime-escalation-metrics">
          {metrics.map((item) => (
            <div key={item.label} className="runtime-escalation-metric">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="runtime-escalation-validation-center">
          <div className="runtime-escalation-badge">ESCALATION ACTIVE</div>

          <h3>Runtime Escalation Validation Center</h3>

          <p>
            Escalation validation currently monitoring runtime alerts,
            governance exposure and executive routing readiness across treasury
            runtime domains.
          </p>

          <div className="runtime-escalation-last-event">
            <span>Last Escalation Event</span>
            <strong>08:42 UTC</strong>
            <p>Runtime Pressure Spike</p>
          </div>
        </div>

        <div className="runtime-escalation-ai-engine">
          <h3>AI Runtime Escalation Engine</h3>

          <div className="runtime-escalation-engine-grid">
            {engineMetrics.map((item) => (
              <div key={item.label} className="runtime-escalation-engine-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <p>
            System escalation currently validating alert concentration,
            governance pressure and executive response readiness.
          </p>
        </div>

        <div className="runtime-escalation-domain-grid">
          {domains.map((item) => (
            <div key={item.title} className="runtime-escalation-domain-card">
              <h4>{item.title}</h4>
              <strong>{item.status}</strong>
            </div>
          ))}
        </div>

        <div className="runtime-escalation-pipeline">
          <table>
            <thead>
              <tr>
                <th>Escalation Stage</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Confidence</th>
              </tr>
            </thead>

            <tbody>
              {pipeline.map((item) => (
                <tr key={item.stage}>
                  <td>{item.stage}</td>
                  <td>{item.status}</td>
                  <td>{item.priority}</td>
                  <td>{item.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="runtime-escalation-footer-banner">
          <span>Runtime Escalation Intelligence Layer</span>
          <strong>Governance Escalation Monitoring Active</strong>
        </div>
      </div>
    </section>
  );
}