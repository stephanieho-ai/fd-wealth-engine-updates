import "../../styles/demo/treasury-demo-environment.css";

export default function TreasuryDemoBanner({ compact = false }) {
  if (compact) {
    return (
      <div className="treasury-demo-compact-banner">
        <span className="treasury-demo-compact-dot" />
        <span>Demo Environment</span>
        <strong>Simulated Data</strong>
      </div>
    );
  }

  return (
    <section className="treasury-demo-banner">
      <div className="treasury-demo-content">
        <div className="treasury-demo-icon">
          <span>OS</span>
        </div>

        <div>
          <p className="treasury-demo-eyebrow">
            Demo Environment
          </p>

          <h2>
            Treasury OS Demo Environment
          </h2>

          <p>
            Isolated treasury simulation layer for product demonstrations,
            operator training and institutional workflow walkthroughs.
          </p>
        </div>
      </div>

      <span className="treasury-demo-pill">
        SIMULATED DATA
      </span>
    </section>
  );
}