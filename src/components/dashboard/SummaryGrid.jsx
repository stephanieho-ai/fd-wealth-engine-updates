export default function SummaryGrid({ items = [] }) {
  return (
    <div className="summary-grid">
      {items.map((item, index) => (
        <div className="summary-card" key={item.label || index}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          {item.note && <small>{item.note}</small>}
        </div>
      ))}
    </div>
  );
}