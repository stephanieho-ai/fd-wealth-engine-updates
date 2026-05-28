import { useEffect, useState } from "react";

import { getGovernanceRuntimeState } from "../runtime/governance/governanceRuntime";
import {
  runGovernanceEscalationCycle,
  runGovernanceLoadRedistributionCycle,
  runGovernanceStabilizationCycle,
} from "../runtime/governance/governanceCoordinator";
import {
  getGovernanceRiskSignal,
  getInstitutionalConfidenceSignal,
} from "../runtime/governance/governanceSignals";

export function useGovernanceRuntime() {
  const [state, setState] = useState(() => ({
    ...getGovernanceRuntimeState(),
  }));

  const [riskSignal, setRiskSignal] = useState(() => getGovernanceRiskSignal());

  const [confidenceSignal, setConfidenceSignal] = useState(() =>
    getInstitutionalConfidenceSignal()
  );

  const refreshRuntime = () => {
    setState({ ...getGovernanceRuntimeState() });
    setRiskSignal(getGovernanceRiskSignal());
    setConfidenceSignal(getInstitutionalConfidenceSignal());
  };

  const syncResult = (result) => {
    setState({ ...result.state });
    setRiskSignal(result.riskSignal);
    setConfidenceSignal(result.confidenceSignal);

    return result;
  };

  const runStabilization = () => {
    return syncResult(runGovernanceStabilizationCycle());
  };

  const runEscalation = () => {
    return syncResult(runGovernanceEscalationCycle());
  };

  const runLoadRedistribution = () => {
    return syncResult(runGovernanceLoadRedistributionCycle());
  };

  useEffect(() => {
    const handleRuntimeEvent = () => {
      refreshRuntime();
    };

    window.addEventListener("governanceRuntimeEvent", handleRuntimeEvent);

    return () => {
      window.removeEventListener("governanceRuntimeEvent", handleRuntimeEvent);
    };
  }, []);

  return {
    state,
    riskSignal,
    confidenceSignal,
    refreshRuntime,
    runStabilization,
    runEscalation,
    runLoadRedistribution,
  };
}