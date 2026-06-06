export default function TreasuryIntelligenceSignalEngine() {
  const treasurySignal = {
    currentSignal: "STABLE",
    signalStrength: 82,
    riskDirection: "LOW",
    confidence: 91,

    signalTrend: "IMPROVING",
    riskMomentum: "DECLINING",
    confidenceDelta: "+4%",
    operatorReadiness: "READY",
  };

  const signals = [
    {
      label: "Current Signal",
      value: treasurySignal.currentSignal,
    },
    {
      label: "Signal Strength",
      value: `${treasurySignal.signalStrength}%`,
    },
    {
      label: "Risk Direction",
      value: treasurySignal.riskDirection,
    },
    {
      label: "Confidence",
      value: `${treasurySignal.confidence}%`,
    },
    {
      label: "Signal Trend",
      value: treasurySignal.signalTrend,
    },
    {
      label: "Risk Momentum",
      value: treasurySignal.riskMomentum,
    },
    {
      label: "Confidence Delta",
      value: treasurySignal.confidenceDelta,
    },
    {
      label: "Operator Readiness",
      value: treasurySignal.operatorReadiness,
    },
  ];

  return (
    <section className="treasury-signal-engine">
      <div className="signal-engine-card">
        <p className="treasury-eyebrow">
          Treasury Intelligence Layer
        </p>

        <h2 className="treasury-section-title">
          Treasury Intelligence Signal Engine
        </h2>

        <p className="treasury-section-description">
          Dynamic treasury intelligence signals translate liquidity condition,
          governance pressure, risk movement, confidence change, and operator
          readiness into one institutional monitoring layer.
        </p>

        <div className="signal-grid">
          {signals.map((signal) => (
            <div key={signal.label} className="signal-item">
              <span className="signal-label">
                {signal.label}
              </span>

              <strong className="signal-value">
                {signal.value}
              </strong>
            </div>
          ))}
        </div>

        <div className="signal-recommendation">
          <span className="signal-recommendation-label">
            Recommended Action
          </span>

          <p className="signal-recommendation-text">
            Treasury signal condition remains stable with improving trend and
            declining risk momentum. Continue monitoring liquidity deployment
            opportunities while maintaining governance discipline and execution
            readiness.
          </p>
        </div>
      </div>
    </section>
  );
}