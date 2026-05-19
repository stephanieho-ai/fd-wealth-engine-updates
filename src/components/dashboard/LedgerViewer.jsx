import React, { useEffect, useMemo, useState } from "react";

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

function getAmount(entry) {
  return Number(entry?.amount || 0);
}

function getSeverity(entry) {
  if (entry.type === "TREASURY_RECOVERY") return "RECOVERED";

  const amount = getAmount(entry);

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

function getQueueStatus(entry) {
  const type = String(entry?.type || "").toUpperCase();
  const amount = getAmount(entry);

  if (type === "TREASURY_RECOVERY") return "RESOLVED";
  if (type === "UNDO") return "REVIEW";
  if (type === "EXECUTE" && amount >= 100000) return "ESCALATED";
  if (type === "EXECUTE" && amount >= 50000) return "READY";
  if (type === "EXECUTE") return "PENDING";

  return "PENDING";
}

function getQueueAction(entry) {
  const type = String(entry?.type || "").toUpperCase();
  const amount = getAmount(entry);

  if (type === "TREASURY_RECOVERY") {
    return "Recovery completed. Monitor liquidity restoration.";
  }

  if (type === "UNDO") {
    return "Review reversal impact and confirm source recovery.";
  }

  if (type === "EXECUTE" && amount >= 100000) {
    return "Escalate for treasury review before next deployment.";
  }

  if (type === "EXECUTE" && amount >= 50000) {
    return "Prepare liquidity routing and confirm maturity coverage.";
  }

  if (type === "EXECUTE") {
    return "Queue for normal treasury monitoring.";
  }

  return "Monitor treasury event.";
}

function getQueuePriority(entry) {
  const status = getQueueStatus(entry);
  const amount = getAmount(entry);

  if (status === "ESCALATED") return 1;
  if (amount >= 100000) return 1;
  if (status === "READY") return 2;
  if (status === "REVIEW") return 3;
  if (status === "PENDING") return 4;
  if (status === "RESOLVED") return 5;

  return 6;
}

function getStatusClass(status) {
  return String(status || "PENDING").toLowerCase();
}

export default function LedgerViewer() {
  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [showAllLedger, setShowAllLedger] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [queueFilter, setQueueFilter] = useState("OPEN");

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

  const latestLedger = useMemo(() => {
    return ledgerEntries.slice().reverse();
  }, [ledgerEntries]);

  const recoveryQueue = useMemo(() => {
    return latestLedger
      .map((entry) => {
        const status = getQueueStatus(entry);

        return {
          ...entry,
          queueStatus: status,
          queueAction: getQueueAction(entry),
          queuePriority: getQueuePriority(entry),
        };
      })
      .sort((a, b) => {
        if (a.queuePriority !== b.queuePriority) {
          return a.queuePriority - b.queuePriority;
        }

        return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
      });
  }, [latestLedger]);

  const openQueue = recoveryQueue.filter(
    (item) => item.queueStatus !== "RESOLVED"
  );

  const filteredQueue =
    queueFilter === "ALL"
      ? recoveryQueue
      : queueFilter === "OPEN"
      ? openQueue
      : recoveryQueue.filter((item) => item.queueStatus === queueFilter);

  const queueSummary = {
    open: openQueue.length,
    escalated: recoveryQueue.filter((item) => item.queueStatus === "ESCALATED")
      .length,
    review: recoveryQueue.filter((item) => item.queueStatus === "REVIEW")
      .length,
    resolved: recoveryQueue.filter((item) => item.queueStatus === "RESOLVED")
      .length,
  };

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
    const queueStatus = getQueueStatus(entry);

    const matchesSearch =
      !keyword ||
      String(entry.recordId || "").toLowerCase().includes(keyword) ||
      String(entry.id || "").toLowerCase().includes(keyword) ||
      String(entry.type || "").toLowerCase().includes(keyword) ||
      String(entry.currency || "").toLowerCase().includes(keyword) ||
      String(entry.amount || "").toLowerCase().includes(keyword) ||
      String(severity || "").toLowerCase().includes(keyword) ||
      String(compliance || "").toLowerCase().includes(keyword) ||
      String(queueStatus || "").toLowerCase().includes(keyword) ||
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
          <p className="eyebrow">Treasury Operating System</p>
          <h2>Recovery Queue Foundation</h2>
          <p className="muted">
            Treasury events are now organized into queue status, recovery
            priority and suggested action.
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

      <div className="treasury-queue-summary">
        <div className="treasury-queue-card">
          <span>Open Queue</span>
          <strong>{queueSummary.open}</strong>
        </div>

        <div className="treasury-queue-card">
          <span>Escalated</span>
          <strong>{queueSummary.escalated}</strong>
        </div>

        <div className="treasury-queue-card">
          <span>Review</span>
          <strong>{queueSummary.review}</strong>
        </div>

        <div className="treasury-queue-card">
          <span>Resolved</span>
          <strong>{queueSummary.resolved}</strong>
        </div>
      </div>

      <div className="treasury-queue-panel">
        <div className="treasury-queue-header">
          <div>
            <p className="eyebrow">Treasury Recovery Queue</p>
            <h3>Orchestration Queue</h3>
          </div>

          <div className="ledger-filter-row">
            {["OPEN", "ESCALATED", "READY", "REVIEW", "RESOLVED", "ALL"].map(
              (item) => (
                <button
                  key={item}
                  className={`ledger-filter-btn ${
                    queueFilter === item ? "ledger-filter-btn-active" : ""
                  }`}
                  onClick={() => setQueueFilter(item)}
                  type="button"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        <div className="treasury-queue-list">
          {!filteredQueue.length ? (
            <div className="ledger-empty">
              No treasury queue items found.
            </div>
          ) : (
            filteredQueue.slice(0, 6).map((entry, index) => {
              const status = entry.queueStatus;
              const statusClass = getStatusClass(status);
              const entryType = String(entry.type || "EVENT").toUpperCase();

              return (
                <div
                  key={`queue-${entry.id || entry.recordId || index}`}
                  className={`treasury-queue-row treasury-queue-${statusClass}`}
                >
                  <div>
                    <span className={`ledger-type-pill ${getTypeClass(entryType)}`}>
                      {entryType === "TREASURY_RECOVERY"
                        ? "RECOVERY"
                        : entryType}
                    </span>

                    <strong className="ledger-record-id">
                      {entry.recordId || entry.id || "-"}
                    </strong>
                  </div>

                  <div>
                    <strong>
                      {entry.currency || "MYR"}{" "}
                      {Number(entry.amount || 0).toLocaleString()}
                    </strong>
                    <p className="muted">{formatLedgerTime(entry.timestamp)}</p>
                  </div>

                  <div>
                    <span
                      className={`treasury-status-pill treasury-status-${statusClass}`}
                    >
                      {status}
                    </span>
                    <p className="muted">{entry.queueAction}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="ledger-search-row">
        <input
          type="text"
          className="ledger-search-input"
          placeholder="Search Record ID / Event ID / Amount / Type / Severity / Compliance / Queue Status"
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
            const queueStatus = getQueueStatus(entry);

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

                <span
                  className={`treasury-status-pill treasury-status-${getStatusClass(
                    queueStatus
                  )}`}
                >
                  {queueStatus}
                </span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}