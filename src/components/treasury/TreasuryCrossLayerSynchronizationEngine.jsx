import "../../styles/treasury/treasury-cross-layer-synchronization-engine.css";

export default function TreasuryCrossLayerSynchronizationEngine() {
  const syncLayers = [
    {
      layer: "Operations",
      status: "LIVE",
      signal: "Liquidity flow, maturities, execution readiness",
      sync: "Operational state broadcasting",
    },
    {
      layer: "Governance",
      status: "SYNCED",
      signal: "Authority, approval, policy, escalation",
      sync: "Governance rules synchronized",
    },
    {
      layer: "Operator",
      status: "ACTIVE",
      signal: "Human action, review, confirmation",
      sync: "Operator intent captured",
    },
    {
      layer: "Intelligence",
      status: "ANALYZING",
      signal: "Signals, assessment, recommendation, prediction",
      sync: "Intelligence feedback connected",
    },
    {
      layer: "Strategy",
      status: "ALIGNED",
      signal: "Allocation, optimization, alternatives, decision matrix",
      sync: "Strategic direction aligned",
    },
  ];

  const runtimeSync = [
    {
      title: "State Synchronization",
      value: "5 / 5",
      description: "All treasury layers are connected into one runtime state.",
    },
    {
      title: "Runtime Control",
      value: "ACTIVE",
      description: "Treasury OS is coordinating live cross-layer movement.",
    },
    {
      title: "Decision Continuity",
      value: "STABLE",
      description: "Operational decisions remain linked to governance and strategy.",
    },
  ];

  return (
    <section className="treasury-cross-sync-engine">
      <div className="treasury-cross-sync-card">
        <div className="treasury-cross-sync-header">
          <div>
            <p className="treasury-cross-sync-eyebrow">
              G23-C Treasury OS Synchronization Layer
            </p>

            <h2 className="treasury-cross-sync-title">
              Treasury Cross-Layer Synchronization Engine
            </h2>

            <p className="treasury-cross-sync-description">
              Connects Operations, Governance, Operator, Intelligence and Strategy
              into one coordinated Treasury OS runtime.
            </p>
          </div>

          <div className="treasury-cross-sync-status">
            <span>OS SYNC</span>
            <strong>ONLINE</strong>
          </div>
        </div>

        <div className="treasury-sync-bar">
          <span className="treasury-sync-dot"></span>
          <span>Treasury Synchronization Active</span>
        </div>

        <div className="treasury-cross-sync-flow">
          {syncLayers.map((item, index) => (
            <div className="treasury-cross-sync-node" key={item.layer}>
              <div className="treasury-cross-sync-node-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.status}</strong>
              </div>

              <h3>{item.layer}</h3>
              <p>{item.signal}</p>

              <div className="treasury-cross-sync-pill">
                {item.sync}
              </div>
            </div>
          ))}
        </div>

        <div className="treasury-cross-sync-runtime">
          {runtimeSync.map((item) => (
            <div className="treasury-cross-sync-runtime-card" key={item.title}>
              <span>{item.title}</span>
              <strong>{item.value}</strong>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="treasury-cross-sync-message">
          <span>Runtime Interpretation</span>
          <p>
            Treasury OS is no longer only displaying treasury modules. It is now
            synchronizing every major layer into one operating system behavior:
            observe, govern, guide, analyze and strategize.
          </p>
        </div>
      </div>
    </section>
  );
}