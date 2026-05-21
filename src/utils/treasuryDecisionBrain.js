export function getTreasuryDecisionBrain({
  recoveryScore = 0,
  liquidityStressLevel = "STABLE",
  openQueueCount = 0,
  reviewQueueCount = 0,
  readyQueueCount = 0,
  resolvedQueueCount = 0,
  escalatedCount = 0,
  criticalTimelineEvents = 0,
}) {
  const shouldLockdown =
    recoveryScore >= 100 ||
    liquidityStressLevel === "CRITICAL" ||
    escalatedCount >= 2 ||
    criticalTimelineEvents >= 3;

  const shouldRestrict =
    shouldLockdown ||
    recoveryScore >= 70 ||
    liquidityStressLevel === "HIGH" ||
    openQueueCount >= 2;

  const shouldProtectReserve =
    shouldRestrict ||
    recoveryScore >= 45 ||
    reviewQueueCount >= 2;

  const shouldBlockDeployment =
    shouldLockdown ||
    shouldRestrict ||
    shouldProtectReserve;

  const controlState = shouldLockdown
    ? "LOCKDOWN"
    : shouldRestrict
    ? "RESTRICTED"
    : shouldProtectReserve
    ? "WARNING"
    : "NORMAL";

  const enforcementLevel = shouldLockdown
    ? "FULL TREASURY LOCKDOWN"
    : shouldRestrict
    ? "DEPLOYMENT RESTRICTED"
    : shouldProtectReserve
    ? "RESERVE PROTECTION ACTIVE"
    : "STANDARD MONITORING";

  const decisionTitle = shouldLockdown
    ? "Treasury Lockdown Activated"
    : shouldRestrict
    ? "Deployment Restriction Active"
    : shouldProtectReserve
    ? "Reserve Protection Required"
    : "Treasury Decision State Normal";

  const decisionMessage = shouldLockdown
    ? "Treasury risk is too high. New deployment should be blocked until recovery pressure is reduced."
    : shouldRestrict
    ? "Treasury pressure is elevated. New deployment should be restricted and reviewed before execution."
    : shouldProtectReserve
    ? "Reserve protection is active. Deployment should only proceed if liquidity buffer remains safe."
    : "Treasury environment is normal. Standard deployment can continue.";

  const restrictions = [];

  if (shouldBlockDeployment) restrictions.push("Block or review new deployment");
  if (shouldProtectReserve) restrictions.push("Protect liquidity reserve");
  if (shouldRestrict) restrictions.push("Require treasury approval");
  if (shouldLockdown) restrictions.push("Freeze high-risk execution");

  if (restrictions.length === 0) {
    restrictions.push("Continue normal monitoring");
  }

  return {
    controlState,
    enforcementLevel,
    decisionTitle,
    decisionMessage,
    shouldBlockDeployment,
    shouldProtectReserve,
    shouldRestrict,
    shouldLockdown,
    restrictions,
  };
}