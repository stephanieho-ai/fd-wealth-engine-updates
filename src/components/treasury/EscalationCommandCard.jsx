import "../../styles/treasury/treasury-escalation.css";

function getEscalationModel(severity = "HIGH") {
  const level = String(severity || "HIGH").toUpperCase();

  const map = {
    SAFE: {
      status: "Stable Monitoring",
      threatLevel: "SAFE",
      action: "Maintain Treasury Structure",
      priority: "NORMAL",
      trigger: "No Escalation",
      route: "Standard Treasury Monitoring Protocol",
      message:
        "Treasury position remains stable. Continue normal monitoring and liquidity observation.",
    },
    WATCH: {
      status: "Watch Response",
      threatLevel: "WATCH",
      action: "Monitor Liquidity Pressure",
      priority: "IMPORTANT",
      trigger: "Manager Review Optional",
      route: "Treasury Watchlist Monitoring Protocol",
      message:
        "Early pressure detected. Treasury should monitor liquidity movement and reserve coverage.",
    },
    HIGH: {
      status: "High Response",
      threatLevel: "HIGH",
      action: "Increase Liquidity Buffer",
      priority: "URGENT",
      trigger: "Escalation Required",
      route: "Defensive Liquidity Stabilization Protocol",
      message:
        "Liquidity stress escalation detected across treasury allocation clusters.",
    },
    CRITICAL: {
      status: "Critical Response",
      threatLevel: "CRITICAL",
      action: "Freeze Aggressive Deployment",
      priority: "IMMEDIATE",
      trigger: "Executive Review Required",
      route: "Treasury Emergency Intervention Protocol",
      message:
        "Critical treasury pressure detected. Deployment should be restricted until liquidity improves.",
    },
    BLOCKED: {
      status: "Blocked Response",
      threatLevel: "BLOCKED",
      action: "Stop Treasury Execution",
      priority: "IMMEDIATE",
      trigger: "Executive Approval Required",
      route: "Governance Block Resolution Protocol",
      message:
        "Policy engine has blocked execution. Treasury action requires governance review before continuation.",
    },
  };

  return map[level] || map.HIGH;
}

export default function EscalationCommandCard({ severity = "HIGH" }) {
  const model = getEscalationModel(severity);

  return (
    <section className={`escalation-command-card severity-${model.threatLevel.toLowerCase()}`}>
      <div className="escalation-header">
        <div>
          <p className="escalation-eyebrow">Treasury Escalation Engine</p>

          <h2 className="escalation-title">Escalation Command Center</h2>
        </div>

        <div className={`escalation-status ${model.threatLevel.toLowerCase()}`}>
          {model.status}
        </div>
      </div>

      <div className="escalation-grid">
        <div className="escalation-panel">
          <span className="panel-label">Threat Level</span>
          <h3>{model.threatLevel}</h3>
          <p>{model.message}</p>
        </div>

        <div className="escalation-panel">
          <span className="panel-label">Recommended Action</span>
          <h3>{model.action}</h3>
          <p>
            System recommendation based on treasury pressure, policy status,
            liquidity condition and operational exposure.
          </p>
        </div>

        <div className="escalation-panel">
          <span className="panel-label">Intervention Priority</span>
          <h3>{model.priority}</h3>
          <p>
            Treasury intervention priority is calculated from current severity
            and execution governance status.
          </p>
        </div>

        <div className="escalation-panel">
          <span className="panel-label">Executive Trigger</span>
          <h3>{model.trigger}</h3>
          <p>
            Determines whether senior treasury or executive-level approval is
            required before further action.
          </p>
        </div>
      </div>

      <div className="escalation-footer">
        <div className="footer-left">
          <span className="footer-label">Treasury Action Routing</span>
          <strong>{model.route}</strong>
        </div>

        <button className="escalation-action-button">
          Activate Treasury Response
        </button>
      </div>
    </section>
  );
}