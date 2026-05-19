import { useState } from "react";
import LedgerViewer from "../components/dashboard/LedgerViewer";

export default function TreasuryPage() {
  const STORAGE_KEY = "fd_treasury_action_state";

  const [treasuryActionState, setTreasuryActionState] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

      return (
        saved || {
          escalation: "REVIEW",
          routing: "STANDBY",
          recovery: "READY",
        }
      );
    } catch {
      return {
        escalation: "REVIEW",
        routing: "STANDBY",
        recovery: "READY",
      };
    }
  });

  const updateTreasuryAction = (key, status) => {
    setTreasuryActionState((prev) => {
      const next = {
        ...prev,
        [key]: status,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const escalatedCount = Object.values(treasuryActionState).filter(
    (status) => status === "ESCALATED"
  ).length;

  const underReviewCount = Object.values(treasuryActionState).filter(
    (status) => status === "UNDER REVIEW"
  ).length;

  const routedCount = Object.values(treasuryActionState).filter(
    (status) => status === "ROUTED"
  ).length;

  const treasurySignal =
    escalatedCount >= 2
      ? "HIGH TREASURY PRESSURE"
      : escalatedCount >= 1
      ? "ESCALATION ACTIVE"
      : underReviewCount >= 1
      ? "TREASURY MONITORING"
      : routedCount >= 1
      ? "ROUTING IN PROGRESS"
      : "TREASURY STABLE";

  const treasurySignalMessage =
    escalatedCount >= 2
      ? "Multiple treasury actions have been escalated. Institutional review is recommended."
      : escalatedCount >= 1
      ? "One treasury action is escalated and requires attention."
      : underReviewCount >= 1
      ? "Treasury action is currently under review."
      : routedCount >= 1
      ? "Treasury routing action is in progress."
      : "No active treasury pressure detected.";

  const treasuryGovernanceRecommendation =
    escalatedCount >= 2
      ? {
          level: "CRITICAL",
          title: "Institutional Review Required",
          message:
            "Multiple treasury actions are escalated. Review execution exposure, confirm recovery routing and pause further deployment until governance review is completed.",
          actions: [
            "Pause new treasury execution",
            "Review escalated cases",
            "Confirm liquidity reserve",
          ],
        }
      : escalatedCount >= 1
      ? {
          level: "ESCALATION",
          title: "Escalation Review Required",
          message:
            "One treasury action is escalated. Review the affected workflow before approving further routing.",
          actions: [
            "Open escalation review",
            "Verify source exposure",
            "Confirm next treasury action",
          ],
        }
      : underReviewCount >= 1
      ? {
          level: "MONITORING",
          title: "Treasury Review In Progress",
          message:
            "One or more treasury actions are under review. Continue monitoring workflow status before closing the action.",
          actions: [
            "Monitor review status",
            "Check pending queue",
            "Prepare approval note",
          ],
        }
      : routedCount >= 1
      ? {
          level: "ROUTING",
          title: "Routing Action In Progress",
          message:
            "Treasury routing has started. Confirm reserve movement and verify ledger traceability.",
          actions: [
            "Confirm routing path",
            "Check liquidity reserve",
            "Verify ledger entry",
          ],
        }
      : {
          level: "STABLE",
          title: "No Intervention Required",
          message:
            "Treasury workflow is stable. Continue standard monitoring and maintain recovery readiness.",
          actions: [
            "Continue monitoring",
            "Maintain reserve discipline",
            "Review weekly treasury queue",
          ],
        };

  const actionItems = [
    {
      key: "escalation",
      label: "Escalation Review",
      status: treasuryActionState.escalation,
      action: "Review high-value execution events before next deployment.",
    },
    {
      key: "routing",
      label: "Liquidity Routing",
      status: treasuryActionState.routing,
      action: "Prepare reserve movement if liquidity pressure increases.",
    },
    {
      key: "recovery",
      label: "Recovery Approval",
      status: treasuryActionState.recovery,
      action: "Approve resolved recovery events for treasury closure.",
    },
  ];

  return (
    <main className="dashboard-page treasury-console-page">
      <section className="dashboard-hero treasury-hero">
        <div>
          <p className="eyebrow">Treasury Operating System</p>
          <h1>Treasury Console</h1>
          <p className="muted">
            Institutional recovery queue, escalation monitoring, liquidity
            routing and treasury action control.
          </p>
        </div>

        <div className="hero-alert">
          <span>Workspace</span>
          <strong>TREASURY OS</strong>
        </div>
      </section>

      <section className="treasury-signal-ribbon">
        <div className="treasury-signal-card critical">
          <span>Active Escalation</span>
          <strong>Live</strong>
          <small>High-value treasury events require review</small>
        </div>

        <div className="treasury-signal-card warning">
          <span>Queue Pressure</span>
          <strong>Monitored</strong>
          <small>Open recovery items are being tracked</small>
        </div>

        <div className="treasury-signal-card info">
          <span>Liquidity Routing</span>
          <strong>Standby</strong>
          <small>Recovery path and deployment flow available</small>
        </div>

        <div className="treasury-signal-card success">
          <span>Compliance Layer</span>
          <strong>Enabled</strong>
          <small>Ledger and recovery events are traceable</small>
        </div>
      </section>

      <section
        className={`treasury-intelligence-banner ${
          escalatedCount >= 1
            ? "danger"
            : underReviewCount >= 1
            ? "warning"
            : "stable"
        }`}
      >
        <div>
          <p className="eyebrow">Treasury Intelligence Signal</p>
          <h2>{treasurySignal}</h2>
          <p>{treasurySignalMessage}</p>
        </div>

        <div className="treasury-intelligence-metrics">
          <span>Escalated: {escalatedCount}</span>
          <span>Under Review: {underReviewCount}</span>
          <span>Routed: {routedCount}</span>
        </div>
      </section>

      <section className="treasury-governance-recommendation">
        <div>
          <p className="eyebrow">Treasury Governance Recommendation</p>
          <h2>{treasuryGovernanceRecommendation.title}</h2>
          <p>{treasuryGovernanceRecommendation.message}</p>
        </div>

        <div className="treasury-recommendation-side">
          <span>{treasuryGovernanceRecommendation.level}</span>

          <div>
            {treasuryGovernanceRecommendation.actions.map((action) => (
              <small key={action}>{action}</small>
            ))}
          </div>
        </div>
      </section>

      <section className="treasury-executive-ribbon">
        <div className="treasury-exec-card danger">
          <span>Open Incidents</span>
          <strong>{escalatedCount}</strong>
          <small>Escalated treasury events</small>
        </div>

        <div className="treasury-exec-card warning">
          <span>Liquidity Stress</span>
          <strong>{escalatedCount >= 1 ? "Moderate" : "Low"}</strong>
          <small>Reserve ratio under monitoring</small>
        </div>

        <div className="treasury-exec-card info">
          <span>Recovery Flow</span>
          <strong>{routedCount >= 1 ? "Routing" : "Stable"}</strong>
          <small>Recovery queue processing active</small>
        </div>

        <div className="treasury-exec-card success">
          <span>System Health</span>
          <strong>Operational</strong>
          <small>All orchestration services online</small>
        </div>

        <div className="treasury-exec-card neutral">
          <span>Exposure Risk</span>
          <strong>{escalatedCount >= 1 ? "Elevated" : "Normal"}</strong>
          <small>FD concentration above target</small>
        </div>
      </section>

      <section className="treasury-command-grid">
        <div className="treasury-command-panel">
          <p className="eyebrow">Command Center</p>
          <h2>Treasury Operating Desk</h2>
          <p className="muted">
            This workspace separates treasury operations from the Home dashboard,
            allowing recovery, escalation and ledger monitoring to operate as an
            independent banking console.
          </p>

          <div className="treasury-command-points">
            <span>Queue orchestration</span>
            <span>Recovery status routing</span>
            <span>Escalation visibility</span>
            <span>Immutable ledger review</span>
          </div>
        </div>

        <div className="treasury-health-panel">
          <p className="eyebrow">System Status</p>
          <h3>Institutional Mode</h3>
          <strong>ACTIVE</strong>
          <p className="muted">
            Treasury Console is now operating as a separate control layer.
          </p>
        </div>
      </section>

      <section className="treasury-action-center">
        <div className="treasury-action-header">
          <div>
            <p className="eyebrow">Treasury Action Infrastructure</p>
            <h2>Action Recommendation Center</h2>
            <p className="muted">
              Suggested control actions for escalation, routing, approval and
              treasury governance.
            </p>
          </div>

          <span className="treasury-action-mode">RECOMMENDATION MODE</span>
        </div>

        <div className="treasury-action-grid">
          {actionItems.map((item) => (
            <div key={item.label} className="treasury-action-card">
              <span>{item.label}</span>
              <strong>{item.status}</strong>
              <p>{item.action}</p>

              <div className="treasury-action-buttons">
                <button
                  type="button"
                  onClick={() =>
                    updateTreasuryAction(item.key, "UNDER REVIEW")
                  }
                >
                  Review
                </button>

                <button
                  type="button"
                  onClick={() => updateTreasuryAction(item.key, "ROUTED")}
                >
                  Route
                </button>

                <button
                  type="button"
                  onClick={() => updateTreasuryAction(item.key, "ESCALATED")}
                >
                  Escalate
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LedgerViewer />
    </main>
  );
}