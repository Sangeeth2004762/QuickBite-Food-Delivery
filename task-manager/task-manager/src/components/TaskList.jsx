import TaskItem from "./TaskItem";
export default function TaskList({ tasks, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return (
      <section className="task-list-section">
        <h2 className="section-title">📋 Task List</h2>
        <div className="empty-state">
          <span className="empty-icon">🍽️</span>
          <p>No tasks found. Add a new task above!</p>
        </div>
      </section>
    );
  }
  return (
    <section className="task-list-section">
      <h2 className="section-title">📋 Task List</h2>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </section>
  );
}