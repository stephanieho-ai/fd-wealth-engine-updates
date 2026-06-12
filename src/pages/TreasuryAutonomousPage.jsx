import "../styles/treasury/treasury-autonomous-intelligence-core.css";

import TreasuryAutonomousIntelligenceCore from "../components/treasury/TreasuryAutonomousIntelligenceCore";
import TreasuryDemoBanner from "../components/demo/TreasuryDemoBanner";
import useWorkspaceMode from "../hooks/useWorkspaceMode";

export default function TreasuryAutonomousPage() {
  const { workspaceMode } = useWorkspaceMode();
  const isDemoMode = workspaceMode === "DEMO";

  return (
    <main className="treasury-autonomous-page">
      {isDemoMode && <TreasuryDemoBanner compact />}

      <TreasuryAutonomousIntelligenceCore />
    </main>
  );
}