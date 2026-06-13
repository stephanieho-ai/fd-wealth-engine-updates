import "../../styles/dashboard/audit-trail.css";
import { useEffect, useMemo, useState } from "react";

const AUDIT_STORAGE_KEY = "fd_execution_history";

function formatMoney(value, currency = "MYR") {
  const amount = Number(value || 0);

  return `${currency} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export default function AuditTrail() {
  const [filter, setFilter] = useState("ALL");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handleAuditUpdated = () => {
      setRefreshKey((key) => key + 1);
    };

    window.addEventListener("auditTrailUpdated", handleAuditUpdated);

    return () => {
      window.removeEventListener("auditTrailUpdated", handleAuditUpdated);
    };
  }, []);

  const auditTrail = useMemo(() => {
    try {
      const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];

      return Array.isArray(parsed)
        ? parsed.slice().reverse()
        : [];
    } catch (error) {
      console.error("AuditTrail load failed:", error);
      return [];
    }
  }, [refreshKey]);

  const filteredAuditTrail = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);

    return auditTrail.filter((item) => {
      if (filter === "ALL") return true;

      if (filter === "TODAY") {
        return String(item?.timestamp || "").startsWith(today);
      }

      return String(item?.type || "").toUpperCase() === filter;
    });
  }, [auditTrail, filter]);

  const latestEvent = filteredAuditTrail[0];

  return (
    <section className="dashboard-section audit-trail treasury-workstation-card">
      <div className="section-header workstation-header">
        <div>
          <p className="eyebrow">EXECUTION GOVERNANCE</p>
          <h2>Audit Trail</h2>
          <p className="muted">
            Execution history and governance tracking.
          </p>
        </div>
      </div>

      <div className="filter-row">
        {["ALL", "EXECUTE", "UNDO", "TODAY"].map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}

        <button
          type="button"
          className="danger-chip"
          onClick={() => {
            localStorage.removeItem(AUDIT_STORAGE_KEY);

            setFilter("ALL");

            window.dispatchEvent(
              new Event("auditTrailUpdated")
            );
          }}
        >
          CLEAR
        </button>
      </div>

      {!latestEvent ? (
        <div className="audit-empty-workstation">
          No audit events recorded.
        </div>
      ) : (
        <div className="audit-latest-event">
          <div>
            <span>Latest Event</span>

            <strong>
              {latestEvent.type || "EVENT"}
            </strong>
          </div>

          <div>
            <span>Amount</span>

            <strong>
              {latestEvent.amount
                ? formatMoney(
                    latestEvent.amount,
                    latestEvent.currency || "MYR"
                  )
                : "-"}
            </strong>
          </div>

          <div>
            <span>Timestamp</span>

            <strong>
              {latestEvent.timestamp || "-"}
            </strong>
          </div>
        </div>
      )}
    </section>
  );
}