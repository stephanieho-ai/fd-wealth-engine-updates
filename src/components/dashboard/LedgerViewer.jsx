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

export default function LedgerViewer() {
  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [showAllLedger, setShowAllLedger] = useState(false);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const loadLedger = () => {
      try {
        const savedLedger =
          JSON.parse(localStorage.getItem("fd_immutable_ledger")) || [];

        setLedgerEntries(savedLedger);
      } catch (error) {
        console.error("Failed to load immutable ledger:", error);
      }
    };

    loadLedger();

    window.addEventListener("ledgerUpdated", loadLedger);

    return () => {
      window.removeEventListener("ledgerUpdated", loadLedger);
    };
  }, []);

  const latestLedger = ledgerEntries.slice().reverse();

  const filteredLedger =
    filter === "ALL"
      ? latestLedger
      : latestLedger.filter((entry) => entry.type === filter);

  const visibleLedger = showAllLedger
    ? filteredLedger
    : filteredLedger.slice(0, 3);

  return (
    <section className="projection-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Immutable Ledger</p>

          <h3>Ledger Viewer</h3>

          <div className="ledger-filter-row">
            {["ALL", "EXECUTE", "UNDO"].map((item) => (
              <button
                key={item}
                className={`ledger-filter-btn ${
                  filter === item ? "ledger-filter-btn-active" : ""
                }`}
                onClick={() => {
                  setFilter(item);
                  setShowAllLedger(false);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredLedger.length > 3 && (
        <button
          className="secondary-button"
          onClick={() => setShowAllLedger(!showAllLedger)}
        >
          {showAllLedger ? "Show Less" : "Show All Ledger"}
        </button>
      )}

      <div className="projection-list">
        {!filteredLedger.length ? (
          <p className="muted">No ledger entries found.</p>
        ) : (
          visibleLedger.map((entry, index) => (
            <div
              key={entry.id || index}
              className={`projection-card ledger-entry ${
                index === 0 ? "latest-ledger-entry" : ""
              }`}
            >
              <p className="ledger-sequence">
                #{String(filteredLedger.length - index).padStart(4, "0")}
              </p>

              <span
                className={`ledger-badge ${
                  entry.type === "EXECUTE"
                    ? "ledger-badge-execute"
                    : "ledger-badge-undo"
                }`}
              >
                {entry.type}
              </span>

              <div className="ledger-meta-grid">
                <div>
                  <span>Amount</span>
                  <strong>
                    {entry.currency} {Number(entry.amount || 0).toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Record ID</span>
                  <strong>{entry.recordId || "-"}</strong>
                </div>

                <div>
                  <span>Event ID</span>
                  <strong>{entry.id || "-"}</strong>
                </div>

                <div>
                  <span>Timestamp</span>
                  <strong>{formatLedgerTime(entry.timestamp)}</strong>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}