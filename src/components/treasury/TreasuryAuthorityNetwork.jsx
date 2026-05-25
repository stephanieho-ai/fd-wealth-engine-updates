import React from "react";
import "../../styles/treasury/treasury-authority-network.css";

export default function TreasuryAuthorityNetwork() {
  const authorityNodes = [
    {
      id: "BOARD",
      title: "Governance Board",
      role: "Final Authority",
      status: "LOCKED",
      tone: "red",
    },
    {
      id: "EXEC",
      title: "Executive Layer",
      role: "Strategic Approval",
      status: "REVIEW",
      tone: "purple",
    },
    {
      id: "TREASURY",
      title: "Treasury Desk",
      role: "Capital Routing",
      status: "ACTIVE",
      tone: "blue",
    },
    {
      id: "RISK",
      title: "Risk Control",
      role: "Policy Validation",
      status: "MONITORING",
      tone: "orange",
    },
    {
      id: "OPS",
      title: "Execution Engine",
      role: "Deployment Action",
      status: "PENDING",
      tone: "green",
    },
    {
      id: "AUDIT",
      title: "Audit Ledger",
      role: "Immutable Record",
      status: "SYNCED",
      tone: "cyan",
    },
  ];

  const transmissionRoutes = [
    "Board → Executive Layer",
    "Executive Layer → Treasury Desk",
    "Treasury Desk → Risk Control",
    "Risk Control → Execution Engine",
    "Execution Engine → Audit Ledger",
  ];

  return (
    <section className="treasury-authority-network-card">
      <div className="authority-network-bg" />

      <div className="authority-network-header">
        <div>
          <p className="eyebrow">V33.2-G18-H Authority Transmission Network</p>
          <h2>Treasury Authority Network</h2>
          <p className="muted">
            Institutional authority mesh for governance routing, escalation
            transmission, executive approval flow and audit synchronization.
          </p>
        </div>

        <div className="authority-network-status">
          <span>NETWORK STATUS</span>
          <strong>ACTIVE</strong>
          <small>6 authority nodes online</small>
        </div>
      </div>

      <div className="authority-network-map">
        <div className="authority-network-line line-a" />
        <div className="authority-network-line line-b" />
        <div className="authority-network-line line-c" />

        {authorityNodes.map((node) => (
          <div
            key={node.id}
            className={`authority-network-node node-${node.tone}`}
          >
            <div className="node-orbit" />
            <div className="node-core">{node.id}</div>
            <div className="node-content">
              <h3>{node.title}</h3>
              <p>{node.role}</p>
              <span>{node.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="authority-network-footer">
        <div className="authority-route-panel">
          <strong>Transmission Routes</strong>
          <div className="authority-route-list">
            {transmissionRoutes.map((route) => (
              <span key={route}>{route}</span>
            ))}
          </div>
        </div>

        <div className="authority-signal-panel">
          <strong>Live Authority Signal</strong>
          <p>
            Treasury governance signal is currently transmitting through the
            institutional authority network with escalation review enabled.
          </p>
        </div>
      </div>
    </section>
  );
}