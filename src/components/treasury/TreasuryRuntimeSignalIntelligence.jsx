export default function TreasuryRuntimeSignalIntelligence() {
  const metrics = [
    {
      label: "Active Signals",
      value: "04",
    },
    {
      label: "Signal Confidence",
      value: "92%",
    },
    {
      label: "Escalation Risk",
      value: "LOW",
    },
    {
      label: "Runtime Status",
      value: "STABLE",
    },
  ];

  const signals = [
    {
      signal: "Liquidity Stable",
      severity: "LOW",
      confidence: "93%",
      trend: "STABLE",
    },
    {
      signal: "Capital Pressure",
      severity: "MEDIUM",
      confidence: "88%",
      trend: "RISING",
    },
    {
      signal: "Runtime Escalation",
      severity: "HIGH",
      confidence: "91%",
      trend: "ACTIVE",
    },
    {
      signal: "Treasury Recovery",
      severity: "LOW",
      confidence: "95%",
      trend: "IMPROVING",
    },
  ];

  return (
    <section className="treasury-runtime-signal-intelligence">
      <div className="runtime-signal-card">
        <p className="runtime-signal-eyebrow">
          Treasury Runtime Intelligence
        </p>

        <h2 className="runtime-signal-title">
          Runtime Signal Intelligence
        </h2>

        <p className="runtime-signal-description">
          Real-time treasury signal detection layer responsible for runtime
          condition monitoring, escalation awareness, confidence validation,
          and operational signal generation.
        </p>

        <div className="runtime-signal-status">
          <span>Runtime</span>
          <strong>SIGNALS</strong>
        </div>

        <div className="runtime-signal-metrics">
          {metrics.map((item) => (
            <div
              key={item.label}
              className="runtime-signal-metric"
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="runtime-signal-table">
          <div className="runtime-signal-header">
            <span>Signal</span>
            <span>Severity</span>
            <span>Confidence</span>
            <span>Trend</span>
          </div>

          {signals.map((item) => (
            <div
              key={item.signal}
              className="runtime-signal-row"
            >
              <span>{item.signal}</span>

              <span className={`severity ${item.severity.toLowerCase()}`}>
                {item.severity}
              </span>

              <span>{item.confidence}</span>
              <span>{item.trend}</span>
            </div>
          ))}
        </div>

        <div className="runtime-signal-footer">
          <span>Runtime Signal Intelligence</span>
          <strong>ACTIVE</strong>
        </div>
      </div>
    </section>
  );
}