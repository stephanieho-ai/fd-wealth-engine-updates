export default function TreasuryRuntimeAlertIntelligence() {
  const alerts = [
    {
      title: "Runtime Confidence Drop",
      severity: "MEDIUM",
      time: "08:41",
    },
    {
      title: "Signal Escalation Detected",
      severity: "HIGH",
      time: "08:38",
    },
    {
      title: "Synchronization Delay",
      severity: "LOW",
      time: "08:30",
    },
    {
      title: "Runtime Pressure Warning",
      severity: "MEDIUM",
      time: "08:24",
    },
  ];

  const metrics = [
    {
      label: "Active Alerts",
      value: "03",
    },
    {
      label: "Critical Alerts",
      value: "00",
    },
    {
      label: "Alert Readiness",
      value: "94%",
    },
    {
      label: "Monitoring Status",
      value: "ACTIVE",
    },
  ];

  return (
    <section className="treasury-runtime-alert-intelligence">
      <div className="treasury-runtime-alert-card">

        <div className="runtime-alert-header">
          <div>
            <p className="runtime-alert-eyebrow">
              Treasury Runtime Intelligence
            </p>

            <h2 className="runtime-alert-title">
              Treasury Runtime Alert Intelligence
            </h2>

            <p className="runtime-alert-description">
              Runtime alert monitoring layer responsible for early warning
              detection, alert classification, readiness monitoring and
              operational awareness generation.
            </p>
          </div>

          <div className="runtime-alert-status">
            <span>Active Alerts</span>
            <strong>03</strong>
          </div>
        </div>

        <div className="runtime-alert-metrics">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="runtime-alert-metric"
            >
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>

        <div className="runtime-alert-feed">

          <div className="runtime-alert-feed-header">
            Latest Runtime Alerts
          </div>

          {alerts.map((alert) => (
            <div
              key={alert.title}
              className="runtime-alert-item"
            >
              <div>
                <h4>{alert.title}</h4>
                <p>{alert.time}</p>
              </div>

              <span
                className={`severity-pill severity-${alert.severity.toLowerCase()}`}
              >
                {alert.severity}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}