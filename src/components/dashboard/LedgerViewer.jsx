import React, { useEffect, useState } from "react";

function formatLedgerTime(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getSeverity(entry) {
  if (entry.type === "TREASURY_RECOVERY") return "RECOVERED";

  const amount = Number(entry.amount || 0);

  if (amount >= 100000) return "CRITICAL";
  if (amount >= 50000) return "HIGH";
  if (amount >= 20000) return "MEDIUM";

  return "LOW";
}

function getComplianceTag(entry) {
  if (entry.type === "TREASURY_RECOVERY") return "SYSTEM";
  if (entry.type === "UNDO") return "REVERSAL";
  if (entry.type === "EXECUTE") return "AUTO";

  return "SYSTEM";
}

function getTypeClass(type) {
  if (type === "TREASURY_RECOVERY") return "ledger-type-recovery";
  if (type === "EXECUTE") return "ledger-type-execute";
  if (type === "UNDO") return "ledger-type-undo";

  return "ledger-type-system";
}

export default function LedgerViewer() {
  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [showAllLedger, setShowAllLedger] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadLedger = () => {
      try {
        const savedLedger =
          JSON.parse(localStorage.getItem("fd_immutable_ledger")) || [];

        setLedgerEntries(Array.isArray(savedLedger) ? savedLedger : []);
      } catch (error) {
        console.error("Failed to load immutable ledger:", error);
        setLedgerEntries([]);
      }
    };

    loadLedger();

    window.addEventListener("ledgerUpdated", loadLedger);

    return () => {
      window.removeEventListener("ledgerUpdated", loadLedger);
    };
  }, []);

  const latestLedger = ledgerEntries.slice().reverse();

  const filteredLedger = latestLedger.filter((entry) => {
    const entryType = String(entry?.type || "").toUpperCase();

    const matchesType =
      filter === "ALL"
        ? true
        : filter === "RECOVERY"
        ? entryType === "TREASURY_RECOVERY"
        : entryType === filter;

    const keyword = searchTerm.trim().toLowerCase();
    const severity = getSeverity(entry);
    const compliance = getComplianceTag(entry);

    const matchesSearch =
      !keyword ||
      String(entry.recordId || "").toLowerCase().includes(keyword) ||
      String(entry.id || "").toLowerCase().includes(keyword) ||
      String(entry.type || "").toLowerCase().includes(keyword) ||
      String(entry.currency || "").toLowerCase().includes(keyword) ||
      String(entry.amount || "").toLowerCase().includes(keyword) ||
      String(severity || "").toLowerCase().includes(keyword) ||
      String(compliance || "").toLowerCase().includes(keyword) ||
      String(entry.note || "").toLowerCase().includes(keyword);

    return matchesType && matchesSearch;
  });

  const visibleLedger = showAllLedger
    ? filteredLedger
    : filteredLedger.slice(0, 5);

  return (
    <section className="dashboard-section ledger-viewer-panel">
      <div className="ledger-header">
        <div>
          <p className="eyebrow">Immutable Ledger</p>
          <h2>Ledger Viewer</h2>
          <p className="muted">
            Permanent treasury execution, undo and recovery history.
          </p>
        </div>

        <div className="ledger-filter-row">
          {["ALL", "EXECUTE", "UNDO", "RECOVERY"].map((item) => (
            <button
              key={item}
              className={`ledger-filter-btn ${
                filter === item ? "ledger-filter-btn-active" : ""
              }`}
              onClick={() => {
                setFilter(item);
                setShowAllLedger(false);
              }}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="ledger-search-row">
        <input
          type="text"
          className="ledger-search-input"
          placeholder="Search Record ID / Event ID / Amount / Type / Severity / Compliance"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setShowAllLedger(false);
          }}
        />

        {filteredLedger.length > 5 && (
          <button
            className="ledger-show-button"
            type="button"
            onClick={() => setShowAllLedger(!showAllLedger)}
          >
            {showAllLedger
              ? "Show Less"
              : `Show All ${filteredLedger.length} Ledger Events`}
          </button>
        )}
      </div>

      <div className="ledger-table-list">
        {!filteredLedger.length ? (
          <div className="ledger-empty">
            No matching ledger entries found.
          </div>
        ) : (
          visibleLedger.map((entry, index) => {
            const severity = getSeverity(entry);
            const compliance = getComplianceTag(entry);
            const severityClass = severity.toLowerCase();
            const entryType = String(entry.type || "EVENT").toUpperCase();

            return (
              <div
                key={entry.id || `${entry.recordId}-${index}`}
                className={`ledger-table-row ledger-row-${severityClass} ${
                  entryType === "TREASURY_RECOVERY"
                    ? "ledger-row-recovery"
                    : ""
                }`}
              >
                <span className={`ledger-pill ledger-pill-${severityClass}`}>
                  {severity}
                </span>

                <span className={`ledger-type-pill ${getTypeClass(entryType)}`}>
                  {entryType === "TREASURY_RECOVERY"
                    ? "RECOVERY"
                    : entryType}
                </span>

                <strong className="ledger-record-id">
                  {entry.recordId || "-"}
                </strong>

                <strong className="ledger-amount">
                  {entry.currency || "MYR"}{" "}
                  {Number(entry.amount || 0).toLocaleString()}
                </strong>

                <span className="ledger-time">
                  {formatLedgerTime(entry.timestamp)}
                </span>

                <span className="ledger-compliance">
                  {compliance}
                </span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}