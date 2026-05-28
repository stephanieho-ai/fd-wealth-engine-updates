import { useState } from "react";

export default function GovernanceEscalationHierarchyEngine() {
  const hierarchy = [
    {
      level: "01",
      authority: "Operational Desk",
      role: "Initial Review",
      status: "ACTIVE",
      priority: "STANDARD",
      note: "Operational Desk is handling first-level governance review.",
    },
    {
      level: "02",
      authority: "Risk Authority",
      role: "Exposure Escalation",
      status: "MONITOR",
      priority: "HIGH",
      note: "Risk Authority is monitoring escalation exposure and policy pressure.",
    },
    {
      level: "03",
      authority: "Treasury Board",
      role: "Capital Governance",
      status: "READY",
      priority: "EXECUTIVE",
      note: "Treasury Board is ready for capital governance escalation.",
    },
    {
      level: "04",
      authority: "Executive Committee",
      role: "Final Override",
      status: "STANDBY",
      priority: "CRITICAL",
      note: "Executive Committee remains available for final override authority.",
    },
  ];

  const [selectedAuthority, setSelectedAuthority] = useState("Risk Authority");

  const selectedLevel =
    hierarchy.find((item) => item.authority === selectedAuthority) ||
    hierarchy[1];

  return (
    <section className="governance-escalation-hierarchy">
      <div className="governance-escalation-header">
        <div>
          <p className="governance-escalation-eyebrow">
            GOVERNANCE ESCALATION HIERARCHY
          </p>

          <h2>Executive Authority Escalation Ladder</h2>

          <p className="governance-escalation-subtitle">
            Multi-level institutional governance escalation pathway for
            authority transfer, executive override and emergency decision
            routing.
          </p>
        </div>

        <div className="governance-escalation-pill">ESCALATION LADDER</div>
      </div>

      <div className="governance-escalation-grid">
        {hierarchy.map((item) => (
          <div
            className={`escalation-level-card ${
              selectedAuthority === item.authority ? "selected" : ""
            }`}
            key={item.level}
          >
            <div className="escalation-level-top">
              <span>LEVEL {item.level}</span>
              <strong>{item.status}</strong>
            </div>

            <h3>{item.authority}</h3>

            <p>{item.role}</p>

            <div className="escalation-priority">
              <span>Priority</span>
              <strong>{item.priority}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="governance-escalation-flow">
        {hierarchy.map((item) => (
          <button
            key={item.authority}
            className={selectedAuthority === item.authority ? "active" : ""}
            onClick={() => setSelectedAuthority(item.authority)}
          >
            {item.authority}
          </button>
        ))}
      </div>

      <div className="governance-escalation-ai-panel">
        <div>
          <small>AI ESCALATION RECOMMENDATION</small>
          <h3>{selectedLevel.authority} escalation focus active</h3>
        </div>

        <p>{selectedLevel.note}</p>
      </div>
    </section>
  );
}