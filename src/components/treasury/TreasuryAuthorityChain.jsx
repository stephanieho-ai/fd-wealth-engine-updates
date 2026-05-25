export default function TreasuryAuthorityChain() {
  const chain = [
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

        <div className="treasury-status-pill treasury-status-pill-red">
          EXECUTIVE FLOW
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