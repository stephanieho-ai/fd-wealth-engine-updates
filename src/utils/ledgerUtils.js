export const LEDGER_STORAGE_KEY = "fd_immutable_ledger";

export function readLedger() {
  try {
    const raw = localStorage.getItem(LEDGER_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Ledger read failed:", error);
    return [];
  }
}

export function writeLedgerEntry(entry) {
  const existingLedger = readLedger();

  const ledgerEntry = {
    id: `LEDGER-${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...entry,
  };

  localStorage.setItem(
    LEDGER_STORAGE_KEY,
    JSON.stringify([...existingLedger, ledgerEntry])
  );

  window.dispatchEvent(new Event("ledgerUpdated"));

  return ledgerEntry;
}