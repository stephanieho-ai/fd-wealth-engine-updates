export default function TreasuryOperatingSystemCore() {
  const layers = [
    {
      name: "Operations",
      status: "ACTIVE",
    },
    {
      name: "Governance",
      status: "ACTIVE",
    },
    {
      name: "Operator",
      status: "ACTIVE",
    },
    {
      name: "Intelligence",
      status: "ACTIVE",
    },
    {
      name: "Strategy",
      status: "ACTIVE",
    },
  ];

  return (
    <section className="treasury-os-core">
      <div className="treasury-os-card">

        <p className="treasury-os-eyebrow">
          Treasury Operating System
        </p>

        <h2 className="treasury-os-title">
          Treasury OS Core Layer
        </h2>

        <p className="treasury-os-description">
          Central orchestration layer managing operations,
          governance, operator workflows, intelligence,
          and treasury strategy synchronization.
        </p>

        <div className="treasury-os-metrics">

          <div className="treasury-os-metric">
            <span>OS Status</span>
            <strong>ACTIVE</strong>
          </div>

          <div className="treasury-os-metric">
            <span>Runtime</span>
            <strong>STABLE</strong>
          </div>

          <div className="treasury-os-metric">
            <span>Confidence</span>
            <strong>94%</strong>
          </div>

          <div className="treasury-os-metric">
            <span>Sync</span>
            <strong>98%</strong>
          </div>

        </div>

        <div className="treasury-os-layer-grid">
          {layers.map((layer) => (
            <div
              key={layer.name}
              className="treasury-os-layer-card"
            >
              <span>{layer.name}</span>
              <strong>{layer.status}</strong>
            </div>
          ))}
        </div>

        <div className="treasury-os-health">
          <span>System Health</span>
          <strong>NORMAL</strong>
        </div>

        <div className="treasury-os-sync">
          Last Synchronization:
          <strong> 2 min ago</strong>
        </div>

      </div>
    </section>
  );
}