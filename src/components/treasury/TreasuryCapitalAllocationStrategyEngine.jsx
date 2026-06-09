import "../../styles/treasury/treasury-capital-allocation-strategy-engine.css";

export default function TreasuryCapitalAllocationStrategyEngine() {
  const metrics = [
    { label: "Allocation Mode", value: "BALANCED" },
    { label: "Reserve Coverage", value: "42%" },
    { label: "Deployment Bias", value: "SELECTIVE" },
    { label: "Risk Outlook", value: "LOW" },
  ];

  const allocationMatrix = [
    { label: "Liquidity Reserve", value: "42%", note: "Protected liquidity for maturities and emergency redeployment." },
    { label: "Income Deployment", value: "33%", note: "Selective FD deployment into validated ladder opportunities." },
    { label: "Strategic Buffer", value: "15%", note: "Flexible capital reserved for future rate and timing windows." },
    { label: "Risk-Controlled Growth", value: "10%", note: "Measured exposure only when confidence remains aligned." },
  ];

  const confidenceDrivers = [
    { label: "Liquidity", value: "95" },
    { label: "Rate", value: "89" },
    { label: "Ladder", value: "93" },
    { label: "Efficiency", value: "88" },
    { label: "Readiness", value: "94" },
  ];

  const priorities = [
    "Protect liquidity reserve before new deployment.",
    "Deploy income capital only into validated ladder gaps.",
    "Preserve strategic buffer for future maturity windows.",
    "Avoid over-concentration in one bank, tenure or rate cycle.",
  ];

  return (
    <section className="treasury-capital-allocation-engine">
      <div className="treasury-capital-allocation-card">
        <div className="treasury-capital-header">
          <div>
            <p className="treasury-capital-kicker">
              V33.2-G22-B · TREASURY STRATEGY LAYER
            </p>

            <h2>Treasury Capital Allocation Strategy Engine</h2>

            <p>
              Converts treasury intelligence into structured capital allocation
              guidance by balancing reserve protection, income deployment,
              strategic buffer and controlled growth exposure.
            </p>
          </div>

          <div className="treasury-capital-status">
            <span>Allocation Status</span>
            <strong>ACTIVE</strong>
          </div>
        </div>

        <div className="treasury-capital-metrics">
          {metrics.map((item) => (
            <div className="treasury-capital-metric" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="treasury-capital-confidence-bar">
          <div className="bar-header">
            <span>Capital Allocation Confidence</span>
            <strong>92%</strong>
          </div>
          <div className="bar-track">
            <div className="bar-fill" />
          </div>
        </div>

        <div className="treasury-capital-body-grid">
          <div className="treasury-allocation-matrix">
            <div className="allocation-matrix-header">
              <span>Capital Allocation Matrix</span>
              <strong>Current Strategy Mix</strong>
            </div>

            {allocationMatrix.map((item) => (
              <div className="allocation-matrix-row" key={item.label}>
                <div>
                  <span>{item.label}</span>
                  <p>{item.note}</p>
                </div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="treasury-allocation-confidence-engine">
            <span className="confidence-engine-label">
              Allocation Confidence Engine
            </span>

            <div className="confidence-engine-score">
              <span>Overall Confidence</span>
              <strong>92%</strong>
            </div>

            <div className="confidence-engine-badge">HIGH CONFIDENCE</div>

            <div className="confidence-driver-grid">
              {confidenceDrivers.map((driver) => (
                <div className="confidence-driver" key={driver.label}>
                  <span>{driver.label}</span>
                  <strong>{driver.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="treasury-capital-priority-panel">
          <div className="priority-panel-header">
            <span>Capital Allocation Priority</span>
            <strong>Operator Strategy Order</strong>
          </div>

          <div className="priority-panel-grid">
            {priorities.map((item, index) => (
              <div className="priority-panel-item" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="treasury-capital-strategy-panel">
          <div>
            <span>Treasury Allocation Recommendation</span>
            <strong>
              Preserve liquidity first, deploy income capital selectively, and
              keep strategic buffer available for future maturity windows.
            </strong>
          </div>

          <div>
            <span>Allocation Justification</span>
            <p>
              Current treasury condition supports balanced allocation while
              avoiding over-deployment and preserving future ladder flexibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}