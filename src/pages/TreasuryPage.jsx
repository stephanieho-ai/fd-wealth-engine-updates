import { useState } from "react";
import LedgerViewer from "../components/dashboard/LedgerViewer";

export default function TreasuryPage() {
  const STORAGE_KEY = "fd_treasury_workflow_state";
  const TIMELINE_KEY = "fd_treasury_incident_timeline";

  const defaultTreasuryWorkflowState = {
    escalation: { status: "UNDER REVIEW", queueState: "REVIEW" },
    routing: { status: "STANDBY", queueState: "OPEN" },
    recovery: { status: "READY", queueState: "READY" },
  };

  const workflowLabels = {
    escalation: "Escalation Review",
    routing: "Liquidity Routing",
    recovery: "Recovery Approval",
  };

  const getRoutingDecision = (queueState) => {
    if (queueState === "OPEN") {
      return {
        desk: "Review Desk",
        nextAction: "Move case into governance review.",
        priority: "MEDIUM",
      };
    }

    if (queueState === "REVIEW") {
      return {
        desk: "Approval Desk",
        nextAction: "Confirm approval readiness before routing.",
        priority: "HIGH",
      };
    }

    if (queueState === "READY") {
      return {
        desk: "Recovery Execution Desk",
        nextAction: "Execute recovery action or close resolved case.",
        priority: "ACTIVE",
      };
    }

    return {
      desk: "Archive / Closure Desk",
      nextAction: "Archive incident and preserve timeline record.",
      priority: "CLOSED",
    };
  };

  const getTimestamp = () =>
    new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  const normalizeWorkflowState = (saved) => {
    if (!saved || typeof saved !== "object") return defaultTreasuryWorkflowState;

    return {
      escalation:
        typeof saved.escalation === "string"
          ? {
              status: saved.escalation,
              queueState: saved.escalation === "ESCALATED" ? "OPEN" : "REVIEW",
            }
          : saved.escalation || defaultTreasuryWorkflowState.escalation,

      routing:
        typeof saved.routing === "string"
          ? {
              status: saved.routing,
              queueState: saved.routing === "ROUTED" ? "READY" : "OPEN",
            }
          : saved.routing || defaultTreasuryWorkflowState.routing,

      recovery:
        typeof saved.recovery === "string"
          ? {
              status: saved.recovery,
              queueState: saved.recovery === "RESOLVED" ? "RESOLVED" : "READY",
            }
          : saved.recovery || defaultTreasuryWorkflowState.recovery,
    };
  };

  const [treasuryWorkflowState, setTreasuryWorkflowState] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return normalizeWorkflowState(saved);
    } catch {
      return defaultTreasuryWorkflowState;
    }
  });

  const [incidentTimeline, setIncidentTimeline] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(TIMELINE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const saveWorkflowState = (next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const saveTimeline = (next) => {
    localStorage.setItem(TIMELINE_KEY, JSON.stringify(next));
  };

  const addTimelineEvent = ({
    workflowKey,
    actionType,
    fromState,
    toState,
    status,
    severity = "INFO",
  }) => {
    const routingDecision = getRoutingDecision(toState);

    const event = {
      id: `TL-${Date.now()}`,
      timestamp: getTimestamp(),
      workflow: workflowLabels[workflowKey] || workflowKey,
      actionType,
      fromState,
      toState,
      status,
      severity,
      routedTo: routingDecision.desk,
      nextAction: routingDecision.nextAction,
      priority: routingDecision.priority,
    };

    setIncidentTimeline((prev) => {
      const next = [event, ...prev].slice(0, 30);
      saveTimeline(next);
      return next;
    });
  };

  const updateTreasuryStatus = (key, status) => {
    setTreasuryWorkflowState((prev) => {
      const previousStatus = prev[key]?.status;

      const next = {
        ...prev,
        [key]: { ...prev[key], status },
      };

      saveWorkflowState(next);

      addTimelineEvent({
        workflowKey: key,
        actionType: "STATUS_UPDATE",
        fromState: previousStatus,
        toState: status,
        status,
        severity: status === "ESCALATED" ? "CRITICAL" : "INFO",
      });

      return next;
    });
  };

  const updateQueueState = (key, queueState) => {
    setTreasuryWorkflowState((prev) => {
      const previousQueueState = prev[key]?.queueState;

      const next = {
        ...prev,
        [key]: { ...prev[key], queueState },
      };

      saveWorkflowState(next);

      addTimelineEvent({
        workflowKey: key,
        actionType: "QUEUE_STATE_UPDATE",
        fromState: previousQueueState,
        toState: queueState,
        status: next[key]?.status,
        severity:
          queueState === "OPEN"
            ? "WARNING"
            : queueState === "RESOLVED"
            ? "SUCCESS"
            : "INFO",
      });

      return next;
    });
  };

  const advanceQueueState = (key) => {
    const currentState = treasuryWorkflowState[key]?.queueState;

    const nextQueueState =
      currentState === "OPEN"
        ? "REVIEW"
        : currentState === "REVIEW"
        ? "READY"
        : currentState === "READY"
        ? "RESOLVED"
        : "RESOLVED";

    updateQueueState(key, nextQueueState);
  };

  const resetQueueState = (key) => {
    updateQueueState(key, "OPEN");
  };

  const clearTimeline = () => {
    const confirmed = window.confirm(
      "Clear Treasury Incident Timeline? This will remove all timeline history from localStorage."
    );

    if (!confirmed) return;

    setIncidentTimeline([]);
    localStorage.removeItem(TIMELINE_KEY);
  };

  const actionItems = [
    {
      key: "escalation",
      label: "Escalation Review",
      status: treasuryWorkflowState.escalation.status,
      queueState: treasuryWorkflowState.escalation.queueState,
      action: "Review high-value execution events before next deployment.",
      route: "Governance Review Desk",
    },
    {
      key: "routing",
      label: "Liquidity Routing",
      status: treasuryWorkflowState.routing.status,
      queueState: treasuryWorkflowState.routing.queueState,
      action: "Prepare reserve movement if liquidity pressure increases.",
      route: "Liquidity Recovery Desk",
    },
    {
      key: "recovery",
      label: "Recovery Approval",
      status: treasuryWorkflowState.recovery.status,
      queueState: treasuryWorkflowState.recovery.queueState,
      action: "Approve resolved recovery events for treasury closure.",
      route: "Recovery Approval Desk",
    },
  ];

  const enrichedActionItems = actionItems.map((item) => ({
    ...item,
    routingDecision: getRoutingDecision(item.queueState),
  }));

  const allStatuses = enrichedActionItems.map((item) => item.status);
  const allQueueStates = enrichedActionItems.map((item) => item.queueState);

  const escalatedCount = allStatuses.filter((s) => s === "ESCALATED").length;
  const routedCount = allStatuses.filter((s) => s === "ROUTED").length;

  const openQueueCount = allQueueStates.filter((s) => s === "OPEN").length;
  const reviewQueueCount = allQueueStates.filter((s) => s === "REVIEW").length;
  const readyQueueCount = allQueueStates.filter((s) => s === "READY").length;
  const resolvedQueueCount = allQueueStates.filter(
    (s) => s === "RESOLVED"
  ).length;

  const totalTimelineEvents = incidentTimeline.length;
  const criticalTimelineEvents = incidentTimeline.filter(
    (event) => event.severity === "CRITICAL"
  ).length;
  const warningTimelineEvents = incidentTimeline.filter(
    (event) => event.severity === "WARNING"
  ).length;
  const successTimelineEvents = incidentTimeline.filter(
    (event) => event.severity === "SUCCESS"
  ).length;
  const latestTimelineEvent = incidentTimeline[0];

  const primaryRoutingTarget =
    enrichedActionItems.find((item) => item.queueState === "READY") ||
    enrichedActionItems.find((item) => item.queueState === "REVIEW") ||
    enrichedActionItems.find((item) => item.queueState === "OPEN") ||
    enrichedActionItems[0];

  const treasurySignal =
    openQueueCount >= 2
      ? "RECOVERY QUEUE PRESSURE"
      : escalatedCount >= 2
      ? "HIGH TREASURY PRESSURE"
      : reviewQueueCount >= 2
      ? "GOVERNANCE REVIEW ACTIVE"
      : readyQueueCount >= 2
      ? "RECOVERY READY"
      : resolvedQueueCount === enrichedActionItems.length
      ? "TREASURY FLOW RESOLVED"
      : escalatedCount >= 1
      ? "ESCALATION ACTIVE"
      : routedCount >= 1
      ? "ROUTING IN PROGRESS"
      : "TREASURY STABLE";

  const treasurySignalMessage =
    openQueueCount >= 2
      ? "Multiple recovery items are still open. Treasury queue requires active orchestration."
      : escalatedCount >= 2
      ? "Multiple treasury actions have been escalated. Institutional review is recommended."
      : reviewQueueCount >= 2
      ? "Several treasury items are under governance review. Approval bottleneck may form."
      : readyQueueCount >= 2
      ? "Recovery items are ready for routing or approval."
      : resolvedQueueCount === enrichedActionItems.length
      ? "All treasury recovery items have been resolved."
      : escalatedCount >= 1
      ? "One treasury action is escalated and requires attention."
      : routedCount >= 1
      ? "Treasury routing action is in progress."
      : "No active treasury pressure detected.";

  const treasuryGovernanceRecommendation =
    openQueueCount >= 2
      ? {
          level: "QUEUE PRESSURE",
          title: "Recovery Queue Requires Orchestration",
          message:
            "Multiple treasury items remain open. Move urgent cases into review and prepare recovery routing before approving new deployment.",
          actions: [
            "Prioritize open queue",
            "Move urgent cases to review",
            "Pause new deployment if needed",
          ],
        }
      : escalatedCount >= 2
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
      : reviewQueueCount >= 2
      ? {
          level: "REVIEW",
          title: "Governance Review Bottleneck",
          message:
            "Several items are in review. Confirm approval readiness and prepare routing decision.",
          actions: [
            "Clear review queue",
            "Confirm approval note",
            "Route ready cases",
          ],
        }
      : readyQueueCount >= 2
      ? {
          level: "READY",
          title: "Recovery Actions Ready",
          message:
            "Recovery queue is ready for routing, approval or resolution. Proceed with controlled treasury closure.",
          actions: [
            "Confirm routing path",
            "Approve recovery action",
            "Resolve completed items",
          ],
        }
      : resolvedQueueCount === enrichedActionItems.length
      ? {
          level: "RESOLVED",
          title: "Recovery Flow Completed",
          message:
            "All treasury workflow items have been resolved. Maintain monitoring and preserve ledger traceability.",
          actions: [
            "Continue monitoring",
            "Archive recovery notes",
            "Review weekly treasury queue",
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
          <span>Open Queue</span>
          <strong>{openQueueCount}</strong>
          <small>Items waiting for recovery review</small>
        </div>

        <div className="treasury-signal-card warning">
          <span>Under Review</span>
          <strong>{reviewQueueCount}</strong>
          <small>Governance review in progress</small>
        </div>

        <div className="treasury-signal-card info">
          <span>Ready Queue</span>
          <strong>{readyQueueCount}</strong>
          <small>Actions ready for routing</small>
        </div>

        <div className="treasury-signal-card success">
          <span>Resolved</span>
          <strong>{resolvedQueueCount}</strong>
          <small>Closed treasury recovery items</small>
        </div>
      </section>

      <section
        className={`treasury-intelligence-banner ${
          openQueueCount >= 2 || escalatedCount >= 1
            ? "danger"
            : reviewQueueCount >= 1
            ? "warning"
            : "stable"
        }`}
      >
        <div>
          <p className="eyebrow">Treasury Recovery Intelligence</p>
          <h2>{treasurySignal}</h2>
          <p>{treasurySignalMessage}</p>
        </div>

        <div className="treasury-intelligence-metrics">
          <span>Open: {openQueueCount}</span>
          <span>Review: {reviewQueueCount}</span>
          <span>Ready: {readyQueueCount}</span>
          <span>Resolved: {resolvedQueueCount}</span>
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
          <strong>{openQueueCount}</strong>
          <small>Unresolved treasury queue items</small>
        </div>

        <div className="treasury-exec-card warning">
          <span>Timeline Events</span>
          <strong>{totalTimelineEvents}</strong>
          <small>Recorded operational actions</small>
        </div>

        <div className="treasury-exec-card info">
          <span>Recommended Routing</span>
          <strong>{primaryRoutingTarget.routingDecision.desk}</strong>
          <small>{primaryRoutingTarget.label}</small>
        </div>

        <div className="treasury-exec-card success">
          <span>Resolved Events</span>
          <strong>{successTimelineEvents}</strong>
          <small>Successful closure actions</small>
        </div>

        <div className="treasury-exec-card neutral">
          <span>Critical Events</span>
          <strong>{criticalTimelineEvents}</strong>
          <small>Escalated incident records</small>
        </div>
      </section>

      <section className="treasury-command-grid">
        <div className="treasury-command-panel">
          <p className="eyebrow">Command Center</p>
          <h2>Treasury Recovery Orchestration Desk</h2>
          <p className="muted">
            This workspace now controls the treasury recovery lifecycle from
            open queue to review, readiness and resolution.
          </p>

          <div className="treasury-command-points">
            <span>OPEN → Review Desk</span>
            <span>REVIEW → Approval Desk</span>
            <span>READY → Recovery Execution</span>
            <span>RESOLVED → Archive Desk</span>
          </div>
        </div>

        <div className="treasury-health-panel">
          <p className="eyebrow">Recovery Routing Engine</p>
          <h3>Action Routing</h3>
          <strong>ACTIVE</strong>
          <p className="muted">
            Queue states now generate recommended routing desks and next actions.
          </p>
        </div>
      </section>

      <section className="treasury-action-center">
        <div className="treasury-action-header">
          <div>
            <p className="eyebrow">Treasury Routing Intelligence</p>
            <h2>Recovery Action Routing Engine</h2>
            <p className="muted">
              Each queue state is mapped to a recovery desk, priority and next
              operational action.
            </p>
          </div>

          <span className="treasury-action-mode">ROUTING MODE</span>
        </div>

        <div className="treasury-action-grid">
          {enrichedActionItems.map((item) => (
            <div key={item.key} className="treasury-action-card">
              <span>{item.label}</span>
              <strong>{item.routingDecision.desk}</strong>
              <p>{item.routingDecision.nextAction}</p>

              <div className="treasury-route-note">
                <small>Current Queue</small>
                <b>{item.queueState}</b>
              </div>

              <div className="treasury-route-note">
                <small>Priority</small>
                <b>{item.routingDecision.priority}</b>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="treasury-action-center">
        <div className="treasury-action-header">
          <div>
            <p className="eyebrow">Treasury Recovery Infrastructure</p>
            <h2>Recovery Queue Lifecycle</h2>
            <p className="muted">
              Move each treasury item through OPEN, REVIEW, READY and RESOLVED.
            </p>
          </div>

          <span className="treasury-action-mode">ORCHESTRATION MODE</span>
        </div>

        <div className="treasury-action-grid">
          {enrichedActionItems.map((item) => (
            <div key={item.key} className="treasury-action-card">
              <span>{item.label}</span>
              <strong>{item.queueState}</strong>
              <p>{item.action}</p>

              <div className="treasury-route-note">
                <small>Route</small>
                <b>{item.route}</b>
              </div>

              <div className="treasury-action-buttons">
                <button
                  type="button"
                  onClick={() => updateTreasuryStatus(item.key, "UNDER REVIEW")}
                >
                  Review
                </button>

                <button
                  type="button"
                  onClick={() => updateTreasuryStatus(item.key, "ROUTED")}
                >
                  Route
                </button>

                <button
                  type="button"
                  onClick={() => updateTreasuryStatus(item.key, "ESCALATED")}
                >
                  Escalate
                </button>
              </div>

              <div className="treasury-action-buttons">
                <button
                  type="button"
                  onClick={() => updateQueueState(item.key, "OPEN")}
                >
                  Open
                </button>

                <button
                  type="button"
                  onClick={() => updateQueueState(item.key, "REVIEW")}
                >
                  Review Queue
                </button>

                <button
                  type="button"
                  onClick={() => updateQueueState(item.key, "READY")}
                >
                  Ready
                </button>

                <button
                  type="button"
                  onClick={() => updateQueueState(item.key, "RESOLVED")}
                >
                  Resolve
                </button>
              </div>

              <div className="treasury-action-buttons">
                <button type="button" onClick={() => advanceQueueState(item.key)}>
                  Advance Lifecycle
                </button>

                <button type="button" onClick={() => resetQueueState(item.key)}>
                  Reset Queue
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="treasury-action-center">
        <div className="treasury-action-header">
          <div>
            <p className="eyebrow">Treasury Incident Timeline</p>
            <h2>Latest Operational Events</h2>
            <p className="muted">
              Every status change, queue movement and routing decision is
              recorded for treasury traceability.
            </p>
          </div>

          <button
            type="button"
            className="treasury-action-mode"
            onClick={clearTimeline}
          >
            CLEAR TIMELINE
          </button>
        </div>

        <section className="treasury-signal-ribbon">
          <div className="treasury-signal-card info">
            <span>Total Events</span>
            <strong>{totalTimelineEvents}</strong>
            <small>All recorded treasury actions</small>
          </div>

          <div className="treasury-signal-card critical">
            <span>Critical</span>
            <strong>{criticalTimelineEvents}</strong>
            <small>Escalation related events</small>
          </div>

          <div className="treasury-signal-card warning">
            <span>Warning</span>
            <strong>{warningTimelineEvents}</strong>
            <small>Open or reopened queue items</small>
          </div>

          <div className="treasury-signal-card success">
            <span>Success</span>
            <strong>{successTimelineEvents}</strong>
            <small>Resolved timeline events</small>
          </div>
        </section>

        {latestTimelineEvent && (
          <section className="treasury-governance-recommendation">
            <div>
              <p className="eyebrow">Latest Treasury Event</p>
              <h2>
                {latestTimelineEvent.workflow} → {latestTimelineEvent.toState}
              </h2>
              <p>
                {latestTimelineEvent.actionType}:{" "}
                {latestTimelineEvent.fromState || "-"} →{" "}
                {latestTimelineEvent.toState}
              </p>
            </div>

            <div className="treasury-recommendation-side">
              <span>{latestTimelineEvent.severity}</span>
              <div>
                <small>{latestTimelineEvent.timestamp}</small>
                <small>Routed to: {latestTimelineEvent.routedTo}</small>
                <small>{latestTimelineEvent.nextAction}</small>
              </div>
            </div>
          </section>
        )}

        <div className="treasury-action-grid">
          {incidentTimeline.length === 0 ? (
            <div className="treasury-action-card">
              <span>No Timeline Events</span>
              <strong>WAITING</strong>
              <p>
                Click Review, Route, Escalate, Advance Lifecycle or Reset Queue
                to create the first treasury incident timeline event.
              </p>
            </div>
          ) : (
            incidentTimeline.map((event, index) => (
              <div
                key={event.id}
                className={`treasury-action-card ${
                  index === 0 ? "latest-timeline-event" : ""
                }`}
              >
                <span>
                  {index === 0 ? "Latest Event · " : ""}
                  {event.workflow}
                </span>

                <strong>{event.toState}</strong>

                <p>
                  {event.actionType}: {event.fromState || "-"} →{" "}
                  {event.toState}
                </p>

                <div className="treasury-route-note">
                  <small>{event.timestamp}</small>
                  <b>{event.severity}</b>
                </div>

                <div className="treasury-route-note">
                  <small>Routed To</small>
                  <b>{event.routedTo || "Pending Desk"}</b>
                </div>

                <div className="treasury-route-note">
                  <small>Next Action</small>
                  <b>{event.nextAction || "Awaiting routing decision"}</b>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <LedgerViewer />
    </main>
  );
}