import "../../styles/treasury/treasury-escalation.css";

function getRoutingModel(severity = "HIGH") {
  const level = String(severity || "HIGH").toUpperCase();

  const routes = {
    SAFE: {
      route: "Standard Treasury Monitoring",
      owner: "Treasury Operations",
      response: "Observe liquidity and maintain portfolio balance.",
      timeline: "Normal Monitoring Cycle",
    },

    WATCH: {
      route: "Liquidity Observation Route",
      owner: "Treasury Risk Team",
      response: "Monitor reserve pressure and deployment exposure.",
      timeline: "24H Monitoring Window",
    },

    HIGH: {
      route: "Defensive Liquidity Protection",
      owner: "Senior Treasury Desk",
      response: "Reduce aggressive deployment and stabilize liquidity.",
      timeline: "Immediate Treasury Review",
    },

    CRITICAL: {
      route: "Emergency Treasury Stabilization",
      owner: "Executive Treasury Office",
      response: "Freeze risky treasury movement and activate reserve defense.",
      timeline: "Emergency Response Activated",
    },

    BLOCKED: {
      route: "Governance Resolution Route",
      owner: "Treasury Governance Board",
      response: "Execution blocked until governance review completes.",
      timeline: "Awaiting Executive Approval",
    },
  };

  return routes[level] || routes.HIGH;
}

export default function TreasuryActionRouter({
  severity = "HIGH",
}) {
  const model = getRoutingModel(severity);

  return (
    <section className="treasury-router-card">
      <div className="treasury-router-header">
        <div>
          <p className="router-eyebrow">
            Treasury Routing Intelligence
          </p>

          <h2 className="router-title">
            Treasury Action Router
          </h2>
        </div>

        <div className="router-status">
          ACTIVE ROUTING
        </div>
      </div>

      <div className="router-grid">

        <div className="router-panel">
          <span className="router-label">
            Routing Path
          </span>

          <h3>{model.route}</h3>

          <p>{model.response}</p>
        </div>

        <div className="router-panel">
          <span className="router-label">
            Treasury Owner
          </span>

          <h3>{model.owner}</h3>

          <p>
            Responsible operational treasury authority.
          </p>
        </div>

        <div className="router-panel">
          <span className="router-label">
            Response Timeline
          </span>

          <h3>{model.timeline}</h3>

          <p>
            Institutional treasury response schedule.
          </p>
        </div>

      </div>
    </section>
  );
}