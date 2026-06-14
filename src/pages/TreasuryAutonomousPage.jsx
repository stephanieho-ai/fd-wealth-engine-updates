import "../styles/components/treasury-institutional-hero.css";
import "../styles/treasury/treasury-autonomous-intelligence-core.css";

import TreasuryInstitutionalHero from "../components/common/TreasuryInstitutionalHero";
import TreasuryAutonomousIntelligenceCore from "../components/treasury/TreasuryAutonomousIntelligenceCore";
import TreasuryDemoBanner from "../components/demo/TreasuryDemoBanner";
import useWorkspaceMode from "../hooks/useWorkspaceMode";

export default function TreasuryAutonomousPage() {
  const { workspaceMode } = useWorkspaceMode();
  const isDemoMode = workspaceMode === "DEMO";

  return (
    <main className="treasury-autonomous-page">
      {isDemoMode && <TreasuryDemoBanner compact />}

      <TreasuryInstitutionalHero
        title="Autonomous Treasury Intelligence"
        description="AI-driven treasury observation, reasoning and decision support readiness."
        badgeLabel="AI MODE"
        badgeValue="ACTIVE"
      />

      <TreasuryAutonomousIntelligenceCore />
    </main>
  );
}