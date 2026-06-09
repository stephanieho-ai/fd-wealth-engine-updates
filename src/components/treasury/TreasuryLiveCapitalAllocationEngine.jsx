import { useEffect, useMemo, useState } from "react";

const STORAGE_KEYS = ["fd_v315_records", "fd_v30_records", "fd_records"];

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
      .map(([name, amount]) => ({
        label: name,
        value: `${percent(amount, allocatedCapital)}%`,
      }));

    const largestInstitutionAmount =
      institutionEntries.length > 0 ? institutionEntries[0][1] : 0;

    const largestInstitutionName =
      institutionEntries.length > 0 ? institutionEntries[0][0] : "N/A";

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
      largestInstitutionName,
      largestInstitutionPercent,
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
      label: "Utilization",
      value: `${allocation.utilization}%`,
    },
    {
      label: "Treasury Status",
      value: allocation.concentrationRisk === "HIGH" ? "REVIEW" : "ACTIVE",
    },
  ];

  const capitalMix = [
    {
      label: "Fixed Income",
      value: `${percent(allocation.allocatedCapital, allocation.totalCapital)}%`,
    },
    {
      label: "Liquidity Reserve",
      value: `${percent(allocation.savingsCapital, allocation.totalCapital)}%`,
    },
    {
      label: "Operating Cash",
      value: `${percent(allocation.parkingCapital, allocation.totalCapital)}%`,
    },
  ];

  const institutionConcentration =
    allocation.institutionList.length > 0
      ? allocation.institutionList
      : [{ label: "No Institution Data", value: "0%" }];

  const statusMetrics = [
    {
      label: "Largest Institution",
      value:
        allocation.largestInstitutionName === "N/A"
          ? "N/A"
          : `${allocation.largestInstitutionName} ${allocation.largestInstitutionPercent}%`,
    },
    {
      label: "Diversification",
      value: `${allocation.diversificationScore}%`,
    },
    {
      label: "Risk",
      value: allocation.concentrationRisk,
    },
    {
      label: "Rebalance",
      value: allocation.rebalanceRequired,
    },
  ];

  const reviewRequired = allocation.concentrationRisk === "HIGH";

  return (
    <section className="treasury-live-allocation-engine">
      <div className="treasury-live-allocation-card">
        <div className="treasury-live-allocation-header">
          <div>
            <p className="treasury-eyebrow">
              Treasury Strategy Command Wall
            </p>

            <h2 className="treasury-section-title">
              Treasury Live Capital Allocation
            </h2>

            <p className="treasury-section-description">
              Dashboard-linked allocation command layer monitoring capital mix,
              deployable liquidity, utilization and institution exposure.
            </p>
          </div>

          <div className="treasury-live-status-block">
            <span>Allocation Status</span>
            <strong>{reviewRequired ? "REVIEW" : "BALANCED"}</strong>
          </div>
        </div>

        <div className="treasury-live-allocation-grid">
          {metrics.map((item) => (
            <div className="treasury-live-metric" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="treasury-allocation-command-grid">
          <div className="treasury-allocation-panel">
            <div className="allocation-panel-header">
              <span>Capital Mix</span>
              <strong>Live Structure</strong>
            </div>

            <div className="treasury-compact-list">
              {capitalMix.map((item) => (
                <div className="treasury-compact-row" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="treasury-allocation-panel">
            <div className="allocation-panel-header">
              <span>Institution Concentration</span>
              <strong>Exposure Map</strong>
            </div>

            <div className="treasury-compact-list">
              {institutionConcentration.map((item) => (
                <div className="treasury-compact-row" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="treasury-live-status-strip">
          {statusMetrics.map((item) => (
            <div className="treasury-live-status-item" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="treasury-live-command-bar">
          <div>
            <span>Final Allocation Command</span>
            <strong>
              {reviewRequired
                ? "Review Institution Concentration"
                : "Maintain Balanced Allocation"}
            </strong>
          </div>

          <p>
            {reviewRequired
              ? "Institution exposure requires treasury review before further capital deployment."
              : "Capital allocation remains balanced and aligned with treasury liquidity discipline."}
          </p>

          <button type="button">
            {reviewRequired ? "Review Ready" : "Command Ready"}
          </button>
        </div>
      </div>
    </section>
  );
}