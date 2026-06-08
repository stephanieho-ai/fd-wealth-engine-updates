import "../../styles/treasury/treasury-capital-allocation-strategy-engine.css";

export default function TreasuryCapitalAllocationStrategyEngine() {
  const allocationMatrix = [
    {
      label: "Liquidity Reserve",
      value: "42%",
      note: "Protected liquidity for maturities and emergency redeployment.",
    },
    {
      label: "Income Deployment",
      value: "33%",
      note: "Selective FD deployment into validated ladder opportunities.",
    },
    {
      label: "Strategic Buffer",
      value: "15%",
      note: "Flexible capital reserved for future rate and timing windows.",
    },
    {
      label: "Risk-Controlled Growth",
      value: "10%",
      note: "Measured exposure only when confidence remains aligned.",
    },
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
            <p className="treasury-eyebrow">Treasury Strategy Layer</p>

            <h2 className="treasury-section-title">
              Treasury Capital Allocation Strategy Engine
            </h2>

            <p className="treasury-section-description">
              Converts treasury intelligence into structured capital allocation
              guidance by balancing liquidity reserve, income deployment,
              strategic buffer and controlled growth exposure.
            </p>
          </div>

          <div className="treasury-capital-status">
            <span>Allocation Mode</span>
            <strong>Balanced</strong>
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
              <span className="confidence-score-label">
                Overall Confidence
              </span>
              <strong>92%</strong>
            </div>

            <div className="confidence-engine-badge">
              HIGH CONFIDENCE
            </div>

            <p className="confidence-engine-description">
              Treasury allocation posture remains supported by liquidity
              protection, stable ladder structure and disciplined deployment
              readiness.
            </p>

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
              Current treasury condition supports balanced allocation. The
              engine avoids over-deployment by protecting reserve capital while
              allowing measured income expansion through FD ladder opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}