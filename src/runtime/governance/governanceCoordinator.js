/* ========================================
   GOVERNANCE RUNTIME COORDINATOR
   V33.2-G19-N
   Governance Runtime Orchestration Engine
======================================== */

import { getGovernanceRuntimeState } from "./governanceRuntime";
import {
  applyGovernanceEscalation,
  applyGovernanceLoadRedistribution,
  applyGovernanceStabilization,
} from "./governanceActions";
import { createGovernanceEvent } from "./governanceEvents";
import {
  getGovernanceRiskSignal,
  getInstitutionalConfidenceSignal,
} from "./governanceSignals";

function buildGovernanceCycleResult(type, message, updatedState) {
  const riskSignal = getGovernanceRiskSignal();
  const confidenceSignal = getInstitutionalConfidenceSignal();

  const event = createGovernanceEvent(type, message, {
    updatedState,
    riskSignal,
    confidenceSignal,
  });

  return {
    state: getGovernanceRuntimeState(),
    riskSignal,
    confidenceSignal,
    event,
  };
}

export function runGovernanceStabilizationCycle() {
  const updatedState = applyGovernanceStabilization();

  return buildGovernanceCycleResult(
    "GOVERNANCE_STABILIZATION",
    "Governance stabilization cycle executed by runtime coordinator.",
    updatedState
  );
}

export function runGovernanceEscalationCycle() {
  const updatedState = applyGovernanceEscalation();

  return buildGovernanceCycleResult(
    "GOVERNANCE_ESCALATION",
    "Governance escalation cycle triggered by runtime coordinator.",
    updatedState
  );
}

export function runGovernanceLoadRedistributionCycle() {
  const updatedState = applyGovernanceLoadRedistribution();

  return buildGovernanceCycleResult(
    "GOVERNANCE_LOAD_REDISTRIBUTION",
    "Governance approval load redistribution executed by runtime coordinator.",
    updatedState
  );
}