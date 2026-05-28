import { useEffect, useState } from "react";

export default function EscalationCommandCard({ severity = "BLOCKED" }) {
  const normalizedSeverity = String(severity || "BLOCKED").toUpperCase();

  const [responseActive, setResponseActive] = useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem("treasury_response_active") === "true";

    setResponseActive(saved);
  }, []);

  const activateTreasuryResponse = () => {
    setResponseActive(true);

    localStorage.setItem("treasury_response_active", "true");

    window.dispatchEvent(
      new CustomEvent("treasuryResponseActivated", {
        detail: {
          status: "ACTIVE",
          severity: normalizedSeverity,
          activatedAt: new Date().toISOString(),
          source: "Escalation Command Center",
        },
      })
    );
  };

  const responseMap = {
    SAFE: {
      badge: "SAFE RESPONSE",
      threat: "SAFE",
      action: "Monitor Treasury Position",
      priority: "NORMAL",
      trigger: "No Executive Trigger",
      route: "Standard Treasury Monitoring Protocol",
      description:
        "Treasury condition is stable. No immediate escalation action is required.",
    },
    WATCH: {
      badge: "WATCH RESPONSE",
      threat: "WATCH",
      action: "Increase Monitoring",
      priority: "MODERATE",
      trigger: "Treasury Review Suggested",
      route: "Treasury Watch Review Protocol",
      description:
        "Treasury signal requires monitoring. Review liquidity and deployment exposure.",
    },
    HIGH: {
      badge: "HIGH RESPONSE",
      threat: "HIGH",
      action: "Increase Liquidity Buffer",
      priority: "URGENT",
      trigger: "Escalation Required",
      route: "Defensive Liquidity Stabilization Protocol",
      description:
        "Liquidity stress escalation detected across treasury allocation clusters.",
    },
    CRITICAL: {
      badge: "CRITICAL RESPONSE",
      threat: "CRITICAL",
      action: "Activate Risk Containment",
      priority: "IMMEDIATE",
      trigger: "Executive Review Required",
      route: "Critical Treasury Containment Protocol",
      description:
        "Treasury risk pressure is critical. Immediate institutional response is required.",
    },
    BLOCKED: {
      badge: "BLOCKED RESPONSE",
      threat: "BLOCKED",
      action: "Stop Treasury Execution",
      priority: "IMMEDIATE",
      trigger: "Executive Approval Required",
      route: "Governance Block Resolution Protocol",
      description:
        "Policy engine has blocked execution. Treasury action requires governance review before continuation.",
    },
  };

  const response = responseMap[normalizedSeverity] || responseMap.BLOCKED;

  return (
    <section className="treasury-escalation-card">
      <div className="treasury-escalation-header">
        <div>
          <p className="treasury-eyebrow">
            TREASURY ESCALATION ENGINE
          </p>

          <h2 className="treasury-section-title">
            Escalation Command Center
          </h2>
        </div>

        <div className="treasury-status-pill treasury-status-pill-red">
          {responseActive ? "TREASURY RESPONSE ACTIVE" : response.badge}
        </div>
      </div>

      <div className="treasury-escalation-grid">
        <div className="treasury-escalation-metric">
          <p>Threat Level</p>
          <h3>{response.threat}</h3>
          <span>{response.description}</span>
        </div>

        <div className="treasury-escalation-metric">
          <p>Recommended Action</p>
          <h3>{response.action}</h3>
          <span>
            System recommendation based on treasury pressure,
            policy status, liquidity condition and operational exposure.
          </span>
        </div>

        <div className="treasury-escalation-metric">
          <p>Intervention Priority</p>
          <h3>{response.priority}</h3>
          <span>
            Treasury intervention priority is calculated from current
            severity and execution governance status.
          </span>
        </div>

        <div className="treasury-escalation-metric">
          <p>Executive Trigger</p>
          <h3>{response.trigger}</h3>
          <span>
            Determines whether senior treasury or executive-level approval
            is required before further action.
          </span>
        </div>
      </div>

      <div className="treasury-action-routing">
        <div>
          <p>TREASURY ACTION ROUTING</p>
          <h3>{response.route}</h3>
        </div>

        <button
          type="button"
          className={
            responseActive
              ? "treasury-response-button treasury-response-button-active"
              : "treasury-response-button"
          }
          onClick={activateTreasuryResponse}
        >
          {responseActive
            ? "Treasury Response Active"
            : "Activate Treasury Response"}
        </button>
      </div>
    </section>
  );
}