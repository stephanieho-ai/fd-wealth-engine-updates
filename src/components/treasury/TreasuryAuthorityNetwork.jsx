import { useEffect, useState } from "react";

export default function TreasuryAuthorityNetwork() {
  const routes = [
    "Board → Executive Layer",
    "Executive Layer → Treasury Desk",
    "Treasury Desk → Risk Control",
    "Risk Control → Execution Engine",
    "Execution Engine → Audit Ledger",
  ];

  const nodes = [
    {
      label: "BOARD",
      title: "Governance Board",
      subtitle: "Final Authority",
      status: "LOCKED",
      className: "authority-node-red",
    },
    {
      label: "EXEC",
      title: "Executive Layer",
      subtitle: "Strategic Approval",
      status: "REVIEW",
      className: "authority-node-purple",
    },
    {
      label: "TREASURY",
      title: "Treasury Desk",
      subtitle: "Capital Routing",
      status: "ACTIVE",
      className: "authority-node-blue",
    },
    {
      label: "RISK",
      title: "Risk Control",
      subtitle: "Policy Validation",
      status: "MONITORING",
      className: "authority-node-orange",
    },
    {
      label: "OPS",
      title: "Execution Engine",
      subtitle: "Deployment Action",
      status: "PENDING",
      className: "authority-node-green",
    },
    {
      label: "AUDIT",
      title: "Audit Ledger",
      subtitle: "Immutable Record",
      status: "SYNCED",
      className: "authority-node-cyan",
    },
  ];

  const [selectedRoute, setSelectedRoute] = useState(routes[0]);

  useEffect(() => {
    const savedRoute = localStorage.getItem("treasury_selected_authority_route");

    if (savedRoute && routes.includes(savedRoute)) {
      setSelectedRoute(savedRoute);
    }
  }, []);

  const handleRouteClick = (route) => {
    setSelectedRoute(route);

    localStorage.setItem("treasury_selected_authority_route", route);

    window.dispatchEvent(
      new CustomEvent("treasuryAuthorityRouteSelected", {
        detail: {
          route,
          selectedAt: new Date().toISOString(),
          source: "Treasury Authority Network",
        },
      })
    );
  };

  return (
    <section className="treasury-authority-network-card">
      <div className="treasury-authority-network-header">
        <div>
          <p className="treasury-eyebrow">
            V33.2-G18-H AUTHORITY TRANSMISSION NETWORK
          </p>

          <h2 className="treasury-section-title">
            Treasury Authority Network
          </h2>

          <p className="treasury-authority-network-subtitle">
            Institutional authority mesh for governance routing, escalation
            transmission, executive approval flow and audit synchronization.
          </p>
        </div>

        <div className="treasury-network-status">
          <p>NETWORK STATUS</p>
          <h3>ACTIVE</h3>
          <span>6 authority nodes online</span>
        </div>
      </div>

      <div className="treasury-authority-node-grid">
        {nodes.map((node) => (
          <div key={node.title} className="treasury-authority-node">
            <div className={`treasury-authority-icon ${node.className}`}>
              {node.label}
            </div>

            <h3>{node.title}</h3>
            <p>{node.subtitle}</p>

            <span className="treasury-authority-status">
              {node.status}
            </span>
          </div>
        ))}
      </div>

      <div className="treasury-authority-bottom-grid">
        <div className="treasury-authority-route-panel">
          <h3>Transmission Routes</h3>

          <div className="treasury-authority-route-list">
            {routes.map((route) => (
              <button
                key={route}
                type="button"
                className={
                  selectedRoute === route
                    ? "treasury-route-chip treasury-route-chip-active"
                    : "treasury-route-chip"
                }
                onClick={() => handleRouteClick(route)}
              >
                {route}
              </button>
            ))}
          </div>
        </div>

        <div className="treasury-authority-signal-panel">
          <h3>Live Authority Signal</h3>

          <p>
            Treasury governance signal is currently transmitting through the
            institutional authority network with escalation review enabled.
          </p>

          <div className="treasury-selected-route-box">
            <span>SELECTED ROUTE</span>
            <strong>{selectedRoute}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}