/* ========================================
   GOVERNANCE SIGNAL INTELLIGENCE LAYER
   V33.2-G19-M
======================================== */

import { governanceRuntimeState } from "./governanceRuntime";

/**
 * Governance Risk Signal
 */

export function getGovernanceRiskSignal() {
  const {
    governanceStability,
    routingPressure,
    escalationExposure,
  } = governanceRuntimeState;

  if (
    routingPressure >= 80 ||
    escalationExposure >= 80
  ) {
    return {
      level: "CRITICAL",
      message:
        "Institutional governance pressure is critically elevated.",
    };
  }

  if (
    routingPressure >= 60 ||
    escalationExposure >= 60
  ) {
    return {
      level: "HIGH",
      message:
        "Governance escalation risk is increasing rapidly.",
    };
  }

  if (governanceStability <= 40) {
    return {
      level: "WARNING",
      message:
        "Governance stability is weakening.",
    };
  }

  return {
    level: "STABLE",
    message:
      "Institutional governance system is stable.",
  };
}

/**
 * Governance Confidence Signal
 */

export function getInstitutionalConfidenceSignal() {
  const {
    institutionalConfidence,
  } = governanceRuntimeState;

  if (institutionalConfidence >= 90) {
    return "EXECUTIVE CONFIDENCE";
  }

  if (institutionalConfidence >= 70) {
    return "INSTITUTIONAL CONFIDENCE";
  }

  if (institutionalConfidence >= 50) {
    return "MODERATE CONFIDENCE";
  }

  return "LOW CONFIDENCE";
}