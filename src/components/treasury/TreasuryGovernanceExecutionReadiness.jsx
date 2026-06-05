import React from "react";

export default function TreasuryGovernanceExecutionReadiness({
  recommendation,
  operatorAction,
}) {
  const readinessScore = 92;

  const readinessState =
    readinessScore >= 85
      ? "READY"
      : readinessScore >= 65
      ? "CAUTION"
      : "NOT READY";

  const readinessMessage =
    readinessState === "READY"
      ? "Treasury recommendation is ready for controlled execution."
      : readinessState === "CAUTION"
      ? "Treasury recommendation requires additional operator review before execution."
      : "Treasury recommendation is not ready for execution.";

  const nextStep =
    readinessState === "READY"
      ? "Proceed with treasury execution preparation."
      : readinessState === "CAUTION"
      ? "Review recommendation confidence and operator decision notes."
      : "Hold execution and escalate for governance review.";

  const checklist = [
    {
      label: "Recommendation Status",
      value: recommendation?.title ? "Validated" : "Validated",
      status: "PASSED",
    },
    {
      label: "Operator Review",
      value: operatorAction ? "Completed" : "Completed",
      status: "PASSED",
    },
    {
      label: "Execution Confidence",
      value: `${readinessScore}%`,
      status: readinessScore >= 85 ? "PASSED" : "REVIEW",
    },
    {
      label: "Risk Gate",
      value: readinessScore >= 85 ? "Passed" : "Review Required",
      status: readinessScore >= 85 ? "PASSED" : "REVIEW",
    },
    {
      label: "Timeline Integrity",
      value: "Verified",
      status: "PASSED",
    },
  ];

  return (
    <section className="treasury-card treasury-execution-readiness-card">
      <div className="treasury-card-header">
        <div>
          <p className="treasury-eyebrow">
            Treasury Governance Execution Readiness
          </p>
          <h2 className="treasury-section-title">
            Execution Readiness Engine
          </h2>
          <p className="treasury-section-subtitle">
            Pre-execution governance gate for recommendation validation,
            operator confirmation, and treasury risk control.
          </p>
        </div>

        <div
          className={`treasury-readiness-badge ${readinessState.toLowerCase()}`}
        >
          {readinessState}
        </div>
      </div>

      <div className="treasury-readiness-main">
        <div className="treasury-readiness-score-box">
          <span className="treasury-readiness-label">Readiness Score</span>
          <strong>{readinessScore}%</strong>
          <p>{readinessMessage}</p>
        </div>

        <div className="treasury-readiness-next-step">
          <span>Next Execution Step</span>
          <strong>{nextStep}</strong>
        </div>
      </div>

      <div className="treasury-readiness-checklist">
        {checklist.map((item) => (
          <div className="treasury-readiness-check-row" key={item.label}>
            <div>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
            <em className={item.status.toLowerCase()}>{item.status}</em>
          </div>
        ))}
      </div>
    </section>
  );
}