export default function TreasuryStrategicAlternativesEngine() {
  const alternatives = [
    {
      code: "ALT-01",
      title: "Growth Focus",
      yieldRate: "4.2%",
      liquidity: "MED",
      risk: "LOW",
      signal: "ACTIVE",
    },
    {
      code: "ALT-02",
      title: "Balanced Allocation",
      yieldRate: "3.9%",
      liquidity: "HIGH",
      risk: "LOW",
      signal: "RECOMMENDED",
    },
    {
      code: "ALT-03",
      title: "Defensive Treasury",
      yieldRate: "3.4%",
      liquidity: "V-HIGH",
      risk: "V-LOW",
      signal: "SAFE",
    },
    {
      code: "ALT-04",
      title: "Aggressive Yield",
      yieldRate: "4.5%",
      liquidity: "LOW",
      risk: "MED",
      signal: "WATCH",
    },
  ];

  return (
    <section className="treasury-strategic-alternatives-engine">
      <div className="treasury-alt-command-wall">
        <div className="treasury-alt-command-header">
          <div>
            <p className="treasury-alt-terminal-label">
              TREASURY STRATEGY COMMAND WALL
            </p>

            <h2>Treasury Strategic Alternatives</h2>

            <p>
              Live comparison of alternative treasury strategy paths across
              yield, liquidity, risk and execution readiness.
            </p>
          </div>

          <div className="treasury-alt-command-status">
            <span className="treasury-alt-pulse" />
            STRATEGY OS ONLINE
          </div>
        </div>

        <div className="treasury-alt-ticker">
          <span>ALT GENERATED: 04</span>
          <span>BEST PATH: BALANCED</span>
          <span>CONFIDENCE: 91%</span>
          <span>EXPECTED BENEFIT: +12%</span>
        </div>

        <div className="treasury-alt-terminal-grid">
          {alternatives.map((item) => (
            <div
              key={item.code}
              className={
                item.signal === "RECOMMENDED"
                  ? "treasury-alt-terminal-card recommended"
                  : "treasury-alt-terminal-card"
              }
            >
              <div className="treasury-alt-terminal-top">
                <span>{item.code}</span>
                <strong>{item.signal}</strong>
              </div>

              <h3>{item.title}</h3>

              <div className="treasury-alt-terminal-matrix">
                <div>
                  <span>YIELD</span>
                  <strong>{item.yieldRate}</strong>
                </div>

                <div>
                  <span>LIQUIDITY</span>
                  <strong>{item.liquidity}</strong>
                </div>

                <div>
                  <span>RISK</span>
                  <strong>{item.risk}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="treasury-alt-command-decision">
          <div>
            <span>FINAL STRATEGY COMMAND</span>
            <strong>Balanced Allocation</strong>
          </div>

          <p>
            Preserve liquidity reserve while deploying income capital
            selectively through validated ladder opportunities.
          </p>

          <button type="button">COMMAND READY</button>
        </div>
      </div>
    </section>
  );
}