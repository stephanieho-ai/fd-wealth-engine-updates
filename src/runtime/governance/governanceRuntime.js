/* ========================================
   GOVERNANCE RUNTIME CORE
   V33.2-G19-M
   Institutional Governance Runtime Engine
======================================== */

/**
 * Centralized runtime brain for the Governance system.
 *
 * This layer stores base signals and derives connected
 * runtime state so exposure, pressure, stability and
 * confidence can move together.
 */

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function deriveGovernanceRuntimeState(state) {
  const exposure = clamp(state.escalationExposure);

  const derivedRoutingPressure = clamp(Math.round(exposure * 0.9 + 10));

  state.routingPressure = derivedRoutingPressure;

  const derivedStability = clamp(
    Math.round(100 - exposure * 0.42 - derivedRoutingPressure * 0.28)
  );

  const derivedConfidence = clamp(
    Math.round(65 + derivedStability * 0.35 - exposure * 0.18)
  );

  state.governanceStability = derivedStability;
  state.institutionalConfidence = derivedConfidence;

  if (exposure >= 70 || derivedRoutingPressure >= 75) {
    state.runtimeStatus = "CRITICAL";
  } else if (exposure >= 40 || derivedRoutingPressure >= 55) {
    state.runtimeStatus = "WARNING";
  } else {
    state.runtimeStatus = "STABLE";
  }

  state.lastUpdated = new Date().toISOString();

  return state;
}

export const governanceRuntimeState = deriveGovernanceRuntimeState({
  governanceStability: 82,
  routingPressure: 34,
  escalationExposure: 27,
  institutionalConfidence: 91,

  activeGovernanceEvents: 3,
  runtimeStatus: "STABLE",

  lastRuntimeAction: "Governance Runtime Initialized",
  lastUpdated: new Date().toISOString(),
});

export function getGovernanceRuntimeState() {
  return deriveGovernanceRuntimeState(governanceRuntimeState);
}

export function setGovernanceExposure(exposure) {
  governanceRuntimeState.escalationExposure = clamp(exposure);
  governanceRuntimeState.lastRuntimeAction = "Governance Exposure Updated";

  return deriveGovernanceRuntimeState(governanceRuntimeState);
}

export function applyGovernanceStabilization() {
  governanceRuntimeState.escalationExposure = clamp(
    governanceRuntimeState.escalationExposure - 5
  );

  governanceRuntimeState.activeGovernanceEvents += 1;
  governanceRuntimeState.lastRuntimeAction =
    "Governance Stabilization Applied";

  return deriveGovernanceRuntimeState(governanceRuntimeState);
}