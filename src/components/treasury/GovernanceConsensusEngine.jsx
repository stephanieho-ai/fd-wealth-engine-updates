import React from "react";
import "../../styles/treasury/governance-consensus-engine.css";

export default function GovernanceConsensusEngine() {
  const authorities = [
    {
      title: "Treasury Board",
      vote: "APPROVED",
      confidence: 96,
      status: "SYNCED",
    },
    {
      title: "Risk Authority",
      vote: "APPROVED",
      confidence: 92,
      status: "STABLE",
    },
    {
      title: "Liquidity Command",
      vote: "MONITOR",
      confidence: 84,
      status: "WATCH",
    },
    {
      title: "Executive Committee",
      vote: "APPROVED",
      confidence: 88,
      status: "ACTIVE",
    },
  ];

  return (
    <section className="governance-consensus-card">
      <div className="consensus-header">
        <div>
          <p className="consensus-eyebrow">
            GOVERNANCE CONSENSUS ENGINE
          </p>

          <h2>Distributed Governance Consensus</h2>

          <p className="consensus-subtitle">
            Institutional treasury governance synchronization across
            executive authorities, liquidity routing and approval intelligence.
          </p>
        </div>

        <div className="consensus-mode-pill">
          CONSENSUS MODE
        </div>
      </div>

      <div className="consensus-top-grid">
        <div className="consensus-score-panel">
          <span>Consensus Confidence</span>
          <strong>91%</strong>

          <div className="consensus-progress">
            <div
              className="consensus-progress-bar"
              style={{ width: "91%" }}
            />
          </div>

          <small>
            Governance convergence stable across distributed authority mesh.
          </small>
        </div>

        <div className="consensus-sync-panel">
          <div className="sync-ring">
            <div className="sync-core">SYNC</div>
          </div>

          <div className="sync-status">
            <strong>Approval Synchronization Active</strong>

            <p>
              Governance approval flow stabilized under AI coordination layer.
            </p>
          </div>
        </div>
      </div>

      <div className="authority-matrix">
        {authorities.map((authority) => (
          <div className="authority-card" key={authority.title}>
            <div className="authority-card-top">
              <span>{authority.status}</span>
              <strong>{authority.vote}</strong>
            </div>

            <h3>{authority.title}</h3>

            <div className="authority-confidence">
              <div className="authority-confidence-label">
                <span>Confidence</span>
                <strong>{authority.confidence}%</strong>
              </div>

              <div className="authority-confidence-bar">
                <div
                  className="authority-confidence-fill"
                  style={{
                    width: `${authority.confidence}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="consensus-ai-layer">
        <div>
          <p>AI GOVERNANCE COORDINATION</p>

          <h3>Consensus convergence stable</h3>
        </div>

        <div className="consensus-ai-message">
          Treasury governance nodes remain synchronized.
          Parallel executive approvals may continue under monitored routing mode.
        </div>
      </div>
    </section>
  );
}