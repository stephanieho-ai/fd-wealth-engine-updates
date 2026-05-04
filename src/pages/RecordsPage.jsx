import { useMemo, useRef, useState } from "react";

function formatMoney(value, currency = "MYR") {
  const num = Number(value || 0);
  return `${currency} ${num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return "dd/mm/yyyy";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "dd/mm/yyyy";
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
}

function addMonths(dateStr, months) {
  if (!dateStr || Number(months || 0) <= 0) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";

  const originalDay = d.getDate();
  d.setMonth(d.getMonth() + Number(months || 0));

  if (d.getDate() < originalDay) d.setDate(0);
  return d.toISOString().slice(0, 10);
}

function estimateInterest(principal, rate, tenureMonths) {
  return (
    Number(principal || 0) *
    (Number(rate || 0) / 100) *
    (Number(tenureMonths || 0) / 12)
  );
}

function normalizeRecordType(type) {
  const value = String(type || "").toUpperCase().replace(/\s+/g, "_");
  if (value === "CASH") return "PARKING_CASH";
  if (value === "PARKING_CASH") return "PARKING_CASH";
  if (value === "SAVINGS") return "SAVINGS";
  return "FD";
}

function isFlexibleType(type) {
  const normalized = normalizeRecordType(type);
  return normalized === "SAVINGS" || normalized === "PARKING_CASH";
}

function displayRecordType(type) {
  const value = normalizeRecordType(type);
  if (value === "PARKING_CASH") return "PARKING CASH";
  return value;
}

function buildNextId(records = [], offset = 0) {
  const nums = records
    .map((r) => String(r.id || "").match(/^(FD|CASH|SAV)(\d+)$/))
    .filter(Boolean)
    .map((m) => Number(m[2]));

  const next = (nums.length ? Math.max(...nums) + 1 : 1) + offset;
  return `FD${String(next).padStart(3, "0")}`;
}

function makeDefaultForm() {
  return {
    bank: "",
    recordType: "FD",
    productName: "",
    amount: "",
    rate: "",
    tenure: "",
    status: "ACTIVE",
    startDate: "",
  };
}

function recordToForm(record) {
  const recordType = normalizeRecordType(record.recordType);
  const flexible = isFlexibleType(recordType);

  return {
    bank: record.bank || "",
    recordType,
    productName: record.productName || "",
    amount: Number(record.principal ?? record.amount ?? 0),
    rate: flexible ? "" : Number(record.rate || 0),
    tenure: flexible ? "" : Number(record.tenure || 0),
    status: record.status || "ACTIVE",
    startDate: flexible ? "" : record.startDate || "",
  };
}

function csvEscape(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      result.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current.trim());
  return result;
}

function normalizeImportedRecord(raw, fallbackId) {
  const recordType = normalizeRecordType(raw.recordType || raw.type);
  const flexible = isFlexibleType(recordType);
  const principal = Number(raw.principal ?? raw.amount ?? 0);
  const rate = flexible ? 0 : Number(raw.rate || 0);
  const tenure = flexible ? 0 : Number(raw.tenure ?? raw.tenureMonths ?? 0);
  const startDate = flexible ? "" : raw.startDate || raw.start_date || "";
  const maturityDate = flexible
    ? ""
    : raw.maturityDate || raw.maturity_date || addMonths(startDate, tenure);
  const estimatedInterest = flexible
    ? 0
    : Number(
        raw.estimatedInterest ??
          raw.interest ??
          raw.interest_rm ??
          estimateInterest(principal, rate, tenure)
      );

  return {
    id: raw.id || fallbackId,
    bank: raw.bank || raw.account || "",
    recordType,
    productName: raw.productName || raw.product || raw.note || "",
    principal,
    rate,
    tenure,
    startDate,
    maturityDate,
    estimatedInterest,
    status: String(raw.status || "ACTIVE").toUpperCase(),
  };
}

export default function RecordsPage({
  currency = "MYR",
  records = [],
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord,
  onCloseRecord,
  onRolloverRecord,
}) {
  const [form, setForm] = useState(makeDefaultForm());
  const [editingId, setEditingId] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const fileInputRef = useRef(null);

  const currentType = normalizeRecordType(form.recordType);
  const isFlexibleCapital = isFlexibleType(currentType);

  const maturityDate = useMemo(() => {
    if (isFlexibleCapital) return "";
    if (!form.startDate || Number(form.tenure || 0) <= 0) return "";
    return addMonths(form.startDate, form.tenure);
  }, [form.startDate, form.tenure, isFlexibleCapital]);

  const estimatedInterest = useMemo(() => {
    if (isFlexibleCapital) return 0;
    return estimateInterest(form.amount, form.rate, form.tenure);
  }, [form.amount, form.rate, form.tenure, isFlexibleCapital]);

  const sourceAnalytics = useMemo(() => {
  const autoRecords = records.filter((item) => item.tag === "AUTO_EXECUTED");
  const manualRecords = records.filter((item) => item.tag !== "AUTO_EXECUTED");

  const sumAmount = (list) =>
    list.reduce((sum, item) => sum + Number(item.principal ?? item.amount ?? 0), 0);

  const sumInterest = (list) =>
    list.reduce((sum, item) => sum + Number(item.estimatedInterest || 0), 0);

  return {
    autoCount: autoRecords.length,
    autoAmount: sumAmount(autoRecords),
    autoInterest: sumInterest(autoRecords),
    autoROI: sumAmount(autoRecords) > 0
      ? (sumInterest(autoRecords) / sumAmount(autoRecords)) * 100
      : 0,

    manualCount: manualRecords.length,
    manualAmount: sumAmount(manualRecords),
    manualInterest: sumInterest(manualRecords),
    manualROI: sumAmount(manualRecords) > 0
      ? (sumInterest(manualRecords) / sumAmount(manualRecords)) * 100
      : 0,
  };
}, [records]);

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const keyword = search.trim().toLowerCase();
      const itemType = normalizeRecordType(item.recordType);

      const matchKeyword =
        !keyword ||
        String(item.id || "").toLowerCase().includes(keyword) ||
        String(item.bank || "").toLowerCase().includes(keyword) ||
        String(item.productName || "").toLowerCase().includes(keyword);

      const matchStatus =
        statusFilter === "ALL" ||
        String(item.status || "ACTIVE").toUpperCase() === statusFilter;

      const matchType = typeFilter === "ALL" || itemType === typeFilter;
      const matchSource =
  sourceFilter === "ALL" ||
  (sourceFilter === "AUTO_EXECUTED" && item.tag === "AUTO_EXECUTED") ||
  (sourceFilter === "MANUAL" && item.tag !== "AUTO_EXECUTED");

     return matchKeyword && matchStatus && matchType && matchSource;
    });
  }, [records, search, statusFilter, typeFilter, sourceFilter]);
  const resetForm = () => {
    setForm(makeDefaultForm());
    setEditingId("");
  };

  const updateRecordType = (value) => {
    const nextType = normalizeRecordType(value);
    const nextIsFlexible = isFlexibleType(nextType);

    setForm((prev) => ({
      ...prev,
      recordType: nextType,
      rate: nextIsFlexible ? "" : prev.rate,
      tenure: nextIsFlexible ? "" : prev.tenure,
      startDate: nextIsFlexible ? "" : prev.startDate,
    }));
  };

  const validateForm = () => {
    const normalizedType = normalizeRecordType(form.recordType);
    const flexible = isFlexibleType(normalizedType);

    if (!form.bank.trim()) {
      alert("Please enter Bank / Account.");
      return false;
    }

    if (!form.productName.trim()) {
      alert("Please enter Product Name.");
      return false;
    }

    if (Number(form.amount || 0) <= 0) {
      alert("Please enter Amount greater than 0.");
      return false;
    }

    if (!flexible) {
      if (Number(form.rate || 0) <= 0) {
        alert("Please enter FD Rate greater than 0.");
        return false;
      }

      if (Number(form.tenure || 0) <= 0) {
        alert("Please enter FD Tenure Months greater than 0.");
        return false;
      }

      if (!form.startDate) {
        alert("Please select FD Start Date.");
        return false;
      }
    }

    return true;
  };

  const handleSave = () => {
  if (!validateForm()) return;

  const normalizedType = normalizeRecordType(form.recordType);
  const flexiblePayload = isFlexibleType(normalizedType);

  const payload = {
    bank: form.bank.trim(),
    recordType: normalizedType,
    productName: form.productName.trim(),
    principal: Number(form.amount || 0),
    amount: Number(form.amount || 0),
    rate: flexiblePayload ? 0 : Number(form.rate || 0),
    tenure: flexiblePayload ? 0 : Number(form.tenure || 0),
    startDate: flexiblePayload ? "" : form.startDate,
    maturityDate: flexiblePayload ? "" : maturityDate,
    estimatedInterest: flexiblePayload ? 0 : Number(estimatedInterest || 0),
    status: form.status,
  };

  if (editingId) {
    onUpdateRecord?.({ ...payload, id: editingId });
  } else {
    const prefix =
      normalizedType === "SAVINGS"
        ? "SAV"
        : normalizedType === "PARKING_CASH"
        ? "CASH"
        : "FD";

    const nextId = buildNextId(records).replace("FD", prefix);

    onAddRecord?.({
      ...payload,
      id: nextId,
    });
  }

  resetForm();
};
  const handleEdit = (record) => {
    setEditingId(record.id);
    setForm(recordToForm(record));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (record) => {
    if (!window.confirm(`Delete record ${record.id}?`)) return;
    onDeleteRecord?.(record.id);
    if (editingId === record.id) resetForm();
  };

  const handleClose = (record) => {
    if (!window.confirm(`Close record ${record.id}?`)) return;
    onCloseRecord?.(record.id);
    if (editingId === record.id) resetForm();
  };

  const handleRollover = (record) => {
    if (isFlexibleType(record.recordType)) {
      alert("Savings / Parking Cash has no maturity or interest. Use Edit to redeploy it.");
      return;
    }

    const rolloverAmount =
      Number(record.principal || 0) + Number(record.estimatedInterest || 0);

    const newRecord = {
      id: buildNextId(records),
      bank: record.bank || "",
      recordType: "FD",
      productName: `${record.productName || "FD"} Rollover`,
      principal: rolloverAmount,
      rate: Number(record.rate || 0),
      tenure: Number(record.tenure || 0),
      startDate: "",
      maturityDate: "",
      estimatedInterest: estimateInterest(
        rolloverAmount,
        Number(record.rate || 0),
        Number(record.tenure || 0)
      ),
      status: "ACTIVE",
    };

    onRolloverRecord?.(newRecord);
  };

  const handleExportCsv = () => {
    if (!records.length) {
      alert("No records to export.");
      return;
    }

    const headers = [
      "id",
      "bank",
      "recordType",
      "productName",
      "principal",
      "rate",
      "tenure",
      "startDate",
      "maturityDate",
      "estimatedInterest",
      "status",
    ];

    const rows = records.map((record) =>
      headers.map((header) => csvEscape(record[header])).join(",")
    );

    const csv = `\uFEFF${headers.join(",")}\n${rows.join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `fd-wealth-engine-records-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportCsv = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = String(e.target?.result || "").replace(/^\uFEFF/, "");
      const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

      if (lines.length < 2) {
        alert("Invalid CSV file. Please check the file and try again.");
        return;
      }

      const headers = parseCsvLine(lines[0]).map((header) => header.trim());
      const existingIds = new Set(records.map((record) => String(record.id || "")));

      const imported = lines.slice(1).map((line, index) => {
        const values = parseCsvLine(line);
        const raw = {};

        headers.forEach((header, headerIndex) => {
          raw[header] = values[headerIndex] || "";
        });

        const requestedId = raw.id || "";
        const fallbackId =
          requestedId && !existingIds.has(requestedId)
            ? requestedId
            : buildNextId(records, index);

        existingIds.add(fallbackId);
        return normalizeImportedRecord(raw, fallbackId);
      });

      imported.forEach((record) => onAddRecord?.(record));
      alert(`Imported ${imported.length} record(s) successfully.`);

      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    reader.onerror = () => {
      alert("Unable to read this CSV file.");
    };

    reader.readAsText(file);
  };

  return (
    <div className="page">
      <section className="hero-card">
        <div className="hero-copy">
          <div className="eyebrow-pill">FD WEALTH ENGINE</div>
          <h1>Records</h1>
          <p>
            Manage fixed deposits, savings buckets and parking cash with a
            cleaner record workflow.
          </p>
        </div>

        <div className="hero-metric-card">
          <div className="hero-metric-label">TOTAL RECORDS</div>
          <div className="hero-metric-value">{records.length}</div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 0.95fr",
          gap: 24,
          marginTop: 24,
        }}
      >
        <div className="content-card">
          <div className="card-kicker">
            {editingId ? "EDIT RECORD" : "ADD RECORD"}
          </div>
          <h2>{editingId ? "Edit Placement" : "New Placement"}</h2>
          <p className="muted">
            {isFlexibleCapital
              ? "Savings and Parking Cash are flexible capital. Rate, tenure, maturity and interest are not shown."
              : "Create a new fixed deposit record with rate, tenure, maturity and interest."}
          </p>

          <div className="settings-form-grid" style={{ marginTop: 20 }}>
            <div className="field">
              <label>Bank / Account</label>
              <input
                className="input"
                placeholder="Example: CIMB / HLB / Maybank"
                value={form.bank}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, bank: e.target.value }))
                }
              />
            </div>

            <div className="field">
              <label>Record Type</label>
              <select
                value={form.recordType}
                onChange={(e) => updateRecordType(e.target.value)}
              >
                <option value="FD">FD</option>
                <option value="SAVINGS">SAVINGS</option>
                <option value="PARKING_CASH">PARKING CASH</option>
              </select>
            </div>

            <div className="field">
              <label>Product Name</label>
              <input
                className="input"
                placeholder={
                  currentType === "SAVINGS"
                    ? "Example: Free Cash"
                    : currentType === "PARKING_CASH"
                    ? "Example: Parking for Jul"
                    : "Example: 12M Placement"
                }
                value={form.productName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, productName: e.target.value }))
                }
              />
            </div>

            <div className="field">
              <label>Amount ({currency})</label>
              <input
                className="input"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
              />
            </div>

            {!isFlexibleCapital && (
              <>
                <div className="field">
                  <label>Rate (%)</label>
                  <input
                    className="input"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={form.rate}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        rate: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="field">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, status: e.target.value }))
                    }
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>

                <div className="field">
                  <label>Tenure Months</label>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={form.tenure}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        tenure: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="field">
                  <label>Start Date</label>
                  <input
                    className="input"
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="field">
                  <label>Maturity Date (Auto)</label>
                  <input
                    className="input"
                    value={formatDateDisplay(maturityDate)}
                    readOnly
                  />
                </div>

                <div className="field">
                  <label>Estimated Interest ({currency})</label>
                  <input
                    className="input"
                    value={formatMoney(estimatedInterest, currency)}
                    readOnly
                  />
                </div>
              </>
            )}

            {isFlexibleCapital && (
              <div className="field">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="button" className="btn-primary" onClick={handleSave}>
              {editingId ? "Update Record" : "Save Record"}
            </button>

            {editingId ? (
              <button
                type="button"
                className="btn-secondary"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            ) : null}
          </div>
        </div>

        <div className="content-card">
          <div className="card-kicker">RECORD MANAGEMENT</div>
          <h2>Portfolio Controls</h2>
          <p className="muted">
            Search, edit, close, rollover, delete, import and export CSV.
          </p>

          <div
            style={{
              background: "var(--panel)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: 18,
              marginTop: 20,
            }}
          >
            <div className="status-title">Banking Logic</div>
            <div className="status-subtitle" style={{ marginTop: 8 }}>
              FD earns interest and has maturity. Savings and Parking Cash are
              flexible capital with no rate, tenure, maturity or interest.
            </div>
          </div>

          <button
            type="button"
            className="btn-secondary"
            style={{ marginTop: 16, width: "100%" }}
            onClick={handleExportCsv}
          >
            Export CSV
          </button>

          <button
            type="button"
            className="btn-secondary"
            style={{ marginTop: 10, width: "100%" }}
            onClick={() => fileInputRef.current?.click()}
          >
            Import CSV
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            style={{ display: "none" }}
            onChange={handleImportCsv}
          />
        </div>
      </section>

      <section className="content-card" style={{ marginTop: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div className="card-kicker">RECORDS OVERVIEW</div>
            <h2>All Deposit Records</h2>
          </div>

          <div className="analytics-row">
         <div className="analytics-card">
          <span>AUTO EXECUTED</span>
           <strong>{formatMoney(sourceAnalytics.autoAmount, currency)}</strong>
         <small>
          ROI {sourceAnalytics.autoROI.toFixed(2)}% ·{" "}
          {sourceAnalytics.autoCount} record(s) · Interest{" "}
          {formatMoney(sourceAnalytics.autoInterest, currency)}
         </small>

        </div>

         <div className="analytics-card">
         <span>MANUAL</span>
         <strong>{formatMoney(sourceAnalytics.manualAmount, currency)}</strong>
        <small>
          ROI {sourceAnalytics.manualROI.toFixed(2)}% ·{" "}
          {sourceAnalytics.manualCount} record(s) · Interest{" "}
          {formatMoney(sourceAnalytics.manualInterest, currency)}
        </small>
        </div>
      </div>

          <div className="text-muted">{filteredRecords.length} record(s)</div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.7fr 0.7fr 0.7fr",
            gap: 16,
            marginTop: 20,
          }}
        >
          <input
            className="input"
            placeholder="Search by ID, bank or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="FD">FD</option>
            <option value="SAVINGS">SAVINGS</option>
            <option value="PARKING_CASH">PARKING CASH</option>
          </select>

          <select
           value={sourceFilter}
           onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="ALL">ALL</option>
            <option value="AUTO_EXECUTED">AUTO</option>
            <option value="MANUAL">MANUAL</option>
          </select>
        </div>

        <div style={{ marginTop: 20 }}>
          {filteredRecords.length === 0 ? (
           <div
              style={{
                background: "var(--panel)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: 28,
                textAlign: "center",
              }}
            >
              No records match your current filter.
            </div>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              {filteredRecords.map((item) => {
                const itemType = normalizeRecordType(item.recordType);
                const itemIsFlexible = isFlexibleType(itemType);

                return (
                  <div
                    key={item.id}
                    style={{
                      background: "var(--panel)",
                      border: "1px solid var(--border)",
                      borderRadius: 20,
                      padding: 20,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div className="status-title">
                        {item.id} · {item.bank || "-"}{" "}

                        {item.tag === "AUTO_EXECUTED" && (
                        <span className="tag-badge">AUTO</span>
                      )}
                      </div>
                        <div className="status-subtitle">
                          {item.productName || "-"} ·{" "}
                          {displayRecordType(item.recordType)}
                        </div>
                      </div>

                      <div className="status-badge">{item.status || "-"}</div>
                    </div>

                    {itemIsFlexible ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr",
                          gap: 14,
                          marginTop: 16,
                        }}
                      >
                        <div>
                          <div className="text-muted">Amount</div>
                          <div className="status-title" style={{ marginTop: 6 }}>
                            {formatMoney(item.principal ?? item.amount, currency)}
                          </div>
                        </div>

                        <div
                          style={{
                            background: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: 16,
                            padding: 14,
                          }}
                        >
                          <div className="text-muted">Workflow</div>
                          <div className="status-subtitle" style={{ marginTop: 6 }}>
                            {itemType === "SAVINGS"
                              ? "Flexible reserve. No rate, tenure, maturity or interest."
                              : "Ready to deploy. No rate, tenure, maturity or interest."}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 1fr)",
                            gap: 14,
                            marginTop: 16,
                          }}
                        >
                          <div>
                            <div className="text-muted">Amount</div>
                            <div className="status-title" style={{ marginTop: 6 }}>
                              {formatMoney(item.principal ?? item.amount, currency)}
                            </div>
                          </div>

                          <div>
                            <div className="text-muted">Rate</div>
                            <div className="status-title" style={{ marginTop: 6 }}>
                              {`${Number(item.rate || 0).toFixed(2)}%`}
                            </div>
                          </div>

                          <div>
                            <div className="text-muted">Tenure</div>
                            <div className="status-title" style={{ marginTop: 6 }}>
                              {`${item.tenure || 0}M`}
                            </div>
                          </div>

                          <div>
                            <div className="text-muted">Start Date</div>
                            <div className="status-title" style={{ marginTop: 6 }}>
                              {formatDateDisplay(item.startDate)}
                            </div>
                          </div>

                          <div>
                            <div className="text-muted">Maturity Date</div>
                            <div className="status-title" style={{ marginTop: 6 }}>
                              {formatDateDisplay(item.maturityDate)}
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 14,
                            marginTop: 14,
                          }}
                        >
                          <div
                            style={{
                              background: "var(--card)",
                              border: "1px solid var(--border)",
                              borderRadius: 16,
                              padding: 14,
                            }}
                          >
                            <div className="text-muted">Estimated Interest</div>
                            <div className="status-title" style={{ marginTop: 6 }}>
                              {formatMoney(item.estimatedInterest, currency)}
                            </div>
                          </div>

                          <div
                            style={{
                              background: "var(--card)",
                              border: "1px solid var(--border)",
                              borderRadius: 16,
                              padding: 14,
                            }}
                          >
                            <div className="text-muted">Workflow</div>
                            <div className="status-subtitle" style={{ marginTop: 6 }}>
                              Edit / Delete / Close / Rollover available.
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                        marginTop: 16,
                      }}
                    >
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>

                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => handleClose(item)}
                      >
                        Close
                      </button>

                      {!itemIsFlexible && (
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => handleRollover(item)}
                        >
                          Rollover
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
