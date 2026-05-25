import "../../styles/treasury/treasury-escalation.css";

function getTimelineSteps(severity = "HIGH") {
  const level = String(severity || "HIGH").toUpperCase();

  const blocked = level === "BLOCKED";
  const critical = level === "CRITICAL" || blocked;
  const high = level === "HIGH" || critical;

  return [
    {
      label: "Detect",
      status: "Completed",
      note: "Treasury risk condition detected.",
      active: true,
    },
    {
      label: "Escalate",
      status: high ? "Active" : "Standby",
      note: high
        ? "Escalation signal activated."
        : "No major escalation required.",
      active: high,
    },
    {
      label: "Route",
      status: high ? "Active" : "Standby",
      note: high
        ? "Treasury action route selected."
        : "Standard monitoring route.",
      active: high,
    },
    {
      label: "Approve",
      status: blocked || critical ? "Required" : "Optional",
      note:
        blocked || critical
          ? "Executive approval required before execution."
          : "Approval not mandatory under current severity.",
      active: blocked || critical,
    },
    {
      label: "Resolve",
      status: blocked ? "Waiting" : "Pending",
      note: blocked
        ? "Resolution is waiting for governance clearance."
        : "Resolution will proceed after response action.",
      active: false,
    },
  ];
}

export default function TreasuryResponseTimeline({ severity = "HIGH" }) {
  const steps = getTimelineSteps(severity);

  return (
    <section className="treasury-response-timeline">
      <div className="response-timeline-header">
        <div>
          <p className="response-eyebrow">Treasury Response Workflow</p>
          <h2 className="response-title">Response Timeline</h2>
        </div>

        <div className="response-status">LIVE WORKFLOW</div>
      </div>

      <div className="response-steps">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className={`response-step ${step.active ? "active" : ""}`}
          >
            <div className="step-index">{index + 1}</div>

            <div>
              <span className="step-status">{step.status}</span>
              <h3>{step.label}</h3>
              <p>{step.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}