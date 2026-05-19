// src/selectors/policyValidator.js

import TREASURY_POLICY from "../config/treasuryPolicy";

function createPolicyResult({
  allowed = true,
  severity = "OK",
  policy = "GENERAL",
  title = "Policy Clear",
  message = "No policy breach detected.",
  action = "ALLOW",
} = {}) {
  return {
    allowed,
    severity,
    policy,
    title,
    message,
    action,
    timestamp: new Date().toISOString(),
  };
}

export function validateReserveFloor({
  deployableAmount = 0,
  reserveAmount = 0,
  policy = TREASURY_POLICY,
} = {}) {
  const amountAfterReserve = Number(deployableAmount || 0) - Number(reserveAmount || 0);

  if (amountAfterReserve < policy.reserveFloor) {
    return createPolicyResult({
      allowed: false,
      severity: policy.severityLevels.CRITICAL,
      policy: policy.policyLabels.RESERVE,
      title: "Reserve Floor Breach",
      message: "Deployment would reduce available reserve below treasury policy floor.",
      action: policy.autoBlockCriticalBreach ? "AUTO_BLOCK" : "ESCALATE",
    });
  }

  return createPolicyResult({
    policy: policy.policyLabels.RESERVE,
    title: "Reserve Policy Clear",
    message: "Reserve floor remains within treasury policy.",
  });
}

export function validateApprovalThreshold({
  deploymentAmount = 0,
  policy = TREASURY_POLICY,
} = {}) {
  if (Number(deploymentAmount || 0) >= policy.approvalThreshold) {
    return createPolicyResult({
      allowed: true,
      severity: policy.severityLevels.APPROVAL_REQUIRED,
      policy: policy.policyLabels.APPROVAL,
      title: "Approval Required",
      message: "Deployment amount meets treasury approval threshold.",
      action: "REQUIRE_APPROVAL",
    });
  }

  return createPolicyResult({
    policy: policy.policyLabels.APPROVAL,
    title: "Approval Policy Clear",
    message: "Deployment amount is below approval threshold.",
  });
}

export function validateSingleBankExposure({
  highestBankExposureRatio = 0,
  policy = TREASURY_POLICY,
} = {}) {
  if (Number(highestBankExposureRatio || 0) >= policy.maxSingleBankExposureRatio) {
    return createPolicyResult({
      allowed: true,
      severity: policy.severityLevels.ESCALATION,
      policy: policy.policyLabels.EXPOSURE,
      title: "Bank Exposure Escalation",
      message: "Single bank exposure exceeds treasury concentration policy.",
      action: "ESCALATE",
    });
  }

  return createPolicyResult({
    policy: policy.policyLabels.EXPOSURE,
    title: "Exposure Policy Clear",
    message: "Single bank exposure remains within policy limit.",
  });
}

export function validateLiquidityRatio({
  liquidityRatio = 0,
  policy = TREASURY_POLICY,
} = {}) {
  if (Number(liquidityRatio || 0) < policy.minLiquidityRatio) {
    return createPolicyResult({
      allowed: false,
      severity: policy.severityLevels.CRITICAL,
      policy: policy.policyLabels.LIQUIDITY,
      title: "Liquidity Policy Breach",
      message: "Liquidity ratio is below treasury minimum requirement.",
      action: policy.autoBlockCriticalBreach ? "AUTO_BLOCK" : "ESCALATE",
    });
  }

  return createPolicyResult({
    policy: policy.policyLabels.LIQUIDITY,
    title: "Liquidity Policy Clear",
    message: "Liquidity ratio remains within treasury policy.",
  });
}

export function validateTreasuryPolicies({
  deploymentAmount = 0,
  deployableAmount = 0,
  reserveAmount = 0,
  liquidityRatio = 0,
  highestBankExposureRatio = 0,
  policy = TREASURY_POLICY,
} = {}) {
  const results = [
    validateReserveFloor({ deployableAmount, reserveAmount, policy }),
    validateApprovalThreshold({ deploymentAmount, policy }),
    validateSingleBankExposure({ highestBankExposureRatio, policy }),
    validateLiquidityRatio({ liquidityRatio, policy }),
  ];

  const blocked = results.some((item) => item.action === "AUTO_BLOCK");
  const approvalRequired = results.some((item) => item.action === "REQUIRE_APPROVAL");
  const escalationRequired = results.some((item) => item.action === "ESCALATE");

  return {
    allowed: !blocked,
    blocked,
    approvalRequired,
    escalationRequired,
    severity: blocked
      ? policy.severityLevels.BLOCKED
      : approvalRequired
      ? policy.severityLevels.APPROVAL_REQUIRED
      : escalationRequired
      ? policy.severityLevels.ESCALATION
      : policy.severityLevels.OK,
    results,
    policyVersion: policy.version,
    timestamp: new Date().toISOString(),
  };
}