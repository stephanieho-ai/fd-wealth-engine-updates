// src/selectors/intelligenceSelectors.js

const toNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const isActiveFD = (record) => {
  return (
    record?.status !== "CLOSED" &&
    record?.recordType === "FD" &&
    record?.maturityDate
  );
};

const getMonthKey = (dateString) => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toISOString().slice(0, 7);
};

export const getMonthlyMaturityMap = (records = []) => {
  const map = {};

  records.filter(isActiveFD).forEach((record) => {
    const monthKey = getMonthKey(record.maturityDate);
    if (monthKey === "Unknown") return;

    if (!map[monthKey]) {
      map[monthKey] = {
        month: monthKey,
        totalPrincipal: 0,
        count: 0,
        records: [],
      };
    }

    map[monthKey].totalPrincipal += toNumber(record.principal);
    map[monthKey].count += 1;
    map[monthKey].records.push(record);
  });

  return map;
};

export const getStrongestMonth = (records = []) => {
  const map = getMonthlyMaturityMap(records);
  const months = Object.values(map);

  if (!months.length) {
    return {
      month: "No FD",
      totalPrincipal: 0,
      count: 0,
    };
  }

  return months.sort((a, b) => b.totalPrincipal - a.totalPrincipal)[0];
};

export const getWeakestMonth = (records = []) => {
  const map = getMonthlyMaturityMap(records);
  const months = Object.values(map);

  if (!months.length) {
    return {
      month: "No FD",
      totalPrincipal: 0,
      count: 0,
    };
  }

  return months.sort((a, b) => a.totalPrincipal - b.totalPrincipal)[0];
};

export const getIdleCash = (records = []) => {
  return records
    .filter(
      (record) =>
        record?.status !== "CLOSED" &&
        (record?.recordType === "Savings" ||
          record?.recordType === "Parking Cash")
    )
    .reduce((sum, record) => sum + toNumber(record.principal), 0);
};

export const getDeployableFunds = (records = []) => {
  return getIdleCash(records);
};

export const getBestOffer = (offers = []) => {
  const activeOffers = offers.filter(
    (offer) => offer?.status === "ACTIVE"
  );

  if (!activeOffers.length) {
    return null;
  }

  return activeOffers.sort(
    (a, b) => toNumber(b.ratePa) - toNumber(a.ratePa)
  )[0];
};

export const getIntelligenceSummary = (records = [], offers = []) => {
  const strongestMonth = getStrongestMonth(records);
  const weakestMonth = getWeakestMonth(records);
  const idleCash = getIdleCash(records);
  const deployableFunds = getDeployableFunds(records);
  const bestOffer = getBestOffer(offers);

  return {
    strongestMonth,
    weakestMonth,
    idleCash,
    deployableFunds,
    bestOffer,
    liquidityBuffer: idleCash * 0.2,
  };
};
export function getCapitalHealthScore({
  fdAllocationRatio = 0,
  liquidityRatio = 0,
  reserveRatio = 0,
  deployableNow = 0,
}) {
  let score = 100;
  const reasons = [];

  if (fdAllocationRatio >= 90) {
    score -= 25;
    reasons.push("FD allocation is above 90%, which means portfolio is highly FD-focused.");
  } else if (fdAllocationRatio >= 80) {
    score -= 15;
    reasons.push("FD allocation is above 80%, showing strong fixed-deposit concentration.");
  } else if (fdAllocationRatio >= 70) {
    score -= 8;
    reasons.push("FD allocation is above 70%, but still within manageable range.");
  }

  if (liquidityRatio <= 5) {
    score -= 20;
    reasons.push("Liquidity ratio is below 5%, meaning immediately deployable cash is low.");
  } else if (liquidityRatio <= 10) {
    score -= 10;
    reasons.push("Liquidity ratio is below 10%, so cash flexibility is limited.");
  }

  if (reserveRatio >= 10) {
    score += 5;
    reasons.push("Reserve protection is above 10%, giving the portfolio a stronger liquidity buffer.");
  } else {
    reasons.push("Reserve protection is below 10%, so protected cash buffer is still limited.");
  }

  if (deployableNow >= 10000) {
    score += 5;
    reasons.push("Deployable funds are available for future FD opportunities.");
  } else {
    reasons.push("Deployable funds are below 10,000, so execution flexibility is limited.");
  }

  score = Math.max(0, Math.min(100, score));

  let label = "Healthy";
  if (score < 75) label = "Moderate";
  if (score < 55) label = "Aggressive";
  if (score < 35) label = "Risky";

  return {
    score,
    label,
    reasons,
  };
}   