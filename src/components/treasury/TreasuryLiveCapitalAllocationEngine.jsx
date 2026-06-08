import { useEffect, useMemo, useState } from "react";

const STORAGE_KEYS = [
  "fd_v315_records",
  "fd_v30_records",
  "fd_records",
];

function getRecordsFromStorage() {
  for (const key of STORAGE_KEYS) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;

    try {
      const parsed = JSON.parse(raw);

      if (Array.isArray(parsed)) return parsed;
      if (Array.isArray(parsed.records)) return parsed.records;
    } catch {
      continue;
    }
  }

  return [];
}

function getAmount(record) {
  return Number(
    record.amount ||
      record.principal ||
      record.capital ||
      record.value ||
      0
  );
}

function getType(record) {
  return String(
    record.type ||
      record.recordType ||
      record.category ||
      ""
  ).toUpperCase();
}

function getInstitution(record) {
  return (
    record.bank ||
    record.institution ||
    record.platform ||
    record.provider ||
    "Other Institutions"
  );
}

function formatCurrency(value, currency = "MYR") {
  if (value >= 1000000) {
    return `${currency} ${(value / 1000000).toFixed(2)}M`;
  }

  if (value >= 1000) {
    return `${currency} ${Math.round(value / 1000)}K`;
  }

  return `${currency} ${Math.round(value).toLocaleString()}`;
}

function percent(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

export default function TreasuryLiveCapitalAllocationEngine({
  currency = "MYR",
  records: propRecords = [],
  activeRecords = [],
}) {
  const [storageRecords, setStorageRecords] = useState([]);

  useEffect(() => {
    setStorageRecords(getRecordsFromStorage());

    const refreshData = () => {
      setStorageRecords(getRecordsFromStorage());
    };

    window.addEventListener("storage", refreshData);
    window.addEventListener("focus", refreshData);

    return () => {
      window.removeEventListener("storage", refreshData);
      window.removeEventListener("focus", refreshData);
    };
  }, []);

  const records =
    activeRecords.length > 0
      ? activeRecords
      : propRecords.length > 0
      ? propRecords
      : storageRecords;

  const allocation = useMemo(() => {
    const fdRecords = records.filter((record) => {
      const type = getType(record);
      return type.includes("FD") || type.includes("FIXED");
    });

    const savingsRecords = records.filter((record) => {
      const type = getType(record);
      return type.includes("SAVING");
    });

    const parkingRecords = records.filter((record) => {
      const type = getType(record);
      return type.includes("PARKING") || type.includes("CASH");
    });

    const allocatedCapital = fdRecords.reduce(
      (sum, record) => sum + getAmount(record),
      0
    );

    const savingsCapital = savingsRecords.reduce(
      (sum, record) => sum + getAmount(record),
      0
    );

    const parkingCapital = parkingRecords.reduce(
      (sum, record) => sum + getAmount(record),
      0
    );

    const deployableCapital = savingsCapital + parkingCapital;
    const totalCapital = allocatedCapital + deployableCapital;
    const utilization = percent(allocatedCapital, totalCapital);

    const institutionMap = {};

    fdRecords.forEach((record) => {
      const institution = getInstitution(record);

      institutionMap[institution] =
        (institutionMap[institution] || 0) + getAmount(record);
    });

    const institutionEntries = Object.entries(institutionMap).sort(
      (a, b) => b[1] - a[1]
    );

    const institutionList = institutionEntries
      .slice(0, 4)
      .map(([name, amount]) => {
        return `${name} — ${percent(amount, allocatedCapital)}%`;
      });

    const largestInstitutionAmount =
      institutionEntries.length > 0 ? institutionEntries[0][1] : 0;

    const largestInstitutionLabel =
      institutionEntries.length > 0
        ? `${institutionEntries[0][0]} — ${percent(
            institutionEntries[0][1],
            allocatedCapital
          )}%`
        : "N/A";

    const largestInstitutionPercent = percent(
      largestInstitutionAmount,
      allocatedCapital
    );

    const concentrationRisk =
      largestInstitutionPercent >= 45
        ? "HIGH"
        : largestInstitutionPercent >= 35
        ? "MEDIUM"
        : "LOW";

    const diversificationScore =
      concentrationRisk === "HIGH"
        ? 68
        : concentrationRisk === "MEDIUM"
        ? 82
        : 91;

    return {
      allocatedCapital,
      deployableCapital,
      savingsCapital,
      parkingCapital,
      totalCapital,
      utilization,
      concentrationRisk,
      diversificationScore,
      institutionList,
      largestInstitutionLabel,
      rebalanceRequired:
        concentrationRisk === "HIGH" ? "YES" : "NO",
    };
  }, [records]);

  const metrics = [
    {
      label: "Allocated Capital",
      value: formatCurrency(allocation.allocatedCapital, currency),
    },
    {
      label: "Deployable Capital",
      value: formatCurrency(allocation.deployableCapital, currency),
    },
    {
      label: "Allocation Utilization",
      value: `${allocation.utilization}%`,
    },
    {
      label: "Treasury Status",
      value:
        allocation.concentrationRisk === "HIGH"
          ? "REVIEW"
          : "ACTIVE",
    },
  ];

  const capitalMix = [
    `Fixed Income Allocation — ${percent(
      allocation.allocatedCapital,
      allocation.totalCapital
    )}%`,
    `Liquidity Reserve — ${percent(
      allocation.savingsCapital,
      allocation.totalCapital
    )}%`,
    `Operating Cash — ${percent(
      allocation.parkingCapital,
      allocation.totalCapital
    )}%`,
  ];

  const institutionConcentration =
    allocation.institutionList.length > 0
      ? allocation.institutionList
      : ["No Institution Data"];

  return (
    <section className="treasury-live-allocation-engine">
      <div className="treasury-live-allocation-card">
        <p className="treasury-eyebrow">
          Treasury Capital Monitoring
        </p>

        <h2 className="treasury-section-title">
          Treasury Live Capital Allocation
        </h2>

        <p className="treasury-section-description">
          Dashboard-linked treasury capital visibility across fixed income,
          liquidity reserve, operating cash and institution concentration.
        </p>

        <div className="treasury-live-allocation-grid">
          {metrics.map((item) => (
            <div
              className="treasury-live-metric"
              key={item.label}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="treasury-allocation-columns">
          <div className="treasury-allocation-panel">
            <h3>Capital Mix</h3>

            <ul>
              {capitalMix.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="treasury-allocation-panel">
            <h3>Institution Concentration</h3>

            <ul>
              {institutionConcentration.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="treasury-concentration-summary">
              <div className="treasury-summary-item">
                <span>Largest Institution</span>
                <strong>{allocation.largestInstitutionLabel}</strong>
              </div>

              <div className="treasury-summary-item">
                <span>Diversification Score</span>
                <strong>{allocation.diversificationScore}%</strong>
              </div>

              <div className="treasury-summary-item">
                <span>Concentration Risk</span>
                <strong>{allocation.concentrationRisk}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="treasury-allocation-action">
          <div>
            <span className="allocation-status">
              {allocation.concentrationRisk === "HIGH"
                ? "Allocation Review Required"
                : "Allocation Balanced"}
            </span>

            <h3>Live Allocation Status</h3>

            <p>
              Treasury allocation is linked to dashboard records.
              Capital distribution is calculated from current portfolio
              data and displayed using the active workspace currency.
            </p>
          </div>

          <div className="treasury-allocation-status-grid">
            <div>
              <span>Diversification Score</span>
              <strong>{allocation.diversificationScore}%</strong>
            </div>

            <div>
              <span>Concentration Risk</span>
              <strong>{allocation.concentrationRisk}</strong>
            </div>

            <div>
              <span>Rebalance Required</span>
              <strong>{allocation.rebalanceRequired}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}