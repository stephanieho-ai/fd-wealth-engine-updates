import { useState } from "react";
import LedgerViewer from "../components/dashboard/LedgerViewer";
import { getTreasuryDecisionBrain } from "../utils/treasuryDecisionBrain";
import TreasuryOperatorGuidanceEngine from "../components/treasury/TreasuryOperatorGuidanceEngine";
import TreasuryOperatorActionCenter from "../components/treasury/TreasuryOperatorActionCenter";
import TreasuryGovernanceExecutionReadiness from "../components/treasury/TreasuryGovernanceExecutionReadiness";
import TreasuryIntelligenceSummary from "../components/treasury/TreasuryIntelligenceSummary";


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
  operator: "Operator Action Center",
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

  const [operatorRecommendationResult, setOperatorRecommendationResult] =
    useState({
      status: "WAITING",
      title: "Awaiting Operator Action",
      message:
        "No operator decision has been executed yet. Select an action from the Operator Action Center to activate governance recommendation tracking.",
      nextStep:
        "Review the recommended treasury action, then approve, delay, review or escalate.",
      severity: "INFO",
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

  const recoveryScore =
    openQueueCount * 25 +
    reviewQueueCount * 18 +
    escalatedCount * 20 +
    criticalTimelineEvents * 8 -
    resolvedQueueCount * 10;

  const liquidityStressLevel =
    recoveryScore >= 90
      ? "CRITICAL"
      : recoveryScore >= 60
      ? "HIGH"
      : recoveryScore >= 35
      ? "ELEVATED"
      : "STABLE";

  const treasuryInterventionSeverity =
    recoveryScore >= 90
      ? "IMMEDIATE INTERVENTION"
      : recoveryScore >= 60
      ? "TREASURY INTERVENTION REQUIRED"
      : recoveryScore >= 35
      ? "ACTIVE MONITORING"
      : "NORMAL";

  const autoRecoveryRecommendation =
    recoveryScore >= 90
      ? {
          title: "Emergency Liquidity Recovery",
          message:
            "Treasury pressure is critical. Immediate reserve recovery and deployment restriction recommended.",
          action: "BLOCK NEW DEPLOYMENT",
        }
      : recoveryScore >= 60
      ? {
          title: "High Treasury Recovery Pressure",
          message:
            "Treasury queue pressure is elevated. Recovery routing and reserve balancing should begin immediately.",
          action: "INITIATE RECOVERY ROUTING",
        }
      : recoveryScore >= 35
      ? {
          title: "Moderate Recovery Monitoring",
          message:
            "Treasury workflow is under moderate stress. Continue monitoring and prioritize unresolved queue items.",
          action: "PRIORITIZE REVIEW QUEUE",
        }
      : {
          title: "Treasury Stable",
          message:
            "Treasury recovery environment is stable. No immediate intervention required.",
          action: "CONTINUE MONITORING",
        };

  const autoEscalationSignal =
    escalatedCount >= 2 || recoveryScore >= 80
      ? "AUTO ESCALATION ACTIVE"
      : openQueueCount >= 2
      ? "WATCHLIST"
      : "NORMAL";

   const escalationWaveIntensity =
  recoveryScore >= 120
    ? "SYSTEMIC SHOCK"
    : recoveryScore >= 90
    ? "CRITICAL SURGE"
    : recoveryScore >= 60
    ? "ESCALATING"
    : recoveryScore >= 35
    ? "EXPANDING"
    : "RIPPLE";

const threatVelocity =
  recoveryScore >= 120
    ? "CRITICAL VELOCITY"
    : recoveryScore >= 80
    ? "FAST SPREAD"
    : recoveryScore >= 45
    ? "ACCELERATING"
    : "SLOW DRIFT";

const escalationDirection =
  liquidityStressLevel === "CRITICAL"
    ? [
        "Liquidity Buffer",
        "FD Ladder",
        "Treasury Reserve",
        "Recovery Queue",
      ]
    : liquidityStressLevel === "HIGH"
    ? [
        "Recovery Queue",
        "Weak Month",
        "Deployment Policy",
      ]
    : liquidityStressLevel === "ELEVATED"
    ? [
        "Governance Review",
        "Liquidity Routing",
      ]
    : ["Monitoring Zone"];

const institutionalEscalationPath =
  recoveryScore >= 120
    ? "EMERGENCY INTERVENTION"
    : recoveryScore >= 90
    ? "EXECUTIVE ESCALATION"
    : recoveryScore >= 60
    ? "RISK COMMITTEE"
    : recoveryScore >= 35
    ? "TREASURY WATCH"
    : "DESK REVIEW"; 

  const autoInterventionTriggered =
    liquidityStressLevel === "HIGH" || liquidityStressLevel === "CRITICAL";

  const autoInterventionReason =
    liquidityStressLevel === "CRITICAL"
      ? "Critical recovery pressure detected. Treasury should block new deployment and prioritize liquidity recovery."
      : liquidityStressLevel === "HIGH"
      ? "High recovery pressure detected. Treasury intervention is required before further execution."
      : "No treasury intervention required.";

  const treasuryDecisionBrain = getTreasuryDecisionBrain({
    recoveryScore,
    liquidityStressLevel,
    openQueueCount,
    reviewQueueCount,
    readyQueueCount,
    resolvedQueueCount,
    escalatedCount,
    criticalTimelineEvents,
  });

  const liveTreasurySignalSeverity =
    liquidityStressLevel === "CRITICAL" || treasuryDecisionBrain.shouldLockdown
      ? "critical"
      : liquidityStressLevel === "HIGH" ||
        treasuryDecisionBrain.controlState === "RESTRICTED"
      ? "warning"
      : liquidityStressLevel === "ELEVATED" ||
        treasuryDecisionBrain.controlState === "WARNING"
      ? "watch"
      : "normal";

  const livePolicyStatus = treasuryDecisionBrain.shouldBlockDeployment
    ? "BLOCKED"
    : treasuryDecisionBrain.shouldProtectReserve
    ? "PROTECTED"
    : "COMPLIANT";

  const liveActionSignal = treasuryDecisionBrain.shouldLockdown
    ? "LOCKDOWN ACTIVE"
    : treasuryDecisionBrain.shouldBlockDeployment
    ? "PAUSE DEPLOYMENT"
    : treasuryDecisionBrain.shouldProtectReserve
    ? "PROTECT RESERVE"
    : "MONITOR";

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

  const treasuryGovernanceRecommendationEngine = {
    recommendedAction: treasuryDecisionBrain.shouldLockdown
      ? "LOCKDOWN TREASURY EXECUTION"
      : treasuryDecisionBrain.shouldBlockDeployment
      ? "PAUSE NEW DEPLOYMENT"
      : treasuryDecisionBrain.shouldProtectReserve
      ? "PROTECT RESERVE BEFORE DEPLOYMENT"
      : openQueueCount >= 2
      ? "PRIORITIZE RECOVERY QUEUE"
      : reviewQueueCount >= 2
      ? "CLEAR GOVERNANCE REVIEW QUEUE"
      : readyQueueCount >= 2
      ? "APPROVE READY RECOVERY ACTIONS"
      : "CONTINUE STANDARD MONITORING",

    governanceReason: treasuryDecisionBrain.shouldLockdown
      ? "Treasury Decision Brain is in lockdown mode. Execution should stop until governance review is completed."
      : treasuryDecisionBrain.shouldBlockDeployment
      ? "Deployment is restricted because treasury pressure or policy exposure has increased."
      : treasuryDecisionBrain.shouldProtectReserve
      ? "Reserve protection is active. Treasury should maintain liquidity discipline before new execution."
      : openQueueCount >= 2
      ? "Multiple unresolved recovery items are still open, which may create queue pressure."
      : reviewQueueCount >= 2
      ? "Several cases are under review. Governance approval bottleneck may form if they are not cleared."
      : readyQueueCount >= 2
      ? "Recovery actions are ready. Operator can proceed with controlled approval or resolution."
      : "Treasury workflow is stable. No emergency governance intervention is required.",

    executionReadiness: treasuryDecisionBrain.shouldLockdown
      ? "BLOCKED"
      : treasuryDecisionBrain.shouldBlockDeployment
      ? "RESTRICTED"
      : treasuryDecisionBrain.shouldProtectReserve
      ? "CONTROLLED"
      : readyQueueCount >= 1
      ? "READY"
      : reviewQueueCount >= 1
      ? "REVIEW REQUIRED"
      : "MONITORING",

    nextOperatorStep: treasuryDecisionBrain.shouldLockdown
      ? "Do not execute new deployment. Escalate to governance review and preserve the incident timeline."
      : treasuryDecisionBrain.shouldBlockDeployment
      ? "Pause new deployment and review the recovery queue before approving any treasury movement."
      : treasuryDecisionBrain.shouldProtectReserve
      ? "Confirm reserve protection, then continue only with controlled treasury execution."
      : openQueueCount >= 1
      ? "Move open queue items into review or route the most urgent case first."
      : readyQueueCount >= 1
      ? "Approve the ready recovery action or close the resolved treasury case."
      : "Continue monitoring and keep the treasury workflow ready for the next operator action.",

    confidenceNote:
      liquidityStressLevel === "CRITICAL"
        ? "Critical liquidity condition detected."
        : liquidityStressLevel === "HIGH"
        ? "High treasury pressure detected."
        : liquidityStressLevel === "ELEVATED"
        ? "Treasury monitoring is elevated."
        : "Treasury condition remains stable.",
  };

  const handleOperatorAction = (operatorAction) => {
    addTimelineEvent({
      workflowKey: "operator",
      actionType: operatorAction.actionType,
      fromState: "OPERATOR_PANEL",
      toState: operatorAction.label,
      status: operatorAction.result,
      severity: operatorAction.severity,
    });

    setOperatorRecommendationResult({
      status: operatorAction.severity || "INFO",
      title:
        operatorAction.actionType === "OPERATOR_APPROVAL"
          ? "Recommended Treasury Action Approved"
          : operatorAction.actionType === "OPERATOR_REVIEW"
          ? "Treasury Recommendation Sent For Review"
          : operatorAction.actionType === "OPERATOR_DELAY"
          ? "Treasury Recommendation Delayed"
          : operatorAction.actionType === "OPERATOR_GOVERNANCE_ESCALATION"
          ? "Treasury Recommendation Escalated"
          : "Operator Action Recorded",
      message:
        operatorAction.actionType === "OPERATOR_APPROVAL"
          ? "Recommended treasury action approved. Execution preparation may continue under current governance controls."
          : operatorAction.actionType === "OPERATOR_REVIEW"
          ? "Recommendation moved into governance review. Confirm approval readiness before execution."
          : operatorAction.actionType === "OPERATOR_DELAY"
          ? "Recommendation delayed. Keep the recovery queue open and continue treasury monitoring."
          : operatorAction.actionType === "OPERATOR_GOVERNANCE_ESCALATION"
          ? "Recommendation escalated. Institutional governance review is now required before execution."
          : operatorAction.result || "Operator action has been recorded.",
      nextStep: treasuryGovernanceRecommendationEngine.nextOperatorStep,
      severity: operatorAction.severity || "INFO",
    });

    switch (operatorAction.actionType) {
      case "OPERATOR_REVIEW":
        updateQueueState("routing", "REVIEW");
        break;

      case "OPERATOR_APPROVAL":
        updateQueueState("routing", "READY");
        break;

      case "OPERATOR_DELAY":
        updateQueueState("routing", "OPEN");
        break;

      case "OPERATOR_GOVERNANCE_ESCALATION":
        updateTreasuryStatus("escalation", "ESCALATED");
        break;

      default:
        break;
    }
  };

  return (
    <main className="dashboard-page treasury-console-page treasury-control-tower-page">

      <style>{`
        .treasury-governance-engine-card,
        .treasury-operator-result-card {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(360px, 0.75fr);
          gap: 28px;
          align-items: stretch;
          padding: 34px;
          margin: 28px 0;
          border-radius: 30px;
          border: 1px solid rgba(59, 130, 246, 0.18);
          background:
            radial-gradient(circle at top left, rgba(59, 130, 246, 0.08), transparent 34%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(239, 246, 255, 0.9));
          box-shadow: 0 24px 70px rgba(15, 23, 42, 0.10);
        }

        .treasury-governance-engine-main,
        .treasury-operator-result-main {
          min-width: 0;
        }

        .treasury-governance-engine-main h2,
        .treasury-operator-result-card h2 {
          margin: 8px 0 14px;
          font-size: 28px;
          line-height: 1.1;
        }

        .treasury-governance-engine-main p,
        .treasury-operator-result-card p {
          margin: 0;
          max-width: 820px;
          color: rgba(15, 23, 42, 0.78);
          line-height: 1.55;
        }

        .treasury-engine-action-pill {
          display: inline-flex;
          margin: 4px 0 14px;
          padding: 9px 14px;
          border-radius: 999px;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.22);
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .treasury-governance-engine-panel,
        .treasury-operator-result-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .treasury-engine-status,
        .treasury-operator-result-panel > span {
          align-self: flex-end;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(37, 99, 235, 0.09);
          border: 1px solid rgba(37, 99, 235, 0.22);
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .treasury-engine-info-grid {
          display: grid;
          gap: 12px;
        }

        .treasury-engine-info-grid div,
        .treasury-operator-result-panel div {
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.68);
          border: 1px solid rgba(148, 163, 184, 0.22);
        }

        .treasury-engine-info-grid small,
        .treasury-operator-result-panel small {
          display: block;
          margin-bottom: 6px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(37, 99, 235, 0.75);
        }

        .treasury-engine-info-grid strong,
        .treasury-operator-result-panel strong {
          font-size: 13px;
          line-height: 1.45;
          color: #0f172a;
        }


        .treasury-control-section {
          margin: 32px 0 42px;
          padding: 26px;
          border-radius: 34px;
          border: 1px solid rgba(148, 163, 184, 0.22);
          background:
            radial-gradient(circle at top left, rgba(59, 130, 246, 0.08), transparent 30%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(248, 250, 252, 0.92));
          box-shadow: 0 22px 60px rgba(15, 23, 42, 0.07);
        }

        .treasury-control-section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 22px;
          margin-bottom: 22px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.18);
        }

        .treasury-control-section-header > div {
          max-width: 780px;
        }

        .treasury-control-section-header h2 {
          margin: 6px 0 8px;
          font-size: 24px;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #0f172a;
        }

        .treasury-control-section-header p:not(.eyebrow) {
          margin: 0;
          color: rgba(51, 65, 85, 0.72);
          line-height: 1.55;
          font-size: 14px;
        }

        .treasury-section-badge {
          flex: 0 0 auto;
          padding: 9px 14px;
          border-radius: 999px;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.18);
          color: #1d4ed8;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .treasury-control-section > section,
        .treasury-control-section > .treasury-governance-engine-card,
        .treasury-control-section > .treasury-operator-result-card {
          margin-top: 18px;
          margin-bottom: 18px;
        }

        @media (max-width: 900px) {
          .treasury-governance-engine-card,
          .treasury-operator-result-card {
            grid-template-columns: 1fr;
          }

          .treasury-engine-status,
          .treasury-operator-result-panel > span {
            align-self: flex-start;
          }
        }
      `}</style>

      <section className="dashboard-hero treasury-hero">
        <div>
          <p className="eyebrow">Treasury Operating System</p>
          <h1>Treasury Control Tower</h1>
          <p className="muted">
            Institutional command center for liquidity, governance, recovery,
            execution readiness and treasury incident traceability.
          </p>
        </div>

        <div className="hero-alert">
          <span>Workspace</span>
          <strong>TREASURY OS</strong>
        </div>
      </section>

      <TreasuryIntelligenceSummary
        liquidityStressLevel={liquidityStressLevel}
        treasurySignal={treasurySignal}
        livePolicyStatus={livePolicyStatus}
        liveActionSignal={liveActionSignal}
      />

      <section className="treasury-control-section">
        <div className="treasury-control-section-header">
          <div>
            <p className="eyebrow">Section A</p>
            <h2>Control Tower Overview</h2>
            <p>Live treasury operating condition, monitoring wall and executive action command.</p>
          </div>

          <span className="treasury-section-badge">CONTROL TOWER</span>
        </div>
      <section className="treasury-command-center risk-cluster-panel risk-watch treasury-density-radar">
        <div className="treasury-command-header">
          <div>
            <p className="treasury-command-label">
                🏛️ LIVE TREASURY OPERATIONS
                </p>

            <h2>Treasury Command Center</h2>

            <p className="treasury-command-description">
              Institutional live monitoring wall for liquidity, policy
              governance, escalation intelligence, and treasury operational
              visibility.
            </p>
          </div>

          <div className={`treasury-live-status ${liveTreasurySignalSeverity}`}>
            <span className="live-dot"></span>

            <div>
              <strong>{treasurySignal}</strong>
              <p>Live Treasury Signal</p>
            </div>
          </div>
        </div>

        <div className="treasury-command-grid">
          <div className="treasury-command-card">
            <span>Active Alerts</span>
            <strong>{warningTimelineEvents + criticalTimelineEvents}</strong>
            <p>Institutional alert center activity</p>
          </div>

          <div className="treasury-command-card">
            <span>Recovery Queue</span>
            <strong>{openQueueCount + reviewQueueCount + readyQueueCount}</strong>
            <p>Recovery orchestration workload</p>
          </div>

          <div className="treasury-command-card">
            <span>Liquidity Status</span>
            <strong>{liquidityStressLevel}</strong>
            <p>Real-time deployable liquidity condition</p>
          </div>

          <div className="treasury-command-card">
            <span>Policy Status</span>
            <strong>{livePolicyStatus}</strong>
            <p>Governance monitoring system</p>
          </div>

          <div className="treasury-command-card">
            <span>Reserve Protection</span>
            <strong>
              {treasuryDecisionBrain.shouldProtectReserve ? "ACTIVE" : "NORMAL"}
            </strong>
            <p>Capital reserve protection status</p>
          </div>

          <div className="treasury-command-card">
            <span>Action Signal</span>
            <strong>{liveActionSignal}</strong>
            <p>Live treasury operating instruction</p>
          </div>
        </div>
      </section>

        <section className="treasury-monitoring-wall risk-cluster-panel risk-escalation risk-escalation-wave">

            <div className="treasury-monitoring-header">

                <div>
                <p className="treasury-command-label">
                  🌐 GLOBAL TREASURY MONITORING
                </p>

                <h2>Institutional Treasury Monitoring Wall</h2>

                <p className="treasury-command-description">
                    Global treasury monitoring overview for liquidity,
                    governance exposure, deployment permission,
                    reserve protection and operational pressure.
                </p>
                </div>

                <div className="treasury-monitoring-mode">
                    🗼 LIVE CONTROL TOWER
                </div>

            </div>

            <div className="treasury-monitoring-grid">

                <div className="treasury-monitor-card">
                <span>Global Treasury State</span>

                <strong>{treasurySignal}</strong>

                <p>
                    Institutional treasury operating condition.
                </p>
                </div>

                <div className="treasury-monitor-card">
                <span>Liquidity Severity</span>

                <strong>{liquidityStressLevel}</strong>

                <p>
                    Real-time liquidity governance pressure.
                </p>
                </div>

                <div className="treasury-monitor-card">
                <span>Deployment Permission</span>

                <strong>
                    {treasuryDecisionBrain.shouldBlockDeployment
                    ? "RESTRICTED"
                    : "ALLOWED"}
                </strong>

                <p>
                    Treasury deployment execution permission.
                </p>
                </div>

                <div className="treasury-monitor-card">
                <span>Reserve Protection</span>

                <strong>
                    {treasuryDecisionBrain.shouldProtectReserve
                    ? "ACTIVE"
                    : "NORMAL"}
                </strong>

                <p>
                    Institutional reserve protection layer.
                </p>
                </div>

                <div className="treasury-monitor-card">
                <span>Recovery Queue</span>

                <strong>
                    {openQueueCount + reviewQueueCount + readyQueueCount}
                </strong>

                <p>
                    Active recovery orchestration workload.
                </p>
                </div>

                <div className="treasury-monitor-card">
                <span>Governance Status</span>

                <strong>{livePolicyStatus}</strong>

                <p>
                    Treasury policy governance condition.
                </p>
                </div>

            </div>

            </section>

            <section className="treasury-executive-action-bar risk-cluster-panel risk-warning treasury-flow-cluster">

                <div className="treasury-executive-header">

                    <div>
                    <p className="treasury-command-label">
                        ⚡ EXECUTIVE TREASURY ACTIONS
                    </p>

                    <h2>Live Executive Action Bar</h2>

                    <p className="treasury-command-description">
                        Institutional treasury operating instructions generated
                        from liquidity pressure, governance exposure,
                        recovery routing and deployment policy signals.
                    </p>
                    </div>

                    <div className="treasury-executive-mode">
                          🚀 LIVE ACTION ENGINE
                    </div>

                </div>

                <div className="treasury-executive-grid">

                    <div className="treasury-executive-card">
                    <span>Primary Action</span>

                    <strong>
                        {treasuryDecisionBrain.shouldLockdown
                        ? "LOCKDOWN TREASURY"
                        : treasuryDecisionBrain.shouldBlockDeployment
                        ? "RESTRICT DEPLOYMENT"
                        : treasuryDecisionBrain.shouldProtectReserve
                        ? "PROTECT RESERVE"
                        : "CONTINUE MONITORING"}
                    </strong>

                    <p>
                        Main treasury operating instruction generated by
                        Treasury Decision Brain.
                    </p>
                    </div>

                    <div className="treasury-executive-card">
                    <span>Recovery Routing</span>

                    <strong>
                        {primaryRoutingTarget.routingDecision.desk}
                    </strong>

                    <p>
                        Recommended institutional routing destination
                        for treasury recovery workflow.
                    </p>
                    </div>

                    <div className="treasury-executive-card">
                    <span>Liquidity Command</span>

                    <strong>{liquidityStressLevel}</strong>

                    <p>
                        Current treasury liquidity governance pressure level.
                    </p>
                    </div>

                    <div className="treasury-executive-card">
                    <span>Governance Action</span>

                    <strong>
                        {treasuryGovernanceRecommendation.level}
                    </strong>

                    <p>
                        Institutional treasury governance operating posture.
                    </p>
                    </div>

                </div>

                </section>
      </section>

      <section className="treasury-control-section">
        <div className="treasury-control-section-header">
          <div>
            <p className="eyebrow">Section B</p>
            <h2>Risk Intelligence Center</h2>
            <p>Treasury heatmap, alert feed, risk cluster intelligence and escalation wave monitoring.</p>
          </div>

          <span className="treasury-section-badge">CONTROL TOWER</span>
        </div>
     <section className="treasury-heatmap-panel risk-cluster-panel risk-critical liquidity-shock">
  <div className="treasury-heatmap-header">
    <div>
      <p className="treasury-command-label">
        🌡️ TREASURY HEATMAP
      </p>

      <h2>Live Treasury Risk Heatmap</h2>

      <p className="treasury-command-description">
        Institutional treasury visualization of liquidity,
        escalation exposure, recovery stress,
        policy governance and deployment pressure.
      </p>
    </div>

    <div className="treasury-heatmap-mode">
      📡 LIVE RISK MAP
    </div>
  </div>

  <div className="treasury-heatmap-grid">

    <div
      className={`treasury-heat-cell ${
        liquidityStressLevel === "CRITICAL"
          ? "critical"
          : liquidityStressLevel === "HIGH"
          ? "warning"
          : liquidityStressLevel === "ELEVATED"
          ? "watch"
          : "normal"
      }`}
    >
      <span>Liquidity</span>
      <strong>{liquidityStressLevel}</strong>
    </div>

    <div
      className={`treasury-heat-cell ${
        treasuryDecisionBrain.shouldBlockDeployment
          ? "critical"
          : treasuryDecisionBrain.shouldProtectReserve
          ? "warning"
          : "normal"
      }`}
    >
      <span>Policy</span>
      <strong>{livePolicyStatus}</strong>
    </div>

    <div
      className={`treasury-heat-cell ${
        escalatedCount >= 2
          ? "critical"
          : escalatedCount >= 1
          ? "warning"
          : "normal"
      }`}
    >
      <span>Escalation</span>
      <strong>{escalatedCount} ACTIVE</strong>
    </div>

    <div
      className={`treasury-heat-cell ${
        openQueueCount >= 2
          ? "critical"
          : openQueueCount >= 1
          ? "watch"
          : "normal"
      }`}
    >
      <span>Recovery Queue</span>
      <strong>{openQueueCount} OPEN</strong>
    </div>

    <div
      className={`treasury-heat-cell ${
        treasuryDecisionBrain.shouldLockdown
          ? "critical"
          : treasuryDecisionBrain.shouldBlockDeployment
          ? "warning"
          : "normal"
      }`}
    >
      <span>Deployment</span>
      <strong>{liveActionSignal}</strong>
    </div>

    <div
      className={`treasury-heat-cell ${
        criticalTimelineEvents >= 2
          ? "critical"
          : criticalTimelineEvents >= 1
          ? "warning"
          : "normal"
      }`}
    >
      <span>Timeline Events</span>
      <strong>{criticalTimelineEvents} CRITICAL</strong>
    </div>

  </div>
</section>

      <section className="treasury-alert-center risk-cluster-panel risk-danger treasury-alert-pulse">

  <div className="treasury-alert-header">
    <div>
      <p className="treasury-command-label">
        🚨 INSTITUTIONAL ALERT CENTER
      </p>

      <h2>Live Treasury Alerts</h2>

      <p className="treasury-command-description">
        Real-time treasury monitoring alerts for liquidity,
        escalation exposure, governance pressure,
        deployment restrictions and recovery orchestration.
      </p>
    </div>

    <div className="treasury-alert-mode">
      📢 LIVE ALERT FEED
    </div>
  </div>

  <div className="treasury-alert-feed">

    {(liquidityStressLevel === "CRITICAL" ||
      liquidityStressLevel === "HIGH") && (
      <div className="treasury-alert-card critical">
        <span>CRITICAL</span>

        <strong>
          Treasury Liquidity Pressure
        </strong>

        <p>
          Treasury recovery pressure is elevated.
          Recovery routing and reserve balancing
          should begin immediately.
        </p>
      </div>
    )}

    {treasuryDecisionBrain.shouldBlockDeployment && (
      <div className="treasury-alert-card critical">
        <span>BLOCKED</span>

        <strong>
          Deployment Restriction Active
        </strong>

        <p>
          Treasury Decision Brain has restricted
          deployment due to institutional risk exposure.
        </p>
      </div>
    )}

    {treasuryDecisionBrain.shouldProtectReserve && (
      <div className="treasury-alert-card warning">
        <span>WARNING</span>

        <strong>
          Reserve Protection Active
        </strong>

        <p>
          Treasury reserve protection layer is active.
          Maintain reserve discipline before deployment.
        </p>
      </div>
    )}

    {openQueueCount >= 1 && (
      <div className="treasury-alert-card watch">
        <span>WATCH</span>

        <strong>
          Recovery Queue Monitoring
        </strong>

        <p>
          Treasury recovery queue contains unresolved
          items requiring operational monitoring.
        </p>
      </div>
    )}

    {escalatedCount >= 1 && (
      <div className="treasury-alert-card critical">
        <span>ESCALATED</span>

        <strong>
          Treasury Escalation Active
        </strong>

        <p>
          One or more treasury workflows have been
          escalated for institutional review.
        </p>
      </div>
    )}

    {liquidityStressLevel === "STABLE" &&
      escalatedCount === 0 &&
      !treasuryDecisionBrain.shouldBlockDeployment && (
        <div className="treasury-alert-card normal">
          <span>NORMAL</span>

          <strong>
            Treasury Environment Stable
          </strong>

          <p>
            Treasury monitoring environment is stable.
            No institutional intervention required.
          </p>
        </div>
      )}

  </div>
</section>

      <section className="treasury-risk-cluster-panel risk-cluster-panel risk-danger treasury-density-radar">

  <div className="treasury-risk-cluster-header">
    <div>
      <p className="treasury-command-label">
        🧠 TREASURY RISK CLUSTER INTELLIGENCE
      </p>

      <h2>Institutional Threat Cluster Detection</h2>

      <p className="treasury-command-description">
        Live institutional threat mapping for escalation density,
        liquidity shock propagation, treasury congestion,
        recovery pressure and operational threat clustering.
      </p>
    </div>

    <div className="treasury-risk-cluster-mode">
      🎯 LIVE CLUSTER RADAR
    </div>
  </div>

  <div className="treasury-risk-cluster-grid">

    <div className="treasury-risk-cluster-card critical">
      <span>Risk Clusters</span>

      <strong>
        {openQueueCount + escalatedCount + reviewQueueCount}
      </strong>

      <p>
        Active treasury operational threat clusters.
      </p>
    </div>

    <div className="treasury-risk-cluster-card warning">
      <span>Highest Threat Zone</span>

      <strong>
        {liquidityStressLevel}
      </strong>

      <p>
        Dominant institutional treasury pressure level.
      </p>
    </div>

    <div className="treasury-risk-cluster-card watch">
      <span>Escalation Density</span>

      <strong>
        {escalatedCount} ACTIVE
      </strong>

      <p>
        Escalation propagation across treasury workflows.
      </p>
    </div>

    <div className="treasury-risk-cluster-card critical">
      <span>Liquidity Shock</span>

      <strong>
        {recoveryScore >= 60 ? "ACTIVE" : "STABLE"}
      </strong>

      <p>
        Treasury liquidity disruption monitoring.
      </p>
    </div>

    <div className="treasury-risk-cluster-card warning">
      <span>Threat Propagation</span>

      <strong>
        {criticalTimelineEvents >= 2 ? "EXPANDING" : "CONTROLLED"}
      </strong>

      <p>
        Institutional treasury risk spread analysis.
      </p>
    </div>

    <div className="treasury-risk-cluster-card watch">
      <span>Radar Signal</span>

      <strong>
        {autoEscalationSignal}
      </strong>

      <p>
        Treasury threat intelligence radar signal.
      </p>
    </div>

  </div>
</section>

<section className="treasury-escalation-wave-panel risk-cluster-panel risk-escalation treasury-wave-engine">

  <div className="treasury-risk-cluster-header">

    <div>
      <p className="treasury-command-label">
        🌊 TREASURY ESCALATION WAVE ENGINE
      </p>

      <h2>Institutional Threat Propagation Monitor</h2>

      <p className="treasury-command-description">
        Live institutional escalation tracking for threat spread,
        treasury wave intensity, propagation velocity,
        cluster expansion and executive escalation routing.
      </p>
    </div>

    <div className="treasury-risk-cluster-mode">
      🌐 LIVE ESCALATION RADAR
    </div>

  </div>

  <div className="treasury-risk-cluster-grid">

    <div className="treasury-risk-cluster-card critical">
      <span>Wave Intensity</span>

      <strong>
        {escalationWaveIntensity}
      </strong>

      <p>
        Institutional treasury escalation pressure.
      </p>
    </div>

    <div className="treasury-risk-cluster-card warning">
      <span>Threat Velocity</span>

      <strong>
        {threatVelocity}
      </strong>

      <p>
        Treasury threat spread acceleration monitoring.
      </p>
    </div>

    <div className="treasury-risk-cluster-card watch">
      <span>Escalation Path</span>

      <strong>
        {institutionalEscalationPath}
      </strong>

      <p>
        Institutional escalation routing layer.
      </p>
    </div>

    <div className="treasury-risk-cluster-card critical">
      <span>Threat Spread Zones</span>

      <strong>
        {escalationDirection.length}
      </strong>

      <p>
        Treasury propagation target zones detected.
      </p>
    </div>

  </div>

  <div className="treasury-escalation-zones">

    {escalationDirection.map((zone) => (
      <div
        key={zone}
        className="treasury-escalation-zone"
      >
        ⚠️ {zone}
      </div>
    ))}

  </div>

</section>

      <section className="treasury-live-risk-strip">
  <div
    className={`treasury-risk-pill ${
      liquidityStressLevel === "CRITICAL"
        ? "critical"
        : liquidityStressLevel === "HIGH"
        ? "warning"
        : liquidityStressLevel === "ELEVATED"
        ? "watch"
        : "normal"
    }`}
  >
    <span className="risk-dot"></span>
    <strong>Liquidity</strong>
    <small>{liquidityStressLevel}</small>
  </div>

  <div
    className={`treasury-risk-pill ${
      treasuryDecisionBrain.shouldBlockDeployment
        ? "critical"
        : treasuryDecisionBrain.shouldProtectReserve
        ? "warning"
        : "normal"
    }`}
  >
    <span className="risk-dot"></span>
    <strong>Policy</strong>
    <small>{livePolicyStatus}</small>
  </div>

  <div
    className={`treasury-risk-pill ${
      escalatedCount >= 2
        ? "critical"
        : escalatedCount >= 1
        ? "warning"
        : "normal"
    }`}
  >
    <span className="risk-dot"></span>
    <strong>Escalation</strong>
    <small>{escalatedCount} Active</small>
  </div>

  <div
    className={`treasury-risk-pill ${
      openQueueCount >= 2
        ? "critical"
        : openQueueCount >= 1
        ? "watch"
        : "normal"
    }`}
  >
    <span className="risk-dot"></span>
    <strong>Recovery Queue</strong>
    <small>{openQueueCount} Open</small>
  </div>

  <div
    className={`treasury-risk-pill ${
      treasuryDecisionBrain.shouldLockdown
        ? "critical"
        : treasuryDecisionBrain.shouldBlockDeployment
        ? "warning"
        : "normal"
    }`}
  >
    <span className="risk-dot"></span>
    <strong>Deployment</strong>
    <small>{liveActionSignal}</small>
  </div>
</section>
      </section>

      <section className="treasury-control-section">
        <div className="treasury-control-section-header">
          <div>
            <p className="eyebrow">Section C</p>
            <h2>Governance & Operator Center</h2>
            <p>Operator guidance, operator action, recommendation engine and execution readiness control.</p>
          </div>

          <span className="treasury-section-badge">CONTROL TOWER</span>
        </div>
        <TreasuryOperatorGuidanceEngine
          recoveryScore={recoveryScore}
          liquidityStressLevel={liquidityStressLevel}
          treasuryDecisionBrain={treasuryDecisionBrain}
          openQueueCount={openQueueCount}
          reviewQueueCount={reviewQueueCount}
          readyQueueCount={readyQueueCount}
          escalatedCount={escalatedCount}
        />

        <TreasuryOperatorActionCenter
          onOperatorAction={handleOperatorAction}
        />

        <section className="treasury-governance-engine-card">
          <div className="treasury-governance-engine-main">
            <p className="eyebrow">
              🏛 Treasury Governance Recommendation Engine
            </p>

            <h2>Governance Recommendation</h2>

            <div className="treasury-engine-action-pill">
              {treasuryGovernanceRecommendationEngine.recommendedAction}
            </div>

            <p>{treasuryGovernanceRecommendationEngine.governanceReason}</p>
          </div>

          <div className="treasury-governance-engine-panel">
            <span className="treasury-engine-status">
              {treasuryGovernanceRecommendationEngine.executionReadiness}
            </span>

            <div className="treasury-engine-info-grid">
              <div>
                <small>Next Operator Step</small>
                <strong>
                  {treasuryGovernanceRecommendationEngine.nextOperatorStep}
                </strong>
              </div>

              <div>
                <small>Confidence Note</small>
                <strong>
                  {treasuryGovernanceRecommendationEngine.confidenceNote}
                </strong>
              </div>

              <div>
                <small>Liquidity Stress</small>
                <strong>{liquidityStressLevel}</strong>
              </div>

              <div>
                <small>Recovery Score</small>
                <strong>{recoveryScore}</strong>
              </div>
            </div>
          </div>
        </section>

        <TreasuryGovernanceExecutionReadiness
          recommendation={treasuryGovernanceRecommendationEngine}
          operatorAction={operatorRecommendationResult}
        />

        <section className="treasury-operator-result-card">
          <div className="treasury-operator-result-main">
            <p className="eyebrow">🧾 Last Operator Result</p>
            <h2>{operatorRecommendationResult.title}</h2>
            <p>{operatorRecommendationResult.message}</p>
          </div>

          <div className="treasury-operator-result-panel">
            <span>{operatorRecommendationResult.status}</span>

            <div>
              <small>Next Step</small>
              <strong>{operatorRecommendationResult.nextStep}</strong>
            </div>

            <div>
              <small>Result Severity</small>
              <strong>{operatorRecommendationResult.severity}</strong>
            </div>

            <div>
              <small>Timeline</small>
              <strong>Recorded into Treasury Incident Timeline</strong>
            </div>
          </div>
        </section>
      </section>

      <section className="treasury-control-section">
        <div className="treasury-control-section-header">
          <div>
            <p className="eyebrow">Section D</p>
            <h2>Treasury Operations Center</h2>
            <p>Recovery routing, lifecycle control, restrictions, policy monitor and capital command.</p>
          </div>

          <span className="treasury-section-badge">CONTROL TOWER</span>
        </div>
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

      <section
        className={`treasury-governance-recommendation ${
          treasuryDecisionBrain.controlState === "LOCKDOWN"
            ? "danger"
            : treasuryDecisionBrain.controlState === "RESTRICTED"
            ? "warning"
            : treasuryDecisionBrain.controlState === "WARNING"
            ? "warning"
            : "stable"
        }`}
      >
        <div>
          <p className="eyebrow">Treasury Decision Intelligence</p>
          <h2>{treasuryDecisionBrain.decisionTitle}</h2>
          <p>{treasuryDecisionBrain.decisionMessage}</p>
        </div>

        <div className="treasury-recommendation-side">
          <span>{treasuryDecisionBrain.controlState}</span>

          <div>
            <small>Enforcement: {treasuryDecisionBrain.enforcementLevel}</small>

            <small>
              Deployment Block:{" "}
              {treasuryDecisionBrain.shouldBlockDeployment ? "YES" : "NO"}
            </small>

            <small>
              Reserve Protection:{" "}
              {treasuryDecisionBrain.shouldProtectReserve ? "ACTIVE" : "NORMAL"}
            </small>

            <small>
              Lockdown: {treasuryDecisionBrain.shouldLockdown ? "ACTIVE" : "NO"}
            </small>
          </div>
        </div>
      </section>

      <section className="treasury-action-center">
        <div className="treasury-action-header">
          <div>
            <p className="eyebrow">Operational Restriction Layer</p>
            <h2>Treasury Control Restrictions</h2>
            <p className="muted">
              Decision Brain converts treasury risk into operational control
              rules.
            </p>
          </div>

          <span className="treasury-action-mode">
            {treasuryDecisionBrain.enforcementLevel}
          </span>
        </div>

        <div className="treasury-action-grid">
          {treasuryDecisionBrain.restrictions.map((restriction) => (
            <div key={restriction} className="treasury-action-card">
              <span>Restriction Rule</span>
              <strong>{restriction}</strong>
              <p>
                This rule is automatically generated from recovery score,
                liquidity stress, escalation count and incident timeline.
              </p>
            </div>
          ))}
        </div>
      </section>

      {autoInterventionTriggered && (
        <section className="treasury-governance-recommendation">
          <div>
            <p className="eyebrow">Auto Treasury Intervention</p>
            <h2>Treasury Intervention Triggered</h2>
            <p>{autoInterventionReason}</p>
          </div>

          <div className="treasury-recommendation-side">
            <span>INTERVENTION</span>

            <div>
              <small>Action: Pause New Deployment</small>
              <small>Desk: Recovery Execution Desk</small>
              <small>Status: Requires Treasury Review</small>
            </div>
          </div>
        </section>
      )}

      <section className="treasury-governance-recommendation">
        <div>
          <p className="eyebrow">Treasury Auto Recovery Intelligence</p>

          <h2>{autoRecoveryRecommendation.title}</h2>

          <p>{autoRecoveryRecommendation.message}</p>
        </div>

        <div className="treasury-recommendation-side">
          <span>{liquidityStressLevel}</span>

          <div>
            <small>Recovery Score: {recoveryScore}</small>

            <small>Treasury Severity: {treasuryInterventionSeverity}</small>

            <small>Escalation Engine: {autoEscalationSignal}</small>

            <small>
              Recommended Action: {autoRecoveryRecommendation.action}
            </small>
          </div>
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

      <section className="treasury-capital-command">
        <div className="treasury-capital-command-header">
            <div>
            <p className="treasury-command-label">
               💠 CAPITAL ALLOCATION COMMAND
            </p>

            <h2>Institutional Capital Allocation Control</h2>

            <p className="treasury-command-description">
                Treasury capital command layer converts recovery
                intelligence, liquidity stress and governance
                signals into deployment instructions.
            </p>
            </div>

            <div className="treasury-capital-mode">
            CAPITAL COMMAND
            </div>
        </div>

        <div className="treasury-capital-grid">

            <div className="treasury-capital-card">
            <span>Current Treasury Command</span>

            <strong>
                {treasuryDecisionBrain.shouldLockdown
                ? "LOCKDOWN"
                : treasuryDecisionBrain.shouldBlockDeployment
                ? "RESTRICT DEPLOYMENT"
                : treasuryDecisionBrain.shouldProtectReserve
                ? "PROTECT RESERVE"
                : "NORMAL DEPLOYMENT"}
            </strong>

            <p>
                Treasury command generated from recovery
                score and governance intelligence.
            </p>
            </div>

            <div className="treasury-capital-card">
            <span>Deployment Permission</span>

            <strong>
                {treasuryDecisionBrain.shouldBlockDeployment
                ? "BLOCKED"
                : "ALLOWED"}
            </strong>

            <p>
                Controls whether treasury deployment
                execution should continue.
            </p>
            </div>

            <div className="treasury-capital-card">
            <span>Reserve Action</span>

            <strong>
                {treasuryDecisionBrain.shouldProtectReserve
                ? "RESERVE PROTECTION"
                : "STANDARD RESERVE"}
            </strong>

            <p>
                Treasury reserve discipline and
                liquidity protection instruction.
            </p>
            </div>

            <div className="treasury-capital-card">
            <span>Recovery Priority</span>

            <strong>
                {openQueueCount >= 2
                ? "HIGH PRIORITY"
                : reviewQueueCount >= 1
                ? "UNDER REVIEW"
                : "NORMAL"}
            </strong>

            <p>
                Recovery queue priority for
                treasury routing operations.
            </p>
            </div>

        </div>
        </section>

        <section className="treasury-live-policy-monitor">

            <div className="treasury-policy-header">
                <div>
                <p className="treasury-command-label">
                   🛡️ LIVE POLICY MONITORING
                </p>

                <h2>Institutional Treasury Policy Governance</h2>

                <p className="treasury-command-description">
                    Real-time treasury governance monitoring for deployment,
                    reserve protection, liquidity compliance and escalation policy control.
                </p>
                </div>

                <div className="treasury-policy-mode">
                     🛡️ POLICY ENGINE
                </div>
            </div>

            <div className="treasury-policy-grid">

                <div
                className={`treasury-policy-card ${
                    treasuryDecisionBrain.shouldBlockDeployment
                    ? "critical"
                    : "normal"
                }`}
                >
                <span>Deployment Policy</span>

                <strong>
                    {treasuryDecisionBrain.shouldBlockDeployment
                    ? "RESTRICTED"
                    : "COMPLIANT"}
                </strong>

                <p>
                    Controls institutional treasury deployment execution policy.
                </p>
                </div>

                <div
                className={`treasury-policy-card ${
                    treasuryDecisionBrain.shouldProtectReserve
                    ? "warning"
                    : "normal"
                }`}
                >
                <span>Reserve Policy</span>

                <strong>
                    {treasuryDecisionBrain.shouldProtectReserve
                    ? "PROTECTED"
                    : "NORMAL"}
                </strong>

                <p>
                    Treasury reserve protection governance monitoring.
                </p>
                </div>

                <div
                className={`treasury-policy-card ${
                    escalatedCount >= 1
                    ? "warning"
                    : "normal"
                }`}
                >
                <span>Escalation Policy</span>

                <strong>
                    {escalatedCount >= 1
                    ? "ACTIVE REVIEW"
                    : "STABLE"}
                </strong>

                <p>
                    Governance escalation monitoring and approval control.
                </p>
                </div>

                <div
                className={`treasury-policy-card ${
                    liquidityStressLevel === "HIGH" ||
                    liquidityStressLevel === "CRITICAL"
                    ? "critical"
                    : liquidityStressLevel === "ELEVATED"
                    ? "watch"
                    : "normal"
                }`}
                >
                <span>Liquidity Compliance</span>

                <strong>
                    {liquidityStressLevel}
                </strong>

                <p>
                    Institutional liquidity governance and compliance monitoring.
                </p>
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

      <section className="treasury-action-center treasury-routing-engine-section">
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

     <section className="treasury-action-center treasury-lifecycle-section">
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
      </section>

      <section className="treasury-control-section">
        <div className="treasury-control-section-header">
          <div>
            <p className="eyebrow">Section E</p>
            <h2>Timeline, Audit & Ledger</h2>
            <p>Treasury incident history, latest operational events and immutable ledger traceability.</p>
          </div>

          <span className="treasury-section-badge">CONTROL TOWER</span>
        </div>
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
      </section>
    </main>
  );
}