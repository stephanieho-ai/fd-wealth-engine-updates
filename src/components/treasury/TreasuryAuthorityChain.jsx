import useWorkspaceMode from "../../hooks/useWorkspaceMode";

export default function TreasuryAuthorityChain() {
  const { workspaceMode } = useWorkspaceMode();
  const isDemoMode = workspaceMode === "DEMO";

  const demoChain = [
    {
      level: "01",
      title: "Risk Signal",
      description:
        "Treasury risk signal is monitored and operating within institutional tolerance.",
      status: "MONITORED",
    },
    {
      level: "02",
      title: "Treasury Desk",
      description:
        "Operational treasury desk is active and aligned with current liquidity conditions.",
      status: "ACTIVE",
    },
    {
      level: "03",
      title: "Senior Treasury",
      description:
        "Senior treasury authority is ready for review if escalation is required.",
      status: "READY",
    },
    {
      level: "04",
      title: "Governance Board",
      description:
        "Governance board alignment is available for institutional oversight.",
      status: "ALIGNED",
    },
    {
      level: "05",
      title: "Executive Clearance",
      description:
        "Executive clearance remains available under stable treasury conditions.",
      status: "AVAILABLE",
    },
  ];

  const liveChain = [
    {
      level: "01",
      title: "Risk Signal",
      description:
        "Treasury escalation event detected by institutional monitoring engine.",
      status: "TRIGGERED",
    },
    {
      level: "02",
      title: "Treasury Desk",
      description:
        "Operational treasury team reviewing liquidity and execution exposure.",
      status: "ACTIVE",
    },
    {
      level: "03",
      title: "Senior Treasury",
      description:
        "Senior treasury authority validating governance escalation severity.",
      status: "REVIEW",
    },
    {
      level: "04",
      title: "Governance Board",
      description:
        "Board-level treasury governance approval currently pending.",
      status: "PENDING",
    },
    {
      level: "05",
      title: "Executive Clearance",
      description:
        "Final institutional authorization required before execution resumes.",
      status: "LOCKED",
    },
  ];

  const chain = isDemoMode ? demoChain : liveChain;

  return (
    <section className="treasury-escalation-card authority-chain-card">
      <div className="treasury-escalation-header">
        <div>
          <p className="treasury-eyebrow">
            TREASURY AUTHORITY CHAIN
          </p>

          <h2 className="treasury-section-title">
            Executive Approval Hierarchy
          </h2>
        </div>

        <div
          className={
            isDemoMode
              ? "treasury-status-pill treasury-status-pill-green"
              : "treasury-status-pill treasury-status-pill-red"
          }
        >
          {isDemoMode ? "AUTHORITY READY" : "EXECUTIVE FLOW"}
        </div>
      </div>

      <div className="authority-chain-grid">
        {chain.map((item) => (
          <div
            key={item.level}
            className="authority-chain-node"
          >
            <div className="authority-chain-top">
              <div className="authority-chain-level">
                {item.level}
              </div>

              <div className="authority-chain-status">
                {item.status}
              </div>
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

            <div className="authority-chain-line" />
          </div>
        ))}
      </div>
    </section>
  );
}