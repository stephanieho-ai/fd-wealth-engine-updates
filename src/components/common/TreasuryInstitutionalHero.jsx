import "../../styles/components/treasury-institutional-hero.css";

export default function TreasuryInstitutionalHero({
  eyebrow = "FD WEALTH ENGINE",
  title,
  description,
  badgeLabel,
  badgeValue,
}) {
  return (
    <section className="hero-card treasury-institutional-hero">
      <div className="hero-copy treasury-institutional-hero-content">
        <div className="eyebrow-pill treasury-institutional-kicker">
          {eyebrow}
        </div>

        <h1>{title}</h1>

        <p>{description}</p>
      </div>

      <div className="hero-metric-card treasury-institutional-hero-badge">
        <div className="hero-metric-label">{badgeLabel}</div>
        <div className="hero-metric-value">{badgeValue}</div>
      </div>
    </section>
  );
}