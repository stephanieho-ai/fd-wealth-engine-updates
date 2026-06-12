import "../../styles/components/treasury-institutional-hero.css";

export default function TreasuryInstitutionalHero({
  title,
  description,
  badgeLabel,
  badgeValue,
}) {
  return (
    <section className="treasury-institutional-hero">
      <div className="treasury-institutional-hero-content">
        <span className="treasury-institutional-kicker">
          FD WEALTH ENGINE
        </span>

        <h1>{title}</h1>

        <p>{description}</p>
      </div>

      <div className="treasury-institutional-hero-badge">
        <span>{badgeLabel}</span>
        <strong>{badgeValue}</strong>
      </div>
    </section>
  );
}