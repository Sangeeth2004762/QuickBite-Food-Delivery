export default function Summary({ tasks, filter, setFilter }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  const pending = total - completed;
  const filters = ["All", "Pending", "Completed"];
  return (
    <section className="summary">
      <div className="stat-cards">
        <div className="stat-card stat-total">
          <span className="stat-num">{total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card stat-pending">
          <span className="stat-num">{pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card stat-done">
          <span className="stat-num">{completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>
      <div className="filter-tabs">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
    </section>
  );
}
