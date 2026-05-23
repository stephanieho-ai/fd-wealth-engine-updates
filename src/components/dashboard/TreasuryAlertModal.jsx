export default function TreasuryAlertModal({ alert, onClose, onAction }) {
  if (!alert) return null;

  const handleAction = (action, payload = alert) => {
    if (typeof onAction === "function") {
      onAction(action, payload);
    }
  };

  const formatRecordCode = (value) => {
    return String(value || "-")
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="treasury-modal-backdrop" onClick={onClose}>
      <div
        className="treasury-modal-card treasury-modal-wide"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="treasury-modal-header">
          <div>
            <p className="eyebrow">Treasury Command Center</p>
            <h2>{alert.title || "Treasury Alert"}</h2>
          </div>

          <button
            type="button"
            className="treasury-modal-close"
            onClick={onClose}
            aria-label="Close treasury command view"
          >
            ×
          </button>
        </div>

        <div className={`treasury-modal-status ${alert.level || "info"}`}>
          {alert.label || "Treasury Alert"}
        </div>

        {alert.message && (
          <p className="treasury-modal-message">{alert.message}</p>
        )}

        {alert.metrics?.length > 0 && (
          <div className="treasury-modal-metrics">
            {alert.metrics.map((metric) => (
              <div key={metric.label} className="treasury-modal-metric">
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
        )}

        {alert.records?.length > 0 && (
          <div className="treasury-modal-records">
            <h3>Affected Records</h3>

            {alert.records.map((record, index) => (
              <button
                key={record.id || record.code || `${record.label}-${index}`}
                type="button"
                className="treasury-modal-record-row treasury-modal-clickable-row treasury-modal-clean-record-row"
                onClick={() => handleAction("OPEN_RECORD", record)}
              >
                <strong className="treasury-modal-record-code">
                  {formatRecordCode(record.id || record.code || record.policy)}
                </strong>

                <span className="treasury-modal-record-label">
                  {record.bank || record.label || record.title || "-"}
                </span>

                <span className="treasury-modal-record-date">
                  {record.date || record.severity || "-"}
                </span>

                <b className="treasury-modal-record-message">
                  {record.amount || record.message || "-"}
                </b>
              </button>
            ))}
          </div>
        )}

        {alert.actions?.length > 0 && (
          <div className="treasury-modal-actions">
            {alert.actions.map((action) => (
              <button
                key={action}
                type="button"
                className="treasury-modal-action treasury-modal-action-button"
                onClick={() => handleAction(action, alert)}
              >
                {action}
              </button>
            ))}
          </div>
        )}

        <button type="button" className="primary-button" onClick={onClose}>
          Close Command View
        </button>
      </div>
    </div>
  );
}