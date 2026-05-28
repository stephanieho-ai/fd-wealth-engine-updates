import { useState } from "react";

export default function GovernanceInterventionEngine() {
  const initialInterventions = [
    {
      trigger: "Routing Pressure",
      action: "Redistribute Approval Load",
      authority: "Risk Authority",
      status: "ACTIVE",
      severity: "high",
    },
    {
      trigger: "Escalation Exposure",
      action: "Suppress Non-Critical Escalation",
      authority: "Treasury Board",
      status: "MONITOR",
      severity: "medium",
    },
    {
      trigger: "Consensus Drift",
      action: "Synchronize Authority Nodes",
      authority: "AI Governance Core",
      status: "READY",
      severity: "low",
    },
    {
      trigger: "Authority Stress",
      action: "Transfer Queue Load",
      authority: "Executive Committee",
      status: "STANDBY",
      severity: "medium",
    },
  ];

  const [interventions, setInterventions] = useState(initialInterventions);
  const [latestAction, setLatestAction] = useState(
    "No intervention action executed yet."
  );

  const handleAction = (trigger, actionType) => {
    const nextStatus =
      actionType === "review"
        ? "UNDER REVIEW"
        : actionType === "apply"
        ? "APPLIED"
        : "SUPPRESSED";

    setInterventions((prev) =>
      prev.map((item) =>
        item.trigger === trigger ? { ...item, status: nextStatus } : item
      )
    );

    setLatestAction(
      `${nextStatus}: ${trigger} intervention routed through Governance Intervention Engine.`
    );
  };

  return (
    <section className="governance-intervention-engine">
      <div className="governance-intervention-header">
        <div>
          <p className="governance-intervention-eyebrow">
            GOVERNANCE INTERVENTION ENGINE
          </p>

          <h2>Institutional Governance Intervention Control</h2>

          <p className="governance-intervention-subtitle">
            Governance intervention layer for routing correction, escalation
            suppression, authority load transfer and AI action recommendation.
          </p>
        </div>

        <div className="governance-intervention-pill">
          INTERVENTION MODE
        </div>
      </div>

      <div className="governance-intervention-grid">
        {interventions.map((item) => (
          <div
            className={`intervention-card ${item.severity}`}
            key={item.trigger}
          >
            <div className="intervention-card-top">
              <span>{item.trigger}</span>
              <strong>{item.status}</strong>
            </div>

            <h3>{item.action}</h3>

            <p>{item.authority}</p>

            <div className="intervention-action-row">
              <button onClick={() => handleAction(item.trigger, "review")}>
                Review
              </button>

              <button onClick={() => handleAction(item.trigger, "apply")}>
                Apply
              </button>

              <button onClick={() => handleAction(item.trigger, "suppress")}>
                Suppress
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="governance-intervention-ai-panel">
        <div>
          <small>AI INTERVENTION INSTRUCTION</small>
          <h3>Routing correction recommended</h3>
        </div>

        <p>{latestAction}</p>
      </div>
    </section>
  );
}