import { useMemo, useState } from "react";

const STORAGE_KEY = "fdOffers";

const EMPTY_FORM = {
  id: "",
  bank: "",
  tenureMonths: "",
  ratePa: "",
  minAmount: "",
  currency: "MYR",
  effectiveUntil: "",
  status: "ACTIVE",
  note: "",
};

function formatMoney(value, currency = "MYR") {
  const amount = Number(value || 0);
  return `${currency} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function makeOfferId(existingOffers) {
  const next = existingOffers.length + 1;
  return `OFFER${String(next).padStart(3, "0")}`;
}

export default function RatesPage() {
  const [offers, setOffers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const saveOffers = (nextOffers) => {
    setOffers(nextOffers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOffers));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateOffer = () => {
    if (!form.bank.trim()) {
      alert("Please enter bank name.");
      return false;
    }

    if (Number(form.tenureMonths) <= 0) {
      alert("Please enter tenure months greater than 0.");
      return false;
    }

    if (Number(form.ratePa) <= 0) {
      alert("Please enter rate greater than 0.");
      return false;
    }

    if (Number(form.minAmount) < 0) {
      alert("Minimum amount cannot be negative.");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateOffer()) return;

    const normalizedOffer = {
      id: editingId || makeOfferId(offers),
      bank: form.bank.trim(),
      tenureMonths: Number(form.tenureMonths),
      ratePa: Number(form.ratePa),
      minAmount: Number(form.minAmount || 0),
      currency: form.currency || "MYR",
      effectiveUntil: form.effectiveUntil || "",
      status: form.status || "ACTIVE",
      note: form.note.trim(),
      updatedAt: new Date().toISOString(),
    };

    if (editingId) {
      saveOffers(
        offers.map((offer) =>
          offer.id === editingId ? normalizedOffer : offer
        )
      );
    } else {
      saveOffers([...offers, normalizedOffer]);
    }

    resetForm();
  };

  const handleEdit = (offer) => {
    setEditingId(offer.id);
    setForm({
      id: offer.id,
      bank: offer.bank || "",
      tenureMonths: offer.tenureMonths || "",
      ratePa: offer.ratePa || "",
      minAmount: offer.minAmount || "",
      currency: offer.currency || "MYR",
      effectiveUntil: offer.effectiveUntil || "",
      status: offer.status || "ACTIVE",
      note: offer.note || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    const ok = confirm("Delete this offer?");
    if (!ok) return;

    saveOffers(offers.filter((offer) => offer.id !== id));

    if (editingId === id) resetForm();
  };

  const filteredOffers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return offers
      .filter((offer) => {
        if (!keyword) return true;

        return (
          String(offer.bank || "").toLowerCase().includes(keyword) ||
          String(offer.tenureMonths || "").includes(keyword) ||
          String(offer.ratePa || "").includes(keyword) ||
          String(offer.currency || "").toLowerCase().includes(keyword) ||
          String(offer.status || "").toLowerCase().includes(keyword)
        );
      })
      .sort((a, b) => {
        if (a.status !== b.status) return a.status === "ACTIVE" ? -1 : 1;
        return Number(b.ratePa || 0) - Number(a.ratePa || 0);
      });
  }, [offers, search]);

  const bestOffer = useMemo(() => {
    const active = offers.filter((offer) => offer.status === "ACTIVE");
    if (!active.length) return null;

    return active.reduce(
      (best, offer) => (Number(offer.ratePa) > Number(best.ratePa) ? offer : best),
      active[0]
    );
  }, [offers]);

  return (
    <div className="page bank-dashboard-page">
      <section className="hero-card bank-hero dashboard-hero">
        <div className="hero-left">
          <div className="hero-badge">V31 RATE INTELLIGENCE</div>
          <h1 className="bank-title">Rates Center</h1>
          <p className="bank-subtitle">
            Manage FD offers, compare rates, and prepare your ladder placement decisions.
          </p>
        </div>

        <div className="hero-right">
          <div className="metric-card bank-main-metric dashboard-main-metric">
            <span>BEST ACTIVE RATE</span>
            <strong>
              {bestOffer ? `${bestOffer.ratePa.toFixed(2)}%` : "N/A"}
            </strong>
          </div>
        </div>
      </section>

      <div className="dashboard-two-col">
        <section className="bank-panel">
          <div className="bank-panel-head">
            <div>
              <div className="panel-kicker">ADD OFFER</div>
              <h3>{editingId ? "Edit Rate Offer" : "New Rate Offer"}</h3>
            </div>
            <small>{editingId ? editingId : "Manual confirmed data"}</small>
          </div>

          <div className="form-grid">
            <div className="field">
              <label>Bank</label>
              <input
                className="input"
                value={form.bank}
                placeholder="Example: CIMB / HLB / Maybank"
                onChange={(e) => updateForm("bank", e.target.value)}
              />
            </div>

            <div className="field">
              <label>Currency</label>
              <select
                className="input"
                value={form.currency}
                onChange={(e) => updateForm("currency", e.target.value)}
              >
                <option>MYR</option>
                <option>USD</option>
                <option>SGD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>AUD</option>
                <option>JPY</option>
                <option>CNY</option>
                <option>HKD</option>
              </select>
            </div>

            <div className="field">
              <label>Tenure Months</label>
              <input
                className="input"
                type="number"
                min="1"
                value={form.tenureMonths}
                placeholder="Example: 6"
                onChange={(e) => updateForm("tenureMonths", e.target.value)}
              />
            </div>

            <div className="field">
              <label>Rate (% p.a.)</label>
              <input
                className="input"
                type="number"
                min="0"
                step="0.01"
                value={form.ratePa}
                placeholder="Example: 3.65"
                onChange={(e) => updateForm("ratePa", e.target.value)}
              />
            </div>

            <div className="field">
              <label>Minimum Amount</label>
              <input
                className="input"
                type="number"
                min="0"
                value={form.minAmount}
                placeholder="Example: 10000"
                onChange={(e) => updateForm("minAmount", e.target.value)}
              />
            </div>

            <div className="field">
              <label>Effective Until</label>
              <input
                className="input"
                type="date"
                value={form.effectiveUntil}
                onChange={(e) => updateForm("effectiveUntil", e.target.value)}
              />
            </div>

            <div className="field">
              <label>Status</label>
              <select
                className="input"
                value={form.status}
                onChange={(e) => updateForm("status", e.target.value)}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="EXPIRED">EXPIRED</option>
              </select>
            </div>

            <div className="field">
              <label>Note</label>
              <input
                className="input"
                value={form.note}
                placeholder="Example: promo FD rate"
                onChange={(e) => updateForm("note", e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            <button className="primary-btn" onClick={handleSave}>
              {editingId ? "Update Offer" : "Save Offer"}
            </button>

            {editingId && (
              <button className="btn-secondary" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </section>

        <section className="bank-panel">
          <div className="bank-panel-head">
            <div>
              <div className="panel-kicker">RATE ADVISOR</div>
              <h3>Best Offer Snapshot</h3>
            </div>
            <small>Active offers only</small>
          </div>

          {bestOffer ? (
            <div className="signal-card tone-green">
              <h4>
                {bestOffer.bank} · {bestOffer.tenureMonths}M ·{" "}
                {Number(bestOffer.ratePa).toFixed(2)}%
              </h4>
              <p>
                Minimum: {formatMoney(bestOffer.minAmount, bestOffer.currency)}
              </p>
              <p>
                Effective until: {bestOffer.effectiveUntil || "Not specified"}
              </p>
              <p>{bestOffer.note || "No note"}</p>
            </div>
          ) : (
            <div className="signal-card tone-blue">
              <h4>No active offer yet</h4>
              <p>Add your first bank FD offer to activate rate comparison.</p>
            </div>
          )}

          <div className="signal-card tone-blue" style={{ marginTop: 16 }}>
            <h4>Next upgrade</h4>
            <p>
              Later we can connect this Rates Center to the Ladder Engine, so the app
              can suggest the best tenure and bank for each target maturity month.
            </p>
          </div>
        </section>
      </div>

      <section className="bank-panel" style={{ marginTop: 24 }}>
        <div className="bank-panel-head">
          <div>
            <div className="panel-kicker">ACTIVE OFFERS</div>
            <h3>FD Rate Offers</h3>
          </div>
          <small>{offers.length} offer(s)</small>
        </div>

        <input
          className="input"
          placeholder="Search by bank, tenure, rate, currency or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 18 }}
        />

        <div className="projection-list">
          {filteredOffers.length ? (
            filteredOffers.map((offer) => (
              <div key={offer.id} className="projection-card">
                <div className="projection-month">
                  {offer.id} · {offer.bank}
                </div>

                <div className="projection-note">
                  Tenure: {offer.tenureMonths} months
                </div>

                <div className="projection-note">
                  Rate: {Number(offer.ratePa || 0).toFixed(2)}% p.a.
                </div>

                <div className="projection-note">
                  Minimum Amount: {formatMoney(offer.minAmount, offer.currency)}
                </div>

                <div className="projection-note">
                  Effective Until: {offer.effectiveUntil || "Not specified"}
                </div>

                <div className="projection-note">Status: {offer.status}</div>

                {offer.note && (
                  <div className="projection-note">Note: {offer.note}</div>
                )}

                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <button
                    className="btn-secondary"
                    onClick={() => handleEdit(offer)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn-secondary"
                    onClick={() => handleDelete(offer.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="signal-card tone-blue">
              <h4>No offers found</h4>
              <p>Add an offer or change your search keyword.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}