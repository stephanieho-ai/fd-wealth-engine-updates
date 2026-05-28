import { useState } from "react";

export default function GovernanceDecisionMatrixEngine() {
  const initialDecisions = [
    {
      authority: "Treasury Board",
      decision: "APPROVED",
      confidence: "94%",
      routing: "Liquidity Expansion",
      severity: "stable",
    },
    {
      authority: "Risk Authority",
      decision: "REVIEW",
      confidence: "81%",
      routing: "Exposure Validation",
      severity: "monitor",
    },
    {
      authority: "Executive Committee",
      decision: "PENDING",
      confidence: "72%",
      routing: "Final Governance Approval",
      severity: "warning",
    },
    {
      authority: "Liquidity Command",
      decision: "ACTIVE",
      confidence: "89%",
      routing: "Capital Stabilization",
      severity: "stable",
    },
  ];

  const [decisions, setDecisions] = useState(initialDecisions);
  const [latestAction, setLatestAction] = useState(
    "Institutional treasury authorities continue coordinated approval routing under AI governance orchestration monitoring."
  );

  const handleDecisionAction = (authority, actionType) => {
    const nextDecision =
      actionType === "review"
        ? "UNDER REVIEW"
        : actionType === "synchronize"
        ? "SYNCHRONIZED"
        : "ROUTED";

    setDecisions((prev) =>
      prev.map((item) =>
        item.authority === authority
          ? {
              ...item,
              decision: nextDecision,
              severity:
                actionType === "review"
                  ? "monitor"
                  : actionType === "synchronize"
                  ? "stable"
                  : "stable",
            }
          : item
      )
    );

    setLatestAction(
      `${nextDecision}: ${authority} decision path processed through Governance Decision Matrix.`
    );
  };

  return (
    <section className="decision-matrix-section">
      <div className="decision-matrix-header">
        <div>
          <p className="decision-matrix-eyebrow">
            GOVERNANCE DECISION MATRIX
          </p>

          <h2>Institutional Decision Coordination</h2>

          <p className="decision-matrix-subtext">
            Parallel governance authorities coordinate treasury routing,
            institutional approvals and operational synchronization.
          </p>
        </div>

        <div className="decision-matrix-mode">DECISION MATRIX</div>
      </div>

      <div className="decision-matrix-grid">
        {decisions.map((item, index) => (
          <div key={index} className={`decision-card ${item.severity}`}>
            <div className="decision-card-top">
              <span className="decision-authority">{item.authority}</span>

              <span className={`decision-status ${item.severity}`}>
                {item.decision}
              </span>
            </div>

            <div className="decision-confidence">{item.confidence}</div>

            <div className="decision-routing-label">Routing Decision</div>

            <div className="decision-routing">{item.routing}</div>

            <div className="decision-actions">
              <button
                onClick={() => handleDecisionAction(item.authority, "review")}
              >
                Review
              </button>

              <button
                onClick={() =>
                  handleDecisionAction(item.authority, "synchronize")
                }
              >
                Synchronize
              </button>

              <button
                onClick={() => handleDecisionAction(item.authority, "route")}
              >
                Route
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="decision-matrix-footer">
        <div>
          <p className="decision-footer-eyebrow">
            AI GOVERNANCE DECISIONING
          </p>

          <h3>Distributed governance decisions remain synchronized</h3>
        </div>

        <p>{latestAction}</p>
      </div>
    </section>
  );
}