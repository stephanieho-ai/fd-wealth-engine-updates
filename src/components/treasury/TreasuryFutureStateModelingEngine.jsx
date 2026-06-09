export default function TreasuryFutureStateModelingEngine() {
  const futureStates = [
    {
      title: "Growth Scenario",
      badge: "PRIMARY",
      badgeType: "primary",
      liquidity: "MYR 1.20M",
      yield: "4.2%",
      risk: "LOW",
      outcome: "Capital Expansion",
    },
    {
      title: "Stable Scenario",
      badge: "BASELINE",
      badgeType: "baseline",
      liquidity: "MYR 980K",
      yield: "3.8%",
      risk: "LOW",
      outcome: "Treasury Stability",
    },
    {
      title: "Stress Scenario",
      badge: "WATCH",
      badgeType: "watch",
      liquidity: "MYR 820K",
      yield: "3.1%",
      risk: "HIGH",
      outcome: "Liquidity Protection",
    },
  ];

  const trajectoryStages = [
    {
      stage: "Stage 1",
      title: "Current Treasury Operations",
    },
    {
      stage: "Stage 2",
      title: "Enhanced Liquidity Control",
    },
    {
      stage: "Stage 3",
      title: "Predictive Treasury Intelligence",
    },
    {
      stage: "Stage 4",
      title: "Institutional Treasury State",
    },
  ];

  return (
    <section className="treasury-future-state-engine">
      <div className="treasury-future-state-card">
        <div className="future-state-status">
          <span>Future State Status</span>
          <strong>MODELING</strong>
        </div>

        <p className="treasury-eyebrow">
          Treasury Future Intelligence
        </p>

        <h2 className="treasury-section-title">
          Treasury Future State Modeling Engine
        </h2>

        <p className="treasury-section-description">
          Models potential treasury outcomes using prediction,
          scenario simulation and what-if analysis to estimate
          future treasury operating conditions.
        </p>

        <div className="future-state-summary-grid">
          <div className="future-state-metric">
            <span>Target State</span>
            <strong>GROWTH</strong>
          </div>

          <div className="future-state-metric">
            <span>Forecast Horizon</span>
            <strong>180 DAYS</strong>
          </div>

          <div className="future-state-metric">
            <span>Confidence</span>
            <strong>91%</strong>
          </div>

          <div className="future-state-metric">
            <span>Risk Outlook</span>
            <strong>LOW</strong>
          </div>
        </div>

        <div className="future-confidence-section">
          <div className="future-confidence-header">
            <span>Future State Confidence</span>
            <strong>86%</strong>
          </div>

          <div className="future-confidence-bar">
            <div
              className="future-confidence-fill"
              style={{ width: "86%" }}
            />
          </div>
        </div>

        <div className="future-trajectory-section">
          <div className="future-trajectory-header">
            <span>Treasury Evolution Path</span>
          </div>

          <div className="future-trajectory-grid">
            {trajectoryStages.map((item) => (
              <div className="trajectory-fragment" key={item.stage}>
                <div className="trajectory-stage">
                  <span>{item.stage}</span>
                  <strong>{item.title}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="future-state-grid">
          {futureStates.map((state) => (
            <div key={state.title} className="future-state-item">
              <span className={`future-state-badge ${state.badgeType}`}>
                {state.badge}
              </span>

              <h3>{state.title}</h3>

              <div className="future-state-data">
                <span>Projected Liquidity</span>
                <strong>{state.liquidity}</strong>
              </div>

              <div className="future-state-data">
                <span>Projected Yield</span>
                <strong>{state.yield}</strong>
              </div>

              <div className="future-state-data">
                <span>Projected Risk</span>
                <strong>{state.risk}</strong>
              </div>

              <div className="future-state-outcome">
                <span>Expected Outcome</span>
                <strong>{state.outcome}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="future-state-interpretation">
          <span>Future State Interpretation</span>
          <p>
            Treasury intelligence projects a growth-oriented treasury state
            supported by strong liquidity, controlled risk exposure and high
            forecast confidence.
          </p>
        </div>
      </div>
    </section>
  );
}