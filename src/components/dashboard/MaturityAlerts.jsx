import "../../styles/dashboard/maturity-alerts.css";

function getAmount(record) {
  return Number(record?.principal ?? record?.amount ?? 0);
}

function getMaturityDate(record) {
  return record?.maturityDate || record?.maturity_date || "";
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

function getMonthLabel(dateString) {
  if (!dateString) return "LADDER";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "LADDER";

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatMoney(value, currency = "MYR") {
  const amount = Number(value || 0);

  return `${currency} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function getTimelineLabel(daysLeft) {
  if (daysLeft < 0) return "Overdue";
  if (daysLeft === 0) return "Due Today";
  if (daysLeft === 1) return "1 Day";
  if (daysLeft <= 3) return "3 Days";
  if (daysLeft <= 5) return "5 Days";
  if (daysLeft <= 7) return "7 Days";
  if (daysLeft <= 14) return "14 Days";
  return null;
}

function getSeverity(daysLeft) {
  if (daysLeft < 0 || daysLeft === 0) return "critical";
  if (daysLeft <= 3) return "high";
  if (daysLeft <= 7) return "medium";
  return "low";
}

export default function MaturityAlerts({ records = [], currency = "MYR" }) {
  const safeRecords = Array.isArray(records) ? records : [];

  const isDemoDataset = safeRecords.some((record) =>
    String(record?.id || "").startsWith("DEMO-FD")
  );

  const demoMaturityRows = safeRecords
    .filter((record) => {
      const type = String(record?.recordType || record?.type || "FD")
        .toUpperCase()
        .replace(/\s+/g, "_");

      const status = String(record?.status || "ACTIVE").toUpperCase();

      return type === "FD" && status !== "CLOSED";
    })
    .sort((a, b) => {
      return new Date(getMaturityDate(a)) - new Date(getMaturityDate(b));
    });

  const maturityAlerts = safeRecords
    .filter((record) => {
      const type = String(record?.recordType || record?.type || "FD")
        .toUpperCase()
        .replace(/\s+/g, "_");

      const status = String(record?.status || "ACTIVE").toUpperCase();

      return type === "FD" && status !== "CLOSED";
    })
    .map((record) => {
      const daysLeft = getDaysLeft(getMaturityDate(record));
      const timeline = daysLeft !== null ? getTimelineLabel(daysLeft) : null;
      const severity = daysLeft !== null ? getSeverity(daysLeft) : "low";

      return {
        ...record,
        daysLeft,
        timeline,
        severity,
      };
    })
    .filter((record) => record.timeline)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const nextMajorMaturity = maturityAlerts.reduce((largest, current) => {
    return getAmount(current) > getAmount(largest) ? current : largest;
  }, maturityAlerts[0]);

  return (
    <section className="dashboard-section maturity-alerts treasury-workstation-card">
      <div className="section-header workstation-header">
        <div>
          <p className="eyebrow">TREASURY MATURITY</p>
          <h2>FD Maturity Command</h2>
          <p className="muted">
            {isDemoDataset
              ? "Institutional maturity ladder showcase dataset."
              : "Upcoming maturity queue and recovery capital."}
          </p>
        </div>

        <div className="score-card score-card-mini">
          <span>{isDemoDataset ? "Ladder" : "Alerts"}</span>
          <strong>{isDemoDataset ? demoMaturityRows.length : maturityAlerts.length}</strong>
        </div>
      </div>

      {isDemoDataset ? (
        <>
          <div className="maturity-table">
            {demoMaturityRows.slice(0, 4).map((record) => (
              <div
                key={record.id || record.generationId || record.maturityDate}
                className="maturity-row maturity-low"
              >
                <span className="maturity-badge">
                  {getMonthLabel(getMaturityDate(record))}
                </span>

                <div className="maturity-main">
                  <strong>{record.id || record.generationId || "FD"}</strong>
                  <small>
                    {record.bank || "Bank"} · {getMaturityDate(record)}
                  </small>
                </div>

                <div className="maturity-meta">
                  <strong>Ladder Active</strong>
                  <small>{formatMoney(getAmount(record), currency)}</small>
                </div>
              </div>
            ))}
          </div>

          {demoMaturityRows[0] && (
            <div className="next-major-strip">
              <span>NEXT LADDER</span>
              <strong>{demoMaturityRows[0].bank || "Bank"}</strong>
              <strong>{formatMoney(getAmount(demoMaturityRows[0]), currency)}</strong>
              <strong>{getMaturityDate(demoMaturityRows[0])}</strong>
            </div>
          )}
        </>
      ) : !maturityAlerts.length ? (
        <div className="empty-state empty-state-mini">
          No upcoming maturity events.
        </div>
      ) : (
        <>
          <div className="maturity-table">
            {maturityAlerts.slice(0, 4).map((record) => (
              <div
                key={record.id || record.generationId || record.maturityDate}
                className={`maturity-row maturity-${record.severity}`}
              >
                <span className="maturity-badge">{record.timeline}</span>

                <div className="maturity-main">
                  <strong>{record.id || record.generationId || "FD"}</strong>
                  <small>
                    {record.bank || "Bank"} · {getMaturityDate(record)}
                  </small>
                </div>

                <div className="maturity-meta">
                  <strong>
                    {record.daysLeft < 0
                      ? `${Math.abs(record.daysLeft)}D overdue`
                      : record.daysLeft === 0
                      ? "Due today"
                      : `${record.daysLeft}D left`}
                  </strong>
                  <small>{formatMoney(getAmount(record), currency)}</small>
                </div>
              </div>
            ))}
          </div>

          {nextMajorMaturity && (
            <div className="next-major-strip">
              <span>NEXT MAJOR</span>
              <strong>{nextMajorMaturity.bank || "Bank"}</strong>
              <strong>{formatMoney(getAmount(nextMajorMaturity), currency)}</strong>
              <strong>{getMaturityDate(nextMajorMaturity)}</strong>
            </div>
          )}
        </>
      )}
    </section>
  );
}