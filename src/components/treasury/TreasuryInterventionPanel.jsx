import "../../styles/treasury/treasury-escalation.css";

function getInterventionModel(severity = "HIGH") {
  const level = String(severity || "HIGH").toUpperCase();

  const models = {
    SAFE: {
      status: "CLEAR",
      approval: "Not Required",
      authority: "Treasury Operations",
      execution: "Execution Allowed",
      trigger: "No executive intervention required.",
      decision: "Continue standard treasury monitoring.",
    },
    WATCH: {
      status: "WATCH",
      approval: "Optional Review",
      authority: "Treasury Risk Team",
      execution: "Execution Allowed With Monitoring",
      trigger: "Early warning signal detected.",
      decision: "Monitor liquidity and reserve position before large deployment.",
    },
    HIGH: {
      status: "ELEVATED",
      approval: "Recommended",
      authority: "Senior Treasury Desk",
      execution: "Limited Execution",
      trigger: "High treasury pressure detected.",
      decision: "Protect reserve first and reduce aggressive deployment.",
    },
    CRITICAL: {
      status: "INTERVENTION REQUIRED",
      approval: "Required",
      authority: "Executive Treasury Office",
      execution: "Execution Restricted",
      trigger: "Critical liquidity or policy pressure detected.",
      decision: "Freeze aggressive deployment until treasury position improves.",
    },
    BLOCKED: {
      status: "EXECUTIVE LOCK",
      approval: "Mandatory",
      authority: "Treasury Governance Board",
      execution: "Execution Blocked",
      trigger: "Policy engine has blocked treasury execution.",
      decision: "Resolve governance block before any new treasury action.",
    },
  };

  return models[level] || models.HIGH;
}

export default function TreasuryInterventionPanel({ severity = "HIGH" }) {
  const model = getInterventionModel(severity);

  return (
    <section className="treasury-intervention-panel">
      <div className="intervention-header">
        <div>
          <p className="intervention-eyebrow">
            Executive Intervention Trigger
          </p>
          <h2 className="intervention-title">
            Treasury Intervention Panel
          </h2>
        </div>

        <div className="intervention-status">
          {model.status}
        </div>
      </div>

      <div className="intervention-grid">
        <div className="intervention-card">
          <span>Approval Requirement</span>
          <h3>{model.approval}</h3>
          <p>{model.trigger}</p>
        </div>

        <div className="intervention-card">
          <span>Responsible Authority</span>
          <h3>{model.authority}</h3>
          <p>Institutional owner for treasury intervention decision.</p>
        </div>

        <div className="intervention-card">
          <span>Execution Status</span>
          <h3>{model.execution}</h3>
          <p>{model.decision}</p>
        </div>
      </div>
    </section>
  );
}