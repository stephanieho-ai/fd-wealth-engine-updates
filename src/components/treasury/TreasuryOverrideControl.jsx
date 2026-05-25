import "../../styles/treasury/treasury-escalation.css";

function getOverrideModel(severity = "HIGH") {
  const level = String(severity || "HIGH").toUpperCase();

  if (level === "BLOCKED") {
    return {
      status: "Override Locked",
      authority: "Board Approval Required",
      mode: "Governance Lockdown",
      gate: "Manual executive clearance required before treasury execution can resume.",
    };
  }

  if (level === "CRITICAL") {
    return {
      status: "Override Restricted",
      authority: "Executive Treasury Office",
      mode: "Emergency Control",
      gate: "Senior approval required before high-risk treasury movement.",
    };
  }

  return {
    status: "Override Standby",
    authority: "Treasury Operations",
    mode: "Standard Control",
    gate: "Override is not required under current treasury conditions.",
  };
}

export default function TreasuryOverrideControl({ severity = "HIGH" }) {
  const model = getOverrideModel(severity);

  return (
    <section className="treasury-override-control">
      <div className="override-header">
        <div>
          <p className="override-eyebrow">Executive Override Layer</p>
          <h2 className="override-title">Treasury Override Control</h2>
        </div>

        <div className="override-status">{model.status}</div>
      </div>

      <div className="override-grid">
        <div className="override-card">
          <span>Authority Level</span>
          <h3>{model.authority}</h3>
          <p>Defines who can unlock or approve treasury response actions.</p>
        </div>

        <div className="override-card">
          <span>Control Mode</span>
          <h3>{model.mode}</h3>
          <p>Current executive control state for treasury operations.</p>
        </div>

        <div className="override-card">
          <span>Final Decision Gate</span>
          <h3>Execution Gate</h3>
          <p>{model.gate}</p>
        </div>
      </div>
    </section>
  );
}