import "../../styles/dashboard/execution-panel.css";
import { useState } from "react";

export default function ExecutionPanel({
  currency = "MYR",
  upcomingMaturityAmount = 0,
  idleCash = 0,
  onUndoExecution,
  onExecute,
}) {
  const [activeAction, setActiveAction] = useState("EXECUTE");

  const formatMoney = (value) =>
    `${currency} ${Number(value || 0).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;

  return (
    <section className="dashboard-section execution-panel treasury-workstation-card">
      <div className="section-header workstation-header">
        <div>
          <p className="eyebrow">EXECUTION CONTROL</p>
          <h2>Execution Snapshot</h2>
          <p className="muted">Readiness, deployment and undo control.</p>
        </div>
      </div>

      <div className="execution-table">
        <div>
          <span>30D Maturity</span>
          <strong>{formatMoney(upcomingMaturityAmount)}</strong>
        </div>

        <div>
          <span>Idle Cash</span>
          <strong>{formatMoney(idleCash)}</strong>
        </div>
      </div>

      <div className="execution-action-grid">
        <button
          className={
            activeAction === "EXECUTE" ? "primary-button" : "secondary-button"
          }
          type="button"
          onClick={() => {
            setActiveAction("EXECUTE");
            onExecute?.();
          }}
        >
          Execute
        </button>

        <button
          className={
            activeAction === "UNDO" ? "primary-button" : "secondary-button"
          }
          type="button"
          onClick={() => {
            setActiveAction("UNDO");
            onUndoExecution?.();
          }}
        >
          Undo
        </button>
      </div>
    </section>
  );
}