import TreasuryGovernanceMesh from "../components/treasury/TreasuryGovernanceMesh";
import GovernanceConsensusEngine from "../components/treasury/GovernanceConsensusEngine";
import TreasuryConflictResolution from "../components/treasury/TreasuryConflictResolution";
import GovernanceLatencyIntelligence from "../components/treasury/GovernanceLatencyIntelligence";
import AuthorityLoadBalancingEngine from "../components/treasury/AuthorityLoadBalancingEngine";
import ParallelApprovalRoutingEngine from "../components/treasury/ParallelApprovalRoutingEngine";
import GovernanceDecisionMatrixEngine from "../components/treasury/GovernanceDecisionMatrixEngine";
import ExecutiveAuthorityInfluenceMap from "../components/treasury/ExecutiveAuthorityInfluenceMap";
import GovernanceEscalationHierarchyEngine from "../components/treasury/GovernanceEscalationHierarchyEngine";
import GovernanceStabilityIndexEngine from "../components/treasury/GovernanceStabilityIndexEngine";
import GovernanceRiskHeatmapEngine from "../components/treasury/GovernanceRiskHeatmapEngine";
import GovernanceInterventionEngine from "../components/treasury/GovernanceInterventionEngine";


import { useGovernanceRuntime } from "../hooks/useGovernanceRuntime";
import { getGovernanceRuntimeEvents } from "../runtime/governance/governanceEvents";
import TreasuryDemoBanner from "../components/demo/TreasuryDemoBanner";
import useWorkspaceMode from "../hooks/useWorkspaceMode";


export default function GovernancePage() {

  const { workspaceMode } = useWorkspaceMode();
  const isDemoMode = workspaceMode === "DEMO";

  const {
    state,
    riskSignal,
    confidenceSignal,
    runStabilization,
    runEscalation,
    runLoadRedistribution,
  } = useGovernanceRuntime();

  const runtimeSeverity =
    state.escalationExposure >= 70
      ? "critical"
      : state.escalationExposure >= 40
      ? "warning"
      : "stable";

  const runtimeEvents = getGovernanceRuntimeEvents().slice(0, 4);

  return (
    <main className="dashboard-page treasury-console-page governance-page">
      {isDemoMode && <TreasuryDemoBanner compact />}
      <section className="dashboard-hero treasury-hero">
        <div className="governance-hero-top">
          <div className="governance-console-copy">
            <p className="eyebrow">Institutional Governance Mesh</p>
            <h1>Governance Console</h1>
            <p className="muted">
              Distributed authority coordination, consensus intelligence,
              conflict resolution, latency monitoring and parallel approval
              routing.
            </p>
          </div>

          <div className="hero-alert">
            <span>Workspace</span>
            <strong>GOVERNANCE OS</strong>
          </div>

          <div className={`governance-runtime-card ${runtimeSeverity}`}>
            <div>
              <p className="eyebrow">Runtime Engine</p>
              <h3>{state.runtimeStatus}</h3>
              <p className="muted">{state.lastRuntimeAction}</p>
            </div>

            <div className="governance-runtime-grid">
              <div>
                <span>Stability</span>
                <strong>{state.governanceStability}%</strong>
              </div>
              <div>
                <span>Routing Pressure</span>
                <strong>{state.routingPressure}%</strong>
              </div>
              <div>
                <span>Exposure</span>
                <strong>{state.escalationExposure}%</strong>
              </div>
              <div>
                <span>Confidence</span>
                <strong>{state.institutionalConfidence}%</strong>
              </div>
            </div>

            <div className="governance-runtime-signal">
              <span>{riskSignal.level}</span>
              <strong>{confidenceSignal}</strong>
            </div>
          </div>

          <div className="governance-runtime-feed">
            <div className="governance-runtime-feed-header">
              <p className="eyebrow">Runtime Propagation Feed</p>
              <h3>Governance Runtime Events</h3>
            </div>

            <div className="governance-runtime-feed-list">
              {runtimeEvents.length === 0 ? (
                <div className="governance-runtime-event">
                  <span>RUNTIME_READY</span>
                  <strong>Governance runtime standing by.</strong>
                  <p>No runtime action has been executed yet.</p>
                </div>
              ) : (
                runtimeEvents.map((event) => (
                  <div key={event.id} className="governance-runtime-event">
                    <span>{event.type}</span>
                    <strong>{event.message}</strong>
                    <p>{event.createdAt}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="governance-flow-row">
          <div className="governance-flow-card">
            <div>
              <div className="governance-flow-badge-row">
                <span className="flow-number">01</span>
                <span className="flow-status">TRIGGERED</span>
              </div>
              <h3>Trigger Governance Escalation</h3>
              <p>
                Simulate institutional governance stress and escalation
                exposure.
              </p>
            </div>
            <button onClick={runEscalation}>Execute Escalation</button>
          </div>

          <div className="flow-arrow">→</div>

          <div className="governance-flow-card">
            <div>
              <div className="governance-flow-badge-row">
                <span className="flow-number">02</span>
                <span className="flow-status">ACTIVE</span>
              </div>
              <h3>Redistribute Approval Load</h3>
              <p>Mitigate routing congestion and approval bottlenecks.</p>
            </div>
            <button onClick={runLoadRedistribution}>
              Redistribute Load
            </button>
          </div>

          <div className="flow-arrow">→</div>

          <div className="governance-flow-card">
            <div>
              <div className="governance-flow-badge-row">
                <span className="flow-number">03</span>
                <span className="flow-status">REVIEW</span>
              </div>
              <h3>Apply Governance Stabilization</h3>
              <p>
                Execute institutional governance recovery synchronization.
              </p>
            </div>
            <button onClick={runStabilization}>Stabilize Runtime</button>
          </div>
        </div>
      </section>

      <TreasuryGovernanceMesh />
      <GovernanceConsensusEngine />
      <TreasuryConflictResolution />
      <GovernanceLatencyIntelligence />
      <AuthorityLoadBalancingEngine />
      <ParallelApprovalRoutingEngine />
      <GovernanceDecisionMatrixEngine />
      <ExecutiveAuthorityInfluenceMap />
      <GovernanceEscalationHierarchyEngine />
      <GovernanceStabilityIndexEngine />
      <GovernanceRiskHeatmapEngine />
      <GovernanceInterventionEngine />
    </main>
  );
}