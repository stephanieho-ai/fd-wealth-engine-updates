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
    { label: "BOARD", title: "Governance Board", subtitle: "Final Authority", status: "LOCKED", className: "authority-node-red" },
    { label: "EXEC", title: "Executive Layer", subtitle: "Strategic Approval", status: "REVIEW", className: "authority-node-purple" },
    { label: "TREASURY", title: "Treasury Desk", subtitle: "Capital Routing", status: "ACTIVE", className: "authority-node-blue" },
    { label: "RISK", title: "Risk Control", subtitle: "Policy Validation", status: "MONITORING", className: "authority-node-orange" },
    { label: "OPS", title: "Execution Engine", subtitle: "Deployment Action", status: "PENDING", className: "authority-node-green" },
    { label: "AUDIT", title: "Audit Ledger", subtitle: "Immutable Record", status: "SYNCED", className: "authority-node-cyan" },
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
    <section
      className="treasury-authority-network-card"
      style={{
        padding: "22px",
        borderRadius: "26px",
        margin: "22px 0",
      }}
    >
      <div
        className="treasury-authority-network-header"
        style={{
          marginBottom: "20px",
          alignItems: "flex-start",
        }}
      >
        <div>
          <p className="treasury-eyebrow" style={{ fontSize: 10 }}>
            V33.2-G18-H AUTHORITY TRANSMISSION NETWORK
          </p>

          <h2 className="treasury-section-title" style={{ fontSize: 24 }}>
            Treasury Authority Network
          </h2>

          <p
            className="treasury-authority-network-subtitle"
            style={{ fontSize: 12, lineHeight: 1.45, maxWidth: 760 }}
          >
            Institutional authority mesh for governance routing, escalation
            transmission, executive approval flow and audit synchronization.
          </p>
        </div>

        <div
          className="treasury-network-status"
          style={{
            padding: "14px 18px",
            borderRadius: 20,
            minWidth: 150,
          }}
        >
          <p style={{ fontSize: 10 }}>NETWORK STATUS</p>
          <h3 style={{ fontSize: 24, margin: "4px 0" }}>ACTIVE</h3>
          <span style={{ fontSize: 11 }}>6 authority nodes online</span>
        </div>
      </div>

      <div
        className="treasury-authority-node-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 14,
        }}
      >
        {nodes.map((node) => (
          <div
            key={node.title}
            className="treasury-authority-node"
            style={{
              minHeight: 105,
              padding: 14,
              borderRadius: 22,
            }}
          >
            <div
              className={`treasury-authority-icon ${node.className}`}
              style={{
                width: 38,
                height: 38,
                borderRadius: 16,
                fontSize: 11,
                marginBottom: 14,
              }}
            >
              {node.label}
            </div>

            <h3 style={{ fontSize: 17, margin: "0 0 8px" }}>{node.title}</h3>
            <p style={{ fontSize: 12, margin: "0 0 12px" }}>{node.subtitle}</p>

            <span
              className="treasury-authority-status"
              style={{
                fontSize: 10,
                padding: "6px 12px",
                borderRadius: 999,
              }}
            >
              {node.status}
            </span>
          </div>
        ))}
      </div>

      <div
        className="treasury-authority-bottom-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginTop: 16,
        }}
      >
        <div
          className="treasury-authority-route-panel"
          style={{ padding: 18, borderRadius: 22 }}
        >
          <h3 style={{ fontSize: 16, marginBottom: 12 }}>Transmission Routes</h3>

          <div className="treasury-authority-route-list" style={{ gap: 8 }}>
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
                style={{
                  fontSize: 10,
                  padding: "7px 12px",
                }}
              >
                {route}
              </button>
            ))}
          </div>
        </div>

        <div
          className="treasury-authority-signal-panel"
          style={{ padding: 18, borderRadius: 22 }}
        >
          <h3 style={{ fontSize: 16, marginBottom: 10 }}>Live Authority Signal</h3>

          <p style={{ fontSize: 12, lineHeight: 1.45 }}>
            Treasury governance signal is transmitting through the institutional
            authority network with escalation review enabled.
          </p>

          <div
            className="treasury-selected-route-box"
            style={{
              padding: 14,
              borderRadius: 16,
              marginTop: 12,
            }}
          >
            <span style={{ fontSize: 10 }}>SELECTED ROUTE</span>
            <strong style={{ fontSize: 14 }}>{selectedRoute}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}