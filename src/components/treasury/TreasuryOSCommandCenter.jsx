import "../../styles/treasury/treasury-os-command-center.css";

export default function TreasuryOSCommandCenter() {
  const commandStatus = ["ACTIVE", "SYNCHRONIZED", "HEALTHY", "READY"];

  const commandFlow = [
    "OS Core",
    "Runtime",
    "Synchronization",
    "Health",
    "Command",
  ];

  const commandActions = [
    "Observe Runtime",
    "Review OS Health",
    "Monitor Sync",
    "Prepare Decision",
  ];

  return (
    <section className="treasury-os-command-center">
      <div className="treasury-os-command-card">
        <div className="treasury-os-command-header">
          <div>
            <p className="treasury-eyebrow">Treasury OS Command Layer</p>

            <h2 className="treasury-section-title">
              Treasury OS Command Center
            </h2>

            <p className="treasury-section-description">
              Consolidates OS core, runtime coordination, synchronization and
              health intelligence into one compact command-ready Treasury
              Operating System dashboard.
            </p>

            <div className="treasury-os-command-status-strip">
              {commandStatus.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="treasury-os-command-ready">
            <span>Command Status</span>
            <strong>READY</strong>
            <p>OS COMMAND ENABLED</p>
          </div>
        </div>

        <div className="treasury-os-command-main-grid">
          <div className="treasury-os-command-flow">
            <h3>Operating Command Flow</h3>

            <div className="treasury-os-command-flow-list">
              {commandFlow.map((item, index) => (
                <div className="treasury-os-command-flow-item" key={item}>
                  <div className="treasury-os-command-flow-index">
                    {index + 1}
                  </div>

                  <p>{item}</p>

                  {index < commandFlow.length - 1 && (
                    <span className="treasury-os-command-flow-arrow">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="treasury-os-command-actions">
            <h3>Command Actions</h3>

            <div className="treasury-os-command-action-list">
              {commandActions.map((item) => (
                <div className="treasury-os-command-action-item" key={item}>
                  <span>✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="treasury-os-command-summary">
              <span>Next System Instruction</span>
              <strong>
                Maintain monitoring and prepare treasury command review.
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}