import { useEffect, useState } from "react";
import {
  getWorkspaceMode,
  setWorkspaceMode,
  WORKSPACE_MODES,
} from "../utils/workspaceMode";

export default function useWorkspaceMode() {
  const [workspaceMode, setModeState] = useState(getWorkspaceMode());

  useEffect(() => {
    const syncMode = () => {
      setModeState(getWorkspaceMode());
    };

    window.addEventListener("workspaceModeChanged", syncMode);
    window.addEventListener("storage", syncMode);

    return () => {
      window.removeEventListener("workspaceModeChanged", syncMode);
      window.removeEventListener("storage", syncMode);
    };
  }, []);

  const changeWorkspaceMode = (mode) => {
    setWorkspaceMode(mode);
    setModeState(mode);
  };

  return {
    workspaceMode,
    isLiveMode: workspaceMode === WORKSPACE_MODES.LIVE,
    isDemoMode: workspaceMode === WORKSPACE_MODES.DEMO,
    changeWorkspaceMode,
    WORKSPACE_MODES,
  };
}