import React from "react";
import "../../styles/treasury/treasury-governance-mesh.css";

export default function TreasuryGovernanceMesh() {
  const nodes = [
    { id: "01", title: "Treasury Board", status: "SYNCED", signal: "98%" },
    { id: "02", title: "Risk Authority", status: "ACTIVE", signal: "94%" },
    { id: "03", title: "Executive Committee", status: "REVIEW", signal: "87%" },
    { id: "04", title: "Liquidity Command", status: "ONLINE", signal: "91%" },
    { id: "05", title: "Compliance Network", status: "WATCH", signal: "82%" },
    { id: "06", title: "AI Governance Core", status: "COORDINATING", signal: "96%" },
  ];

  return (
    <section className="treasury-governance-mesh-card">
      <div className="governance-mesh-header">
        <div>
          <p className="governance-eyebrow">V33.2-G19</p>
          <h2>Treasury Governance Intelligence Mesh</h2>
          <p className="governance-subtitle">
            Distributed institutional governance network for treasury authority synchronization.
          </p>
        </div>

        <div className="governance-score-box">
          <span>Consensus Sync</span>
          <strong>94%</strong>
          <small>Institutional alignment stable</small>
        </div>
      </div>

      <div className="governance-mesh-grid">
        <div className="governance-topology-panel">
          <div className="mesh-orbit mesh-orbit-one" />
          <div className="mesh-orbit mesh-orbit-two" />
          <div className="mesh-center-node">
            <span>AI</span>
            <small>Governance Core</small>
          </div>

          {nodes.map((node, index) => (
            <div key={node.id} className={`mesh-node mesh-node-${index + 1}`}>
              <span>{node.id}</span>
              <strong>{node.title}</strong>
              <small>{node.status}</small>
            </div>
          ))}

          <div className="mesh-line mesh-line-a" />
          <div className="mesh-line mesh-line-b" />
          <div className="mesh-line mesh-line-c" />
          <div className="mesh-line mesh-line-d" />
        </div>

        <div className="governance-intelligence-panel">
          <h3>Governance Synchronization</h3>

          <div className="governance-metric-row">
            <span>Active Governance Nodes</span>
            <strong>6 / 6</strong>
          </div>

          <div className="governance-metric-row">
            <span>Parallel Approval Routing</span>
            <strong>Enabled</strong>
          </div>

          <div className="governance-metric-row">
            <span>Authority Load Balance</span>
            <strong>Stable</strong>
          </div>

          <div className="governance-metric-row">
            <span>Governance Latency</span>
            <strong>Low</strong>
          </div>

          <div className="governance-ai-note">
            <span>AI Governance Recommendation</span>
            <p>
              Mesh synchronization is stable. Treasury authority nodes are aligned,
              and executive approval routing may proceed under monitored governance mode.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}