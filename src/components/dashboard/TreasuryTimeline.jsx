import { useState } from "react";
import "../../styles/dashboard/treasury-timeline.css";

function getMaturityDate(record) {
  return record?.maturityDate || record?.maturity_date || "";
}

function getAmount(record) {
  return Number(record?.principal ?? record?.amount ?? 0);
}

function getDaysLeft(dateString) {
  if (!dateString) return null;

  const today = new Date();
  const target = new Date(dateString);

  if (Number.isNaN(target.getTime())) return null;

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  return Math.ceil((target - today) / 86400000);
}

function formatMoney(value, currency = "MYR") {
  return `${currency} ${Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export default function TreasuryTimeline({ records = [], currency = "MYR" }) {
  const [showAll, setShowAll] = useState(false);

  const timelineRecords = records
    .filter((record) => {
      const type = String(record?.recordType || record?.type || "FD")
        .toUpperCase()
        .replace(/\s+/g, "_");

      const status = String(record?.status || "ACTIVE").toUpperCase();

      return type === "FD" && status !== "CLOSED";
    })
    .map((record) => {
      const daysLeft = getDaysLeft(getMaturityDate(record));

      return {
        ...record,
        daysLeft,
      };
    })
    .filter((record) => record.daysLeft !== null)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const visibleTimelineRecords = showAll
    ? timelineRecords
    : timelineRecords.slice(0, 5);

  return (
    <section className="dashboard-section treasury-timeline">
      <div className="section-header">
        <div>
          <p className="eyebrow">Treasury Operations Timeline</p>
          <h2>Treasury Timeline</h2>
          <p className="muted">
            Monitor upcoming maturity liquidity horizon and treasury cash flow timing.
          </p>
        </div>

        <div className="score-card">
          <span>Active FD Timeline</span>
          <strong>{timelineRecords.length}</strong>
        </div>
      </div>

      <div className="timeline-list">
        {visibleTimelineRecords.map((record) => {
          let level = "future";

          if (record.daysLeft < 0) {
            level = "overdue";
          } else if (record.daysLeft <= 3) {
            level = "urgent";
          } else if (record.daysLeft <= 14) {
            level = "upcoming";
          }

          return (
            <div key={record.id} className={`timeline-row timeline-${level}`}>
              <div className="timeline-days">
                {record.daysLeft < 0
                  ? `${Math.abs(record.daysLeft)}D`
                  : `${record.daysLeft}D`}
              </div>

              <div className="timeline-content">
                <strong>{record.id || "FD"}</strong>
                <p>
                  {record.bank || "Bank"} · {getMaturityDate(record)}
                </p>
              </div>

              <div className="timeline-amount">
                {formatMoney(getAmount(record), currency)}
              </div>
            </div>
          );
        })}
      </div>

      {timelineRecords.length > 5 && (
        <button
          type="button"
          className="secondary-button timeline-toggle-button"
          onClick={() => setShowAll((value) => !value)}
        >
          {showAll ? "Show Less" : `Show All ${timelineRecords.length} Maturities →`}
        </button>
      )}
    </section>
  );
}