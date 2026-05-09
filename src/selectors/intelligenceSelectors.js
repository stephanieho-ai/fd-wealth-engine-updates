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