export default function GovernanceLatencyIntelligence() {
  const latencyNodes = [
    {
      authority: "Treasury Board",
      responseTime: "1.2s",
      status: "OPTIMAL",
      risk: "LOW",
    },
    {
      authority: "Risk Authority",
      responseTime: "2.8s",
      status: "MONITOR",
      risk: "MEDIUM",
    },
    {
      authority: "Executive Committee",
      responseTime: "3.1s",
      status: "WATCH",
      risk: "MEDIUM",
    },
    {
      authority: "Liquidity Command",
      responseTime: "1.7s",
      status: "STABLE",
      risk: "LOW",
    },
  ];

  return (
    <section className="governance-latency-intelligence">
      <div className="latency-header">
        <div>
          <p className="latency-eyebrow">GOVERNANCE LATENCY INTELLIGENCE</p>

          <h2>Institutional Approval Timing Network</h2>

          <p className="latency-subtitle">
            Real-time timing intelligence for distributed treasury governance,
            approval delay monitoring, authority response speed and routing
            bottleneck detection.
          </p>
        </div>

        <div className="latency-mode-pill">LATENCY RADAR</div>
      </div>

      <div className="latency-metric-grid">
        <div className="latency-metric-card">
          <span>Average Approval Delay</span>
          <strong>2.2s</strong>
          <p>Current distributed governance response average.</p>
        </div>

        <div className="latency-metric-card">
          <span>Synchronization Lag</span>
          <strong>LOW</strong>
          <p>Mesh synchronization timing remains stable.</p>
        </div>

        <div className="latency-metric-card">
          <span>Authority Response</span>
          <strong>STABLE</strong>
          <p>Executive approval nodes remain within response range.</p>
        </div>

        <div className="latency-metric-card">
          <span>Bottleneck Risk</span>
          <strong>MONITOR</strong>
          <p>Risk Authority and Executive Committee require timing watch.</p>
        </div>
      </div>

      <div className="latency-routing-panel">
        <div>
          <p className="latency-panel-label">APPROVAL ROUTING DELAY MAP</p>
          <h3>Authority Response Timing</h3>
        </div>

        <div className="latency-node-list">
          {latencyNodes.map((node) => (
            <div className="latency-node-row" key={node.authority}>
              <div>
                <strong>{node.authority}</strong>
                <span>{node.status}</span>
              </div>

              <div className="latency-bar-track">
                <div
                  className={`latency-bar-fill ${node.risk.toLowerCase()}`}
                  style={{
                    width:
                      node.risk === "LOW"
                        ? "42%"
                        : node.risk === "MEDIUM"
                        ? "68%"
                        : "86%",
                  }}
                />
              </div>

              <div className={`latency-risk ${node.risk.toLowerCase()}`}>
                <strong>{node.responseTime}</strong>
                <span>{node.risk}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="latency-ai-panel">
        <div>
          <small>AI LATENCY FORECAST</small>
          <h3>Governance routing remains stable</h3>
        </div>

        <p>
          AI timing prediction indicates no critical approval congestion.
          Maintain monitored routing while watching medium-latency authority
          nodes for possible delay expansion.
        </p>
      </div>
    </section>
  );
}