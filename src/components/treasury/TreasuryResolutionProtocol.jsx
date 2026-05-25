import "../../styles/treasury/treasury-escalation.css";

function getResolutionModel(severity = "HIGH") {
  const level = String(severity || "HIGH").toUpperCase();

  if (level === "BLOCKED") {
    return [
      {
        title: "Governance Review",
        status: "ACTIVE",
        note: "Treasury governance board is reviewing policy restriction.",
      },
      {
        title: "Liquidity Recovery",
        status: "PENDING",
        note: "Reserve stabilization required before execution resumes.",
      },
      {
        title: "Reserve Confirmation",
        status: "WAITING",
        note: "Treasury reserve validation pending governance clearance.",
      },
      {
        title: "Execution Clearance",
        status: "LOCKED",
        note: "Execution remains blocked until approval completes.",
      },
    ];
  }

  if (level === "CRITICAL") {
    return [
      {
        title: "Emergency Treasury Review",
        status: "ACTIVE",
        note: "Critical liquidity escalation detected.",
      },
      {
        title: "Reserve Protection",
        status: "ACTIVE",
        note: "Defensive liquidity preservation enabled.",
      },
      {
        title: "Capital Stabilization",
        status: "PENDING",
        note: "Treasury stabilization in progress.",
      },
      {
        title: "Execution Recovery",
        status: "WAITING",
        note: "Execution recovery pending treasury normalization.",
      },
    ];
  }

  return [
    {
      title: "Treasury Monitoring",
      status: "NORMAL",
      note: "Treasury environment operating normally.",
    },
    {
      title: "Liquidity Observation",
      status: "NORMAL",
      note: "Reserve and liquidity monitored continuously.",
    },
    {
      title: "Operational Readiness",
      status: "READY",
      note: "Treasury execution remains operational.",
    },
    {
      title: "Execution Clearance",
      status: "OPEN",
      note: "Treasury deployment permitted.",
    },
  ];
}

export default function TreasuryResolutionProtocol({
  severity = "HIGH",
}) {
  const items = getResolutionModel(severity);

  return (
    <section className="treasury-resolution-protocol">
      <div className="resolution-header">
        <div>
          <p className="resolution-eyebrow">
            Treasury Resolution Workflow
          </p>

          <h2 className="resolution-title">
            Resolution Protocol
          </h2>
        </div>

        <div className="resolution-status">
          LIVE RESOLUTION
        </div>
      </div>

      <div className="resolution-grid">
        {items.map((item) => (
          <div
            key={item.title}
            className="resolution-card"
          >
            <span className="resolution-badge">
              {item.status}
            </span>

            <h3>{item.title}</h3>

            <p>{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}