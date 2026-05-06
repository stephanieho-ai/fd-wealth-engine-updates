import { useEffect, useMemo, useState } from "react";
import "./App.css";
import AppShell from "./app/AppShell";

// =========================
// Tabs
// =========================
export const MAIN_TABS = {
  HOME: "HOME",
  RECORDS: "RECORDS",
  MORE: "MORE",
  SETTINGS: "SETTINGS",
};

// =========================
// Storage Keys
// =========================
const STORAGE_KEYS = {
  RECORDS: "fd_v315_records",
  SETTINGS: "fd_v315_settings",
  ACTIVE_TAB: "fd_v315_active_tab",
};

// =========================
// Default Settings
// =========================
const DEFAULT_SETTINGS = {
  currency: "MYR",
  notifications: true,
  darkMode: false,
  autoBackup: true,
  compactMode: false,
};

// =========================
// Default Records
// =========================
const DEFAULT_RECORDS = [
  {
    id: "FD001",
    bank: "HLB",
    recordType: "FD",
    productName: "12M Placement",
    principal: 36000,
    rate: 3.65,
    startDate: "2026-03-30",
    tenure: 12,
    status: "ACTIVE",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB) || MAIN_TABS.HOME
  );

  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RECORDS);
    return saved ? JSON.parse(saved) : DEFAULT_RECORDS;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const currency = settings?.currency || "MYR";

  const activeRecords = useMemo(() => {
    return records.filter((r) => r.status !== "CLOSED");
  }, [records]);

  const totalActivePortfolio = useMemo(() => {
    return activeRecords.reduce((sum, r) => sum + Number(r.principal || 0), 0);
  }, [activeRecords]);

  const addRecord = (newRecord) => {
  setRecords((prev) => {
    if (newRecord.tag !== "AUTO_EXECUTED") {
      return [...prev, newRecord];
    }

    const exists = prev.some(
      (r) =>
        r.executionBatchId === newRecord.executionBatchId &&
        r.tag === "AUTO_EXECUTED"
    );

    if (exists) return prev;

    let remaining = Number(newRecord.principal ?? newRecord.amount ?? 0);

    const nextRecords = [];

    for (const r of prev) {
      const type = String(r.recordType || "")
        .toUpperCase()
        .replace(/\s+/g, "_");

      const isCashSource =
        type === "SAVINGS" || type === "PARKING_CASH";

      if (!isCashSource || remaining <= 0) {
        nextRecords.push(r);
        continue;
      }

      const current = Number(r.principal ?? r.amount ?? 0);
      const deduct = Math.min(current, remaining);
      const nextAmount = Math.max(0, current - deduct);

      remaining -= deduct;

      // 如果已经扣完，就不要放回 records
      if (nextAmount > 0) {
        nextRecords.push({
          ...r,
          principal: nextAmount,
          amount: nextAmount,
        });
      }
    }

    return [...nextRecords, newRecord];
  });
};

  const updateRecord = (updated) => {
    setRecords((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const deleteRecord = (id) => {
  setRecords((prev) => prev.filter((r) => r.id !== id));
};

const undoExecution = (batchId) => {
  setRecords((prev) => {
    const autoRecords = prev.filter(
      (r) => r.tag === "AUTO_EXECUTED" && r.executionBatchId === batchId
    );

    if (!autoRecords.length) return prev;

    const refundAmount = autoRecords.reduce(
      (sum, r) => sum + Number(r.principal ?? r.amount ?? 0),
      0
    );

    const next = prev.filter((r) => r.executionBatchId !== batchId);

    const savingsIndex = next.findIndex((r) => {
      const type = String(r.recordType || "").toUpperCase().replace(/\s+/g, "_");
      return type === "SAVINGS";
    });

    if (savingsIndex >= 0) {
      const current = Number(
        next[savingsIndex].principal ?? next[savingsIndex].amount ?? 0
      );

      next[savingsIndex] = {
        ...next[savingsIndex],
        principal: current + refundAmount,
        amount: current + refundAmount,
        status: "ACTIVE",
      };
    }

    return next;
  });
};

const closeRecord = (id) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "CLOSED" } : r))
    );
  };

  const rolloverRecord = (newRecord) => {
    setRecords((prev) => [...prev, newRecord]);
  };

  const updateSettings = (next) => {
    setSettings(next);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, activeTab);
  }, [activeTab]);

  // =========================
  // Theme + Compact mode
  // =========================
  useEffect(() => {
    document.body.classList.toggle("theme-dark", !!settings?.darkMode);
    document.body.classList.toggle("compact-mode", !!settings?.compactMode);
  }, [settings]);

return (
  <AppShell
    tabs={MAIN_TABS}
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    settings={settings}
    onUpdateSettings={updateSettings}
    records={records}
    activeRecords={activeRecords}
    currency={currency}
    totalActivePortfolio={totalActivePortfolio}

    onAddRecord={addRecord}
    onUpdateRecord={updateRecord}
    onDeleteRecord={deleteRecord}

    // 🔥 加这里
    onUndoExecution={undoExecution}

    onCloseRecord={closeRecord}
    onRolloverRecord={rolloverRecord}
  />
);    
}