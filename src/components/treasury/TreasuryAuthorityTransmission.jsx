export default function TreasuryAuthorityTransmission() {
  const transmissions = [
    {
      source: "Risk Engine",
      target: "Treasury Desk",
      status: "ACTIVE",
      latency: "0.4s",
    },
    {
      source: "Treasury Desk",
      target: "Governance Board",
      status: "SYNCING",
      latency: "1.2s",
    },
    {
      source: "Governance Board",
      target: "Executive Layer",
      status: "PENDING",
      latency: "2.8s",
    },
    {
      source: "Executive Layer",
      target: "Execution Engine",
      status: "LOCKED",
      latency: "--",
    },
  ];

  return (
    <section className="treasury-escalation-card transmission-network-card">
      <div className="treasury-escalation-header">
        <div>
          <p className="treasury-eyebrow">
            TREASURY AUTHORITY TRANSMISSION
          </p>

          <h2 className="treasury-section-title">
            Institutional Signal Relay Network
          </h2>
        </div>

        <div className="treasury-status-pill treasury-status-pill-red">
          LIVE TRANSMISSION
        </div>
      </div>

      <div className="transmission-network-grid">
        {transmissions.map((item, index) => (
          <div
            key={`${item.source}-${item.target}`}
            className="transmission-node"
          >
            <div className="transmission-pulse" />

            <div className="transmission-top">
              <span className="transmission-status">
                {item.status}
              </span>

              <span className="transmission-latency">
                {item.latency}
              </span>
            </div>

            <div className="transmission-route">
              <h3>{item.source}</h3>

              <div className="transmission-arrow">
                →
              </div>

              <h3>{item.target}</h3>
            </div>

            <p>
              Treasury governance signal currently
              transmitting through institutional
              authority network.
            </p>

            {index !== transmissions.length - 1 && (
              <div className="transmission-line" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}