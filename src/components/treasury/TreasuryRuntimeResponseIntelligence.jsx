export default function TreasuryRuntimeResponseIntelligence() {
const metrics = [
{ label: "Response Status", value: "ACTIVE" },
{ label: "Readiness", value: "94%" },
{ label: "Confidence", value: "91%" },
{ label: "Responses", value: "03" },
];

const responseQueue = [
{
signal: "Liquidity Pressure",
action: "Allocate Buffer",
status: "RUNNING",
},
{
signal: "Risk Escalation",
action: "Governance Review",
status: "ACTIVE",
},
{
signal: "Policy Alert",
action: "Compliance Check",
status: "ACTIVE",
},
];

return ( <section className="treasury-runtime-response-intelligence"> <div className="runtime-response-card"> <div className="runtime-response-header"> <div> <p className="runtime-response-eyebrow">
Treasury Runtime Intelligence </p>


        <h2 className="runtime-response-title">
          Runtime Response Intelligence
        </h2>

        <p className="runtime-response-description">
          Runtime response coordination layer responsible for executing
          treasury actions, stabilizing operational conditions and
          orchestrating institutional response pathways.
        </p>
      </div>

      <div className="runtime-response-command-badge">
        <span>Runtime</span>
        <strong>Response</strong>
      </div>
    </div>

    <div className="runtime-response-metrics">
      {metrics.map((item) => (
        <div key={item.label} className="runtime-response-metric">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>

    <div className="runtime-response-engine">
      <div className="response-engine-header">
        <h3>AI Runtime Response Engine</h3>
      </div>

      <div className="response-engine-grid">
        <div className="response-engine-item">
          <span>Current Runtime Action</span>
          <strong>Allocate Liquidity Buffer</strong>
        </div>

        <div className="response-engine-item">
          <span>Response Confidence</span>
          <strong>91%</strong>
        </div>

        <div className="response-engine-item">
          <span>Execution Readiness</span>
          <strong>94%</strong>
        </div>
      </div>
    </div>

    <div className="runtime-response-queue">
      <div className="runtime-response-section-header">
        <h3>Runtime Response Queue</h3>
      </div>

      {responseQueue.map((item) => (
        <div key={item.signal} className="response-row">
          <div>
            <span className="response-label">{item.signal}</span>
            <strong>{item.action}</strong>
          </div>

          <div className="response-status">{item.status}</div>
        </div>
      ))}
    </div>

    <div className="runtime-response-matrix">
      <div className="runtime-response-section-header">
        <h3>Runtime Response Matrix</h3>
      </div>

      <table>
        <thead>
          <tr>
            <th>Signal</th>
            <th>Alert</th>
            <th>Response</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Liquidity</td>
            <td>ACTIVE</td>
            <td>Buffer Allocation</td>
            <td>RUNNING</td>
          </tr>

          <tr>
            <td>Risk</td>
            <td>WARNING</td>
            <td>Governance Review</td>
            <td>ACTIVE</td>
          </tr>

          <tr>
            <td>Policy</td>
            <td>ALERT</td>
            <td>Compliance Check</td>
            <td>ACTIVE</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="runtime-response-footer-banner"> 
        <span>Runtime Response Intelligence</span> 
        <strong>Active</strong> 
    </div>

  </div>
</section>


);
}
