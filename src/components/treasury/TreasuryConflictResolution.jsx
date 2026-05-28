import { useState } from "react";

export default function TreasuryConflictResolution() {
  const initialConflicts = [
    {
      authority: "Treasury Board",
      issue: "Liquidity reserve disagreement",
      severity: "MEDIUM",
      recommendation: "Route for governance review",
      status: "UNDER REVIEW",
    },
    {
      authority: "Risk Authority",
      issue: "Escalation approval mismatch",
      severity: "HIGH",
      recommendation: "Executive arbitration required",
      status: "PENDING",
    },
    {
      authority: "Executive Committee",
      issue: "Recovery allocation conflict",
      severity: "LOW",
      recommendation: "AI synchronization stable",
      status: "MONITOR",
    },
  ];

  const [conflicts, setConflicts] = useState(initialConflicts);
  const [latestAction, setLatestAction] = useState(
    "Institutional governance mesh remains stable. Executive treasury authorities continue synchronized approval routing under monitored arbitration mode."
  );

  const handleConflictAction = (issue, actionType) => {
    const nextStatus =
      actionType === "review"
        ? "UNDER REVIEW"
        : actionType === "arbitrate"
        ? "ARBITRATION ACTIVE"
        : "SYNCHRONIZED";

    setConflicts((prev) =>
      prev.map((item) =>
        item.issue === issue ? { ...item, status: nextStatus } : item
      )
    );

    setLatestAction(
      `${nextStatus}: ${issue} has been processed through Governance Arbitration Engine.`
    );
  };

  return (
    <section className="treasury-conflict-resolution">
      <div className="conflict-header">
        <div>
          <p className="conflict-eyebrow">GOVERNANCE CONFLICT RESOLUTION</p>

          <h2>Institutional Governance Arbitration</h2>

          <p className="conflict-subtitle">
            Treasury governance conflict monitoring across distributed
            executive authorities, liquidity routing approval and institutional
            recovery orchestration.
          </p>
        </div>

        <div className="conflict-mode-pill">ARBITRATION MODE</div>
      </div>

      <div className="conflict-overview-grid">
        <div className="conflict-overview-card">
          <span>Active Conflicts</span>
          <strong>{conflicts.length}</strong>
          <p>Distributed governance conflicts currently under treasury arbitration review.</p>
        </div>

        <div className="conflict-overview-card">
          <span>Consensus Stability</span>
          <strong>87%</strong>
          <p>Governance mesh synchronization remains operationally stable.</p>
        </div>

        <div className="conflict-overview-card">
          <span>AI Arbitration</span>
          <strong>ACTIVE</strong>
          <p>AI governance coordination engine supervising approval routing.</p>
        </div>
      </div>

      <div className="conflict-list">
        {conflicts.map((conflict, index) => (
          <div className="conflict-card" key={`${conflict.authority}-${index}`}>
            <div className="conflict-card-top">
              <div>
                <small>{conflict.authority}</small>
                <h3>{conflict.issue}</h3>
              </div>

              <div className={`conflict-severity ${conflict.severity.toLowerCase()}`}>
                {conflict.severity}
              </div>
            </div>

            <div className="conflict-meta-grid">
              <div>
                <span>Status</span>
                <strong>{conflict.status}</strong>
              </div>

              <div>
                <span>Recommendation</span>
                <strong>{conflict.recommendation}</strong>
              </div>
            </div>

            <div className="conflict-actions">
              <button onClick={() => handleConflictAction(conflict.issue, "review")}>
                Review
              </button>

              <button onClick={() => handleConflictAction(conflict.issue, "arbitrate")}>
                Arbitrate
              </button>

              <button onClick={() => handleConflictAction(conflict.issue, "synchronize")}>
                Synchronize
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="conflict-ai-panel">
        <div>
          <small>AI GOVERNANCE ARBITRATION</small>
          <h3>Governance convergence stabilization active</h3>
        </div>

        <p>{latestAction}</p>
      </div>
    </section>
  );
}