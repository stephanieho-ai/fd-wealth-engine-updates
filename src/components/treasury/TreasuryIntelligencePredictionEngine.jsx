export default function TreasuryIntelligencePredictionEngine() {
  const predictionMetrics = [
    {
      label: "Liquidity Direction",
      value: "STABLE",
      note: "Expected to remain balanced across the next cycle.",
    },
    {
      label: "Risk Trend",
      value: "LOW RISE",
      note: "Minor monitoring pressure may increase if maturity load grows.",
    },
    {
      label: "Prediction Confidence",
      value: "86%",
      note: "Forecast confidence remains within operational range.",
    },
    {
      label: "Forecast Horizon",
      value: "30 DAYS",
      note: "Next forecast review window for treasury monitoring.",
    },
  ];

  const futureSignals = [
    "Liquidity conditions remain stable",
    "Governance pressure remains controlled",
    "Maturity ladder remains balanced",
    "Deployment capacity remains available",
  ];

  return (
    <section className="treasury-prediction-engine">
      <div className="treasury-prediction-card">
        <div className="prediction-status-pill">
          <span>Forecast Status</span>
          <strong>ACTIVE</strong>
        </div>

        <p className="treasury-prediction-eyebrow">
          Treasury Forecast Layer
        </p>

        <h2 className="treasury-prediction-title">
          Treasury Intelligence Prediction Engine
        </h2>

        <p className="treasury-prediction-description">
          Forecasts future treasury direction, risk movement and next
          monitoring focus based on current intelligence signals.
        </p>

        <div className="treasury-prediction-grid">
          {predictionMetrics.map((item) => (
            <div className="treasury-prediction-metric" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.note}</small>
            </div>
          ))}
        </div>

        <div className="treasury-prediction-body">
          <div className="prediction-panel">
            <h3>Future Treasury Signals</h3>

            <div className="prediction-signal-list">
              {futureSignals.map((signal) => (
                <div className="prediction-signal-item" key={signal}>
                  <span>✓</span>
                  <p>{signal}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="prediction-panel prediction-matrix">
            <h3>Prediction Matrix</h3>

            <div className="prediction-matrix-item">
              <span>Forecast Confidence</span>
              <strong>86%</strong>
            </div>

            <div className="prediction-matrix-item">
              <span>Expected Direction</span>
              <strong>Stable Treasury Growth</strong>
            </div>

            <div className="prediction-matrix-item">
              <span>Risk Outlook</span>
              <strong>Low Rise</strong>
            </div>

            <div className="prediction-matrix-item">
              <span>Next Review</span>
              <strong>30 Days</strong>
            </div>
          </div>
        </div>

        <div className="treasury-prediction-interpretation">
          <span>Prediction Interpretation</span>
          <p>
            Treasury intelligence projects a stable liquidity environment with
            manageable monitoring pressure. Future treasury conditions remain
            within acceptable operating thresholds for the next review cycle.
          </p>
        </div>
      </div>
    </section>
  );
}