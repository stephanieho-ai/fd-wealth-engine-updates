/* ========================================
   GOVERNANCE EVENT PROPAGATION LAYER
   V33.2-G19-M
   Institutional Governance Runtime Engine
======================================== */

/**
 * This file records and broadcasts governance runtime events.
 *
 * It is the beginning of:
 * - audit trail propagation
 * - governance timeline updates
 * - cross-component synchronization
 */

export const governanceRuntimeEvents = [];

export function createGovernanceEvent(type, message, payload = {}) {
  const event = {
    id: `GOV-EVENT-${Date.now()}`,
    type,
    message,
    payload,
    createdAt: new Date().toISOString(),
  };

  governanceRuntimeEvents.unshift(event);

  window.dispatchEvent(
    new CustomEvent("governanceRuntimeEvent", {
      detail: event,
    })
  );

  console.log("[Governance Runtime Event]", event);

  return event;
}

export function getGovernanceRuntimeEvents() {
  return [...governanceRuntimeEvents];
}