import { useState } from "react";
import "../../styles/treasury/operator-action-center.css";

export default function TreasuryOperatorActionCenter({ onOperatorAction }) {
  const [lastAction, setLastAction] = useState(
    "No operator action recorded yet."
  );

  const actions = [
    {
      label: "Review Treasury State",
      type: "OPERATOR_REVIEW",
      severity: "INFO",
      result:
        "Treasury state reviewed. Operator has acknowledged current liquidity condition.",
    },
    {
      label: "Approve Recommendation",
      type: "OPERATOR_APPROVAL",
      severity: "SUCCESS",
      result:
        "Recommended treasury action approved. Execution preparation may continue.",
    },
    {
      label: "Delay Action",
      type: "OPERATOR_DELAY",
      severity: "WARNING",
      result:
        "Operator delay recorded. Treasury condition will remain under observation.",
    },
    {
      label: "Escalate to Governance",
      type: "OPERATOR_GOVERNANCE_ESCALATION",
      severity: "CRITICAL",
      result:
        "Governance escalation prepared. Senior treasury review may be required.",
    },
  ];

  const handleOperatorAction = (action) => {
    setLastAction(action.result);

    if (typeof onOperatorAction === "function") {
      onOperatorAction({
        actionType: action.type,
        label: action.label,
        result: action.result,
        severity: action.severity,
      });
    }
  };

  return (
    <section className="treasury-operator-action-card">
      <div className="treasury-operator-header">
        <div>
          <p className="treasury-eyebrow">Operator Action Center</p>
          <h2 className="treasury-section-title">
            Treasury Operator Decision Panel
          </h2>
        </div>

        <span className="operator-status-badge">ACTIVE</span>
      </div>

      <div className="operator-guidance-box">
        <p className="operator-label">Current Treasury State</p>
        <h3>Stable Treasury Monitoring Mode</h3>
        <p>
          Treasury condition is currently stable. Operator should review the
          latest guidance, confirm awareness, and decide whether action is
          required.
        </p>
      </div>

      <div className="operator-action-grid">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className="operator-action-button"
            onClick={() => handleOperatorAction(action)}
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="operator-result-panel">
        <p className="operator-label">Last Operator Result</p>
        <p>{lastAction}</p>
      </div>
    </section>
  );
}