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
  const amount = Number(entry.amount || 0);

  if (amount >= 100000) return "CRITICAL";
  if (amount >= 50000) return "HIGH";
  if (amount >= 20000) return "MEDIUM";

  return "LOW";
}

function getComplianceTag(entry) {
  if (entry.type === "UNDO") return "REVERSAL";
  if (entry.type === "EXECUTE") return "AUTO";

  return "SYSTEM";
}

function getEscalationLabel(severity) {
  if (severity === "CRITICAL") return "Compliance Escalation";
  if (severity === "HIGH") return "Treasury Warning";
  if (severity === "MEDIUM") return "Operational Attention";

  return "Normal Activity";
}

function getRiskInsight(entry) {
  const severity = getSeverity(entry);
  const escalation = getEscalationLabel(severity);

  if (entry.type === "UNDO") {
    return `${severity} risk reversal event. ${escalation}. Capital was returned to liquidity source after an execution rollback.`;
  }

  if (entry.type === "EXECUTE") {
    return `${severity} risk system-generated deployment event. ${escalation}. Capital was automatically deployed into an FD execution record.`;
  }

  return `${severity} risk system ledger event recorded for audit visibility. ${escalation}.`;
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

  const filteredLedger = latestLedger.filter((entry) => {
    const matchesType = filter === "ALL" ? true : entry.type === filter;

    const keyword = searchTerm.trim().toLowerCase();
    const severity = getSeverity(entry);
    const compliance = getComplianceTag(entry);
    const escalation = getEscalationLabel(severity);
    const insight = getRiskInsight(entry);

    const matchesSearch =
      !keyword ||
      String(entry.recordId || "").toLowerCase().includes(keyword) ||
      String(entry.id || "").toLowerCase().includes(keyword) ||
      String(entry.type || "").toLowerCase().includes(keyword) ||
      String(entry.currency || "").toLowerCase().includes(keyword) ||
      String(entry.amount || "").toLowerCase().includes(keyword) ||
      String(severity || "").toLowerCase().includes(keyword) ||
      String(compliance || "").toLowerCase().includes(keyword) ||
      String(escalation || "").toLowerCase().includes(keyword) ||
      String(insight || "").toLowerCase().includes(keyword);

    return matchesType && matchesSearch;
  });

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
          <p className="muted">No matching ledger entries found.</p>
        ) : (
          visibleLedger.map((entry, index) => {
            const severity = getSeverity(entry);
            const compliance = getComplianceTag(entry);
            const escalation = getEscalationLabel(severity);
            const riskInsight = getRiskInsight(entry);
            const severityClass = severity.toLowerCase();

            return (
              <div
                key={entry.id || index}
                className={`projection-card ledger-entry ledger-entry-${severityClass} ${
                  index === 0 ? "latest-ledger-entry" : ""
                }`}
              >
                <div className={`ledger-escalation-strip ledger-escalation-${severityClass}`}>
                  {escalation}
                </div>

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
                      {entry.currency}{" "}
                      {Number(entry.amount || 0).toLocaleString()}
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

                  <div>
                    <span>Severity</span>
                    <strong
                      className={`ledger-severity ledger-severity-${severityClass}`}
                    >
                      {severity}
                    </strong>
                  </div>

                  <div>
                    <span>Compliance</span>
                    <strong className="ledger-compliance-tag">
                      {compliance}
                    </strong>
                  </div>
                </div>

                <div className={`ledger-insight-box ledger-insight-${severityClass}`}>
                  <span>Risk Insight</span>
                  <p>{riskInsight}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}