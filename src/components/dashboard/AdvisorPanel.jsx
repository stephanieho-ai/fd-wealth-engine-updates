import "../../styles/dashboard/advisor-panel.css";

export default function AdvisorPanel({
  currency = "MYR",
  targetMonth = "-",
  deployable = 0,
  bestOffer = null,
}) {
  const amount = Number(deployable || 0);

  const formattedDeployable = `${currency} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

  const offerText = bestOffer
    ? `${bestOffer.bank || "Bank"} · ${
        bestOffer.tenureMonths || bestOffer.tenure || "-"
      }M · ${Number(bestOffer.ratePa || bestOffer.rate || 0).toFixed(2)}%`
    : "No active offer";

  return (
    <section className="dashboard-section advisor-panel treasury-workstation-card">
      <div className="section-header workstation-header">
        <div>
          <p className="eyebrow">PRIVATE BANKER AI</p>
          <h2>Advisor Panel</h2>
          <p className="muted">Capital guidance and ladder action priority.</p>
        </div>
      </div>

      <div className="advisor-table">
        <div>
          <span>Deployable</span>
          <strong>{formattedDeployable}</strong>
        </div>

        <div>
          <span>Target</span>
          <strong>{targetMonth || "-"}</strong>
        </div>

        <div>
          <span>Best Offer</span>
          <strong>{offerText}</strong>
        </div>
      </div>

      <div className="advisor-action-strip">
        <span>ACTION</span>
        <p>
          Protect reserve first. Deploy excess cash into weakest maturity month.
        </p>
      </div>
    </section>
  );
}