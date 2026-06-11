const demoTreasuryData = {
  environment: "DEMO",
  title: "Treasury Demo Environment",

  liquidity: {
    totalLiquidity: "RM 2.8M",
    deployableCash: "RM 740K",
    liquidityStatus: "STABLE",
    liquidityScore: 94,
  },

  risk: {
    exposureLevel: "LOW",
    exposureScore: 18,
    pressureTrend: "CONTROLLED",
    riskSignal: "NORMAL",
  },

  governance: {
    status: "SYNCHRONIZED",
    confidence: 95,
    authorityState: "ACTIVE",
    approvalReadiness: "READY",
  },

  runtime: {
    status: "STABLE",
    stabilityScore: 96,
    resilienceScore: 93,
    confidence: 94,
  },

  operator: {
    mode: "SIMULATION",
    actionState: "DEMO ACTION ONLY",
    executionImpact: "NO LIVE DATA AFFECTED",
  },
};

export default demoTreasuryData;