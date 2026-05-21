const PRIORITY_COLORS = {
  High: "#ef4444",
  Medium: "#f97316",
  Low: "#22c55e",
};
const CATEGORY_ICONS = {
  Cooking: "👨‍🍳",
  Delivery: "🚴",
  Admin: "📊",
  Support: "🎧",
  Inventory: "📦",
};
export default function TaskItem({ task, index, onDelete, onToggle }) {
  return (
    <li
      className={`task-item ${task.done ? "task-done" : ""}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <button
        className={`check-btn ${task.done ? "checked" : ""}`}
        onClick={() => onToggle(task.id)}
        aria-label="Toggle done"
      >
        {task.done ? "✓" : ""}
      </button>
      <div className="task-info">
        <span className="task-title">{task.title}</span>
        <div className="task-meta">
          <span className="task-category">
            {CATEGORY_ICONS[task.category] || "📌"} {task.category}
          </span>
          <span
            className="task-priority"
            style={{ color: PRIORITY_COLORS[task.priority] }}
          >
            ● {task.priority}
          </span>
        </div>
      </div>
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        🗑️
      </button>
    </li>
  );
}
