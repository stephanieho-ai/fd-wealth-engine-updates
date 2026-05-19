function getSummaryIcon(label = "") {
  const key = label.toLowerCase();

  if (key.includes("portfolio")) return "wallet";
  if (key.includes("alert")) return "bell";
  if (key.includes("health")) return "pulse";
  if (key.includes("policy")) return "shield";

  return "circle";
}

function SummaryIcon({ type }) {
  if (type === "wallet") {
    return (
      <svg viewBox="0 0 24 24" className="summary-icon-svg">
        <path d="M4 7h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Z" />
        <path d="M16 12h5" />
        <path d="M4 7V5a2 2 0 0 1 2-2h11v4" />
      </svg>
    );
  }

  if (type === "bell") {
    return (
      <svg viewBox="0 0 24 24" className="summary-icon-svg">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </svg>
    );
  }

  if (type === "pulse") {
    return (
      <svg viewBox="0 0 24 24" className="summary-icon-svg">
        <path d="M3 12h4l3-7 4 14 3-7h4" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" className="summary-icon-svg">
        <path d="M12 3L20 6v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="summary-icon-svg">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

export default function SummaryGrid({ items = [] }) {
  return (
    <div className="summary-grid">
      {items.map((item, index) => {
        const iconType = getSummaryIcon(item.label || "");

        return (
          <div
            className={`summary-card summary-card-${iconType}`}
            key={item.label || index}
          >
            <div className="summary-icon">
              <SummaryIcon type={iconType} />
            </div>

            <div className="summary-content">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              {item.note && <small>{item.note}</small>}
            </div>
          </div>
        );
      })}
    </div>
  );
}