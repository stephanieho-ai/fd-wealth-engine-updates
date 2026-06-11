export const WORKSPACE_MODE_KEY = "fd_workspace_mode";

export const WORKSPACE_MODES = {
  LIVE: "LIVE",
  DEMO: "DEMO",
};

export function getWorkspaceMode() {
  return localStorage.getItem(WORKSPACE_MODE_KEY) || WORKSPACE_MODES.LIVE;
}

export function setWorkspaceMode(mode) {
  localStorage.setItem(WORKSPACE_MODE_KEY, mode);
  window.dispatchEvent(new Event("workspaceModeChanged"));
}

export function isDemoMode() {
  return getWorkspaceMode() === WORKSPACE_MODES.DEMO;
}

export function isLiveMode() {
  return getWorkspaceMode() === WORKSPACE_MODES.LIVE;
}