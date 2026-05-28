import { useState } from "react";

export default function ParallelApprovalRoutingEngine() {
  const approvalLanes = [
    {
      lane: "Lane A",
      authority: "Treasury Board",
      route: "Capital Approval",
      status: "APPROVED",
      priority: "HIGH",
      progress: 96,
      note: "Treasury Board approval lane is already cleared.",
    },
    {
      lane: "Lane B",
      authority: "Risk Authority",
      route: "Risk Validation",
      status: "REVIEW",
      priority: "CRITICAL",
      progress: 78,
      note: "Risk Authority requires priority review before final convergence.",
    },
    {
      lane: "Lane C",
      authority: "Liquidity Command",
      route: "Liquidity Clearance",
      status: "ACTIVE",
      priority: "MEDIUM",
      progress: 84,
      note: "Liquidity clearance is active and supporting approval flow.",
    },
    {
      lane: "Lane D",
      authority: "Executive Signoff",
      route: "Executive Signoff",
      status: "PENDING",
      priority: "HIGH",
      progress: 64,
      note: "Executive Signoff remains pending and should be monitored.",
    },
  ];

  const [selectedAuthority, setSelectedAuthority] = useState("Risk Authority");

  const selectedLane =
    approvalLanes.find((lane) => lane.authority === selectedAuthority) ||
    approvalLanes[1];

  return (
    <section className="parallel-approval-routing-engine">
      <div className="parallel-routing-header">
        <div>
          <p className="parallel-routing-eyebrow">
            PARALLEL APPROVAL ROUTING ENGINE
          </p>

          <h2>Multi-Authority Approval Flow</h2>

          <p className="parallel-routing-subtitle">
            Simultaneous treasury approval lanes for distributed governance,
            executive routing priority and institutional route convergence.
          </p>
        </div>

        <div className="parallel-routing-pill">PARALLEL ROUTING</div>
      </div>

      <div className="parallel-routing-grid">
        {approvalLanes.map((lane) => (
          <div
            className={`approval-lane-card ${
              selectedAuthority === lane.authority ? "selected" : ""
            }`}
            key={lane.lane}
          >
            <div className="approval-lane-top">
              <span>{lane.lane}</span>
              <strong>{lane.status}</strong>
            </div>

            <h3>{lane.authority}</h3>

            <p>{lane.route}</p>

            <div className="approval-lane-meta">
              <span>Priority</span>
              <strong>{lane.priority}</strong>
            </div>

            <div className="approval-progress-track">
              <div
                className={`approval-progress-fill ${lane.status.toLowerCase()}`}
                style={{ width: `${lane.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="parallel-routing-flow">
        <div>
          <small>ROUTE CONVERGENCE MONITOR</small>
          <h3>{selectedLane.authority} route selected</h3>
          <p className="parallel-selected-note">{selectedLane.note}</p>
        </div>

        <div className="parallel-flow-steps">
          {approvalLanes.map((lane) => (
            <button
              key={lane.authority}
              className={
                selectedAuthority === lane.authority ? "active" : ""
              }
              onClick={() => setSelectedAuthority(lane.authority)}
            >
              {lane.authority}
            </button>
          ))}
        </div>
      </div>

      <div className="parallel-routing-ai-panel">
        <div>
          <small>AI APPROVAL PATH RECOMMENDATION</small>
          <h3>{selectedLane.authority} routing focus active</h3>
        </div>

        <p>
          {selectedLane.note} AI governance coordination recommends maintaining
          parallel approval lanes while monitoring route convergence status.
        </p>
      </div>
    </section>
  );
}