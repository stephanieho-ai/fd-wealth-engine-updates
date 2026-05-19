// src/config/treasuryPolicy.js

export const TREASURY_POLICY = {
  version: "V33.2-F6F-A",

  // Minimum liquidity buffer required before deployment is considered safe.
  minLiquidityRatio: 15,

  // Maximum exposure allowed in one bank before governance warning.
  maxSingleBankExposureRatio: 35,

  // Minimum reserve amount that should remain untouched.
  reserveFloor: 20000,

  // Any deployment equal or above this amount requires approval.
  approvalThreshold: 100000,

  // If true, critical breaches can block execution automatically.
  autoBlockCriticalBreach: true,

  severityLevels: {
    OK: "OK",
    WARNING: "WARNING",
    ESCALATION: "ESCALATION",
    CRITICAL: "CRITICAL",
    BLOCKED: "BLOCKED",
    APPROVAL_REQUIRED: "APPROVAL_REQUIRED",
  },

  policyLabels: {
    LIQUIDITY: "Liquidity Policy",
    RESERVE: "Reserve Floor Policy",
    EXPOSURE: "Exposure Policy",
    APPROVAL: "Approval Threshold Policy",
  },
};

export default TREASURY_POLICY;