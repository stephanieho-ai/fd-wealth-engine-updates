/* ========================================
   V33.2-RP1-C
   TREASURY OS DEMO DATASET
   Official Institutional Showcase Dataset
======================================== */

export const demoTreasuryDataset = {
  portfolio: {
    totalPortfolio: 436000,
    monthlyInterestTarget: 1500,
    activeDeposits: 12,
    maturityCoverage: "12M",
    portfolioStatus: "OPERATIONAL",
  },

  runtime: {
  totalActivePortfolio: 436000,
  totalFixedDeposits: 312000,
  totalSavings: 84000,
  totalParkingCash: 40000,
  totalDeployableFunds: 124000,
  totalDeployableWithUpcoming: 160000,
  upcomingMaturityAmount: 36000,
  reserveAmount: 50000,

  liquidityRatio: 0.284,
  fdExposureRatio: 0.716,

  largestBankExposure: {
    bank: "CIMB",
    amount: 118000,
    ratio: 0.27,
  },

  capitalHealth: {
    score: 92,
    label: "Institutional Stable",
  },

  treasuryPolicyDecision: {
    severity: "SAFE",
    allowed: true,
    blocked: false,
    approvalRequired: false,
    escalationRequired: false,
    message: "Demo treasury environment is operating within policy limits.",
    breaches: [],
    metrics: {
      liquidityRatioPercent: 28.4,
      fdConcentrationPercent: 71.6,
      bankExposurePercent: 27,
      reserveCoveragePercent: 248,
    },
  },
},

  demoRecords: [
    {
      id: "DEMO-FD-001",
      bank: "CIMB",
      type: "FD",
      recordType: "FD",
      principal: 36000,
      maturityDate: "2027-03-15",
      status: "ACTIVE",
    },

    {
      id: "DEMO-FD-002",
      bank: "HLB",
      type: "FD",
      recordType: "FD",
      principal: 48000,
      maturityDate: "2027-06-15",
      status: "ACTIVE",
    },

    {
      id: "DEMO-FD-003",
      bank: "PBB",
      type: "FD",
      recordType: "FD",
      principal: 52000,
      maturityDate: "2027-09-15",
      status: "ACTIVE",
    },

    {
      id: "DEMO-FD-004",
      bank: "Maybank",
      type: "FD",
      recordType: "FD",
      principal: 56000,
      maturityDate: "2027-12-15",
      status: "ACTIVE",
    },
  ],

  treasury: {
    liquidityReadiness: 92,
    capitalEfficiency: 88,
    riskPosture: "LOW",
    executionReadiness: 94,
    treasuryStatus: "STABLE",
  },

  governance: {
    governanceStability: 91,
    routingPressure: 18,
    escalationExposure: 12,
    institutionalConfidence: 94,
    runtimeStatus: "STABLE",
  },

  autonomous: {
    autonomousReadiness: 92,
    reasoningConfidence: 94,
    decisionSafety: 96,
    aiMode: "ACTIVE",
    intelligenceStatus: "READY",
  },

  demoEnvironment: {
    mode: "DEMO",
    label: "Institutional Demo Dataset",
    description:
      "Production-grade showcase dataset for Treasury OS V1 Stable Edition.",
  },
};