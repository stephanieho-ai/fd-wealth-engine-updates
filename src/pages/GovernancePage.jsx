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
import TreasuryInstitutionalHero from "../components/common/TreasuryInstitutionalHero";

import { useGovernanceRuntime } from "../hooks/useGovernanceRuntime";
import { getGovernanceRuntimeEvents } from "../runtime/governance/governanceEvents";

import TreasuryDemoBanner from "../components/demo/TreasuryDemoBanner";
import useWorkspaceMode from "../hooks/useWorkspaceMode";

export default function GovernancePage() {
  const { isDemoMode } = useWorkspaceMode();

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
      <style>{`
        .governance-page .treasury-demo-compact-banner {
          margin: -10px 0 6px auto !important;
        }

        .governance-page .treasury-institutional-hero {
          margin-top: 22px !important;
          margin-bottom: 22px !important;
        }

        .governance-page .dashboard-hero.treasury-hero.governance-runtime-section {
          width: min(100%, 1280px) !important;
          max-width: 1280px !important;

          margin: 0 auto 28px !important;

          padding: 32px 36px !important;

          border-radius: 24px !important;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.94),
              rgba(248,250,252,0.84)
            ) !important;

          border: 1px solid rgba(148,163,184,0.18) !important;

          box-shadow:
            0 18px 45px rgba(15,23,42,0.06),
            inset 0 1px 0 rgba(255,255,255,0.8) !important;

          color: #0f172a !important;
        }

        .governance-page .governance-hero-top {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 20px !important;
          align-items: stretch !important;
        }

        .governance-page .governance-runtime-card,
        .governance-page .governance-runtime-feed,
        .governance-page .governance-flow-card {
          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.95),
              rgba(248,250,252,0.86)
            ) !important;

          border: 1px solid rgba(148,163,184,0.16) !important;

          box-shadow:
            0 10px 26px rgba(15,23,42,0.05),
            inset 0 1px 0 rgba(255,255,255,0.75) !important;

          color: #0f172a !important;
        }

        .governance-page .governance-runtime-card {
          min-height: auto !important;
          padding: 22px !important;
          border-radius: 22px !important;
        }

        .governance-page .governance-runtime-card h3 {
          font-size: 24px !important;
          margin: 4px 0 8px !important;
          color: #0f172a !important;
        }

        .governance-page .governance-runtime-grid {
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 10px !important;
          margin-top: 18px !important;
        }

        .governance-page .governance-runtime-grid div {
          padding: 12px 14px !important;
          border-radius: 16px !important;
          background: rgba(239,246,255,0.78) !important;
          border: 1px solid rgba(147,197,253,0.22) !important;
        }

        .governance-page .governance-runtime-grid span {
          color: #64748b !important;
        }

        .governance-page .governance-runtime-grid strong {
          font-size: 22px !important;
          color: #0f172a !important;
        }

        .governance-page .governance-runtime-signal {
          margin-top: 14px !important;
          padding: 14px 16px !important;
          border-radius: 18px !important;
          background: linear-gradient(135deg, rgba(239,246,255,0.95), rgba(224,242,254,0.85)) !important;
          border: 1px solid rgba(147,197,253,0.22) !important;
        }

        .governance-page .governance-runtime-signal span {
          color: #2563eb !important;
        }

        .governance-page .governance-runtime-signal strong {
          color: #0f172a !important;
        }

        .governance-page .governance-runtime-feed {
          min-height: auto !important;
          padding: 22px !important;
          border-radius: 22px !important;
        }

        .governance-page .governance-runtime-feed h3 {
          font-size: 22px !important;
          margin: 4px 0 14px !important;
          color: #0f172a !important;
        }

        .governance-page .governance-runtime-event {
          padding: 14px 16px !important;
          border-radius: 16px !important;
          background: rgba(239,246,255,0.78) !important;
          border: 1px solid rgba(147,197,253,0.22) !important;
        }

        .governance-page .governance-runtime-event span {
          color: #2563eb !important;
        }

        .governance-page .governance-runtime-event strong {
          color: #0f172a !important;
        }

        .governance-page .governance-flow-row {
          margin-top: 22px !important;
          padding: 18px !important;
          border-radius: 22px !important;
          gap: 14px !important;
          background: rgba(248,250,252,0.72) !important;
          border: 1px solid rgba(148,163,184,0.14) !important;
        }

        .governance-page .governance-flow-card {
          padding: 20px !important;
          border-radius: 20px !important;
          min-height: auto !important;
        }

        .governance-page .governance-flow-card h3 {
          font-size: 18px !important;
          margin: 14px 0 8px !important;
          color: #0f172a !important;
        }

        .governance-page .governance-flow-card p {
          font-size: 12px !important;
          line-height: 1.55 !important;
          color: #64748b !important;
        }

        .governance-page .governance-flow-card button {
          height: 42px !important;
          margin-top: 16px !important;
          border-radius: 999px !important;
          font-size: 13px !important;
          background: linear-gradient(135deg, #2563eb, #1e40af) !important;
          color: #ffffff !important;
        }

        .governance-page .flow-number {
          background: #2563eb !important;
          color: #ffffff !important;
        }

        .governance-page .flow-status {
          background: rgba(37,99,235,0.08) !important;
          color: #2563eb !important;
          border: 1px solid rgba(37,99,235,0.18) !important;
        }

        .governance-page .flow-arrow {
          color: #94a3b8 !important;
        }

        .governance-page .governance-runtime-section .eyebrow {
          color: #2563eb !important;
        }

        .governance-page .governance-runtime-section .muted,
        .governance-page .governance-runtime-section p {
          color: #64748b !important;
        }

        @media (max-width: 980px) {
          .governance-page .governance-hero-top {
            grid-template-columns: 1fr !important;
          }

          .governance-page .governance-runtime-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .governance-page .governance-flow-row {
            flex-direction: column !important;
          }

          .governance-page .flow-arrow {
            display: none !important;
          }
        }
      `}</style>

      {isDemoMode && <TreasuryDemoBanner compact />}

      <TreasuryInstitutionalHero
        title="Governance Console"
        description="Distributed authority coordination, consensus intelligence and governance orchestration."
        badgeLabel="WORKSPACE"
        badgeValue="GOVERNANCE OS"
      />

      <section className="dashboard-hero treasury-hero governance-runtime-section">
        <div className="governance-hero-top">
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

            <button onClick={runLoadRedistribution}>Redistribute Load</button>
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