import "../../styles/treasury/treasury-operator-guidance-engine.css";

export default function TreasuryOperatorGuidanceEngine({
  recoveryScore = 0,
  liquidityStressLevel = "STABLE",
  treasuryDecisionBrain = {},
  openQueueCount = 0,
  reviewQueueCount = 0,
  readyQueueCount = 0,
  escalatedCount = 0,
}) {
  const shouldLockdown = treasuryDecisionBrain.shouldLockdown;
  const shouldBlockDeployment = treasuryDecisionBrain.shouldBlockDeployment;
  const shouldProtectReserve = treasuryDecisionBrain.shouldProtectReserve;

  const currentState =
    liquidityStressLevel === "CRITICAL"
      ? "Critical Treasury Pressure"
      : liquidityStressLevel === "HIGH"
      ? "High Treasury Pressure"
      : liquidityStressLevel === "ELEVATED"
      ? "Elevated Treasury Monitoring"
      : "Treasury Stable";

  const recommendedAction = shouldLockdown
    ? "Lockdown treasury and stop new deployment"
    : shouldBlockDeployment
    ? "Pause deployment and review liquidity exposure"
    : shouldProtectReserve
    ? "Protect reserve and monitor recovery queue"
    : openQueueCount >= 2
    ? "Prioritize open recovery queue"
    : reviewQueueCount >= 2
    ? "Clear governance review queue"
    : readyQueueCount >= 2
    ? "Approve ready recovery actions"
    : "Continue guided monitoring";

  const whyThisMatters =
    liquidityStressLevel === "CRITICAL"
      ? "Critical pressure can affect liquidity safety, deployment discipline, and recovery timing."
      : liquidityStressLevel === "HIGH"
      ? "High pressure means treasury should reduce execution risk before approving new action."
      : liquidityStressLevel === "ELEVATED"
      ? "Elevated pressure requires closer monitoring because unresolved queue items may increase risk."
      : "Treasury condition is stable, but monitoring should continue to preserve operating discipline.";

  const nextStep = shouldLockdown
    ? "Stop execution, review reserve position, and escalate to governance."
    : shouldBlockDeployment
    ? "Hold new placement, check weak months, and confirm deployable cash."
    : shouldProtectReserve
    ? "Maintain reserve buffer and avoid aggressive capital movement."
    : openQueueCount >= 1
    ? "Move open queue items into review before taking further action."
    : "Continue monitoring and record any material treasury decision.";

  const guidanceSteps = [
    {
      label: "01",
      title: "Current Treasury State",
      description: `Recovery score is ${recoveryScore}. Liquidity condition is ${liquidityStressLevel}.`,
      action: currentState,
      status: liquidityStressLevel,
    },
    {
      label: "02",
      title: "Recommended Action",
      description:
        "The system converts liquidity pressure, queue status, and decision rules into an operator instruction.",
      action: recommendedAction,
      status: shouldBlockDeployment ? "RESTRICT" : "GUIDE",
    },
    {
      label: "03",
      title: "Why This Matters",
      description: whyThisMatters,
      action:
        escalatedCount > 0
          ? `${escalatedCount} escalation signal detected`
          : "No active escalation signal",
      status: escalatedCount > 0 ? "WATCH" : "SAFE",
    },
    {
      label: "04",
      title: "Next Operator Step",
      description:
        "Follow the safest operating path before executing, routing, or resolving treasury actions.",
      action: nextStep,
      status: shouldLockdown ? "LOCKDOWN" : "NEXT",
    },
  ];

  return (
    <section className="treasury-operator-guidance-card">
      <div className="operator-guidance-header">
        <div>
          <p className="treasury-eyebrow">Operator Guidance Engine</p>
          <h2 className="treasury-section-title">
            Treasury Operator Next-Step Guidance
          </h2>
          <p className="operator-guidance-subtitle">
            Converts live treasury signals into clear operating instructions,
            recommended action, risk explanation, and next operator step.
          </p>
        </div>

        <div className="operator-guidance-status">
          <span className="status-dot" />
          LIVE ADVISOR
        </div>
      </div>

      <div className="operator-guidance-summary">
        <div>
          <span className="summary-label">Current Treasury State</span>
          <strong>{currentState}</strong>
        </div>

        <div>
          <span className="summary-label">Recommended Action</span>
          <strong>{recommendedAction}</strong>
        </div>

        <div>
          <span className="summary-label">Next Operator Step</span>
          <strong>{nextStep}</strong>
        </div>
      </div>

      <div className="operator-guidance-grid">
        {guidanceSteps.map((step) => (
          <div className="operator-guidance-step" key={step.label}>
            <div className="step-topline">
              <span className="step-label">{step.label}</span>
              <span className="step-status">{step.status}</span>
            </div>

            <h3>{step.title}</h3>
            <p>{step.description}</p>

            <div className="step-action">
              <span>Operator instruction</span>
              <strong>{step.action}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}