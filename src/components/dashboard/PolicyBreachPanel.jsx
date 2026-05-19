function PolicyIcon({ severity }) {
  const level = String(severity || "").toLowerCase();

  if (level === "ok") {
    return (
      <svg viewBox="0 0 24 24" className="policy-svg">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 10v7" />
        <path d="M12 7h.01" />
      </svg>
    );
  }

  if (level === "escalation") {
    return (
      <svg viewBox="0 0 24 24" className="policy-svg">
        <path d="M12 3L22 20H2L12 3Z" />
        <path d="M12 9v5" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  if (level === "critical" || level === "blocked") {
    return (
      <svg viewBox="0 0 24 24" className="policy-svg">
        <path d="M12 3L20 6V11C20 16 16.5 20 12 21C7.5 20 4 16 4 11V6L12 3Z" />
        <path d="M12 8v5" />
        <path d="M12 16h.01" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="policy-svg">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

export default function PolicyBreachPanel({ decision }) {
  if (!decision) return null;

  const allPolicies = decision.results || [];

  return (
    <section className="policy-breach-panel">
      <div className="policy-breach-top">
        <div>
          <p className="eyebrow">TREASURY GOVERNANCE</p>
          <h2>Policy Breach Monitor</h2>
          <p className="muted">
            Real-time treasury policy validation before deployment execution.
          </p>
        </div>

        <div className={`policy-status-badge ${decision.severity.toLowerCase()}`}>
          {decision.severity}
        </div>
      </div>

      <div className="policy-decision-grid">
        <div className="policy-decision-card">
          <span>EXECUTION ALLOWED</span>
          <strong>{decision.allowed ? "YES" : "NO"}</strong>
        </div>

        <div className="policy-decision-card">
          <span>APPROVAL REQUIRED</span>
          <strong>{decision.approvalRequired ? "YES" : "NO"}</strong>
        </div>

        <div className="policy-decision-card">
          <span>ESCALATION REQUIRED</span>
          <strong>{decision.escalationRequired ? "YES" : "NO"}</strong>
        </div>

        <div className="policy-decision-card">
          <span>POLICY VERSION</span>
          <strong>{decision.policyVersion}</strong>
        </div>
      </div>

      <div className="policy-table-list">
        {allPolicies.map((item, index) => (
          <div key={`${item.policy}-${index}`} className="policy-table-row">
            <div className={`policy-icon ${item.severity.toLowerCase()}`}>
              <PolicyIcon severity={item.severity} />
            </div>

            <div className="policy-main">
              <p>{item.policy}</p>
              <strong>{item.title}</strong>
            </div>

            <div className="policy-message">{item.message}</div>

            <div className="policy-meta">
              <span>SEVERITY</span>
              <strong className={item.severity.toLowerCase()}>
                {item.severity}
              </strong>
            </div>

            <div className="policy-meta">
              <span>ACTION</span>
              <strong>{item.action}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}