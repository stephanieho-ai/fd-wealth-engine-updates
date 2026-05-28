import { useGovernanceRuntime } from "../../hooks/useGovernanceRuntime";

export default function GovernanceStabilityIndexEngine() {
  const { state } = useGovernanceRuntime();

  const governanceStability = state.governanceStability;

  const runtimeSeverity =
    state.escalationExposure >= 70
      ? "critical"
      : state.escalationExposure >= 40
      ? "warning"
      : "stable";

  const aiRecommendation =
    runtimeSeverity === "critical"
      ? {
          title: "Critical governance escalation detected",
          message:
            "Immediate governance intervention and authority stabilization required. Escalation exposure exceeds institutional tolerance threshold.",
        }
      : runtimeSeverity === "warning"
      ? {
          title: "Governance pressure increasing",
          message:
            "Routing pressure and escalation exposure are rising. Recommend governance load redistribution and active monitoring.",
        }
      : {
          title: "Governance operating condition stable",
          message:
            "Governance synchronization remains within institutional operating range. Continue monitored governance mode.",
        };

  const stabilitySignals = [
    {
      label: "Consensus Durability",
      value: `${governanceStability}%`,
      detail:
        "Runtime governance stability is synchronized with the central engine.",
      level:
        governanceStability >= 85
          ? "high"
          : governanceStability >= 65
          ? "medium"
          : "low",
    },
    {
      label: "Escalation Pressure",
      value:
        state.escalationExposure <= 30
          ? "LOW"
          : state.escalationExposure <= 60
          ? "MEDIUM"
          : "HIGH",
      detail: "Escalation exposure is now driven by runtime propagation.",
      level:
        state.escalationExposure <= 30
          ? "low"
          : state.escalationExposure <= 60
          ? "medium"
          : "high",
    },
    {
      label: "Routing Resilience",
      value: `${100 - state.routingPressure}%`,
      detail: "Routing resilience improves as runtime pressure decreases.",
      level:
        state.routingPressure <= 35
          ? "high"
          : state.routingPressure <= 60
          ? "medium"
          : "low",
    },
    {
      label: "Authority Health",
      value: state.institutionalConfidence >= 85 ? "STABLE" : "WATCH",
      detail:
        "Authority health reflects institutional confidence from runtime state.",
      level: state.institutionalConfidence >= 85 ? "high" : "medium",
    },
  ];

  return (
    <section className={`governance-stability-index ${runtimeSeverity}`}>
      <div className="governance-stability-header">
        <div>
          <p className="governance-stability-eyebrow">
            GOVERNANCE STABILITY INDEX
          </p>

          <h2>Institutional Governance Stability Monitor</h2>

          <p className="governance-stability-subtitle">
            Real-time stability scoring for governance consensus, authority
            health, escalation pressure and routing resilience.
          </p>
        </div>

        <div className="governance-stability-score">
          <span>Stability Score</span>
          <strong>{governanceStability}%</strong>
          <small>{state.runtimeStatus}</small>
        </div>
      </div>

      <div className="governance-stability-grid">
        {stabilitySignals.map((item) => (
          <div className="stability-signal-card" key={item.label}>
            <div className="stability-signal-top">
              <span>{item.label}</span>
              <strong className={item.level}>{item.value}</strong>
            </div>

            <p>{item.detail}</p>

            <div className="stability-track">
              <div className={`stability-fill ${item.level}`} />
            </div>
          </div>
        ))}
      </div>

      <div className={`governance-stability-ai-panel ${runtimeSeverity}`}>
        <div>
          <small>AI STABILITY RECOMMENDATION</small>
          <h3>{aiRecommendation.title}</h3>
        </div>

        <p>{aiRecommendation.message}</p>
      </div>
    </section>
  );
}