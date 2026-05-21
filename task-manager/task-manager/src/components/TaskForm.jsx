import { useState } from "react";

const CATEGORIES = ["Cooking", "Delivery", "Admin", "Support", "Inventory"];
const PRIORITIES = ["High", "Medium", "Low"];

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Task title is required.";
    else if (title.trim().length < 3) e.title = "Title must be at least 3 characters.";
    if (!category) e.category = "Please select a category.";
    if (!priority) e.priority = "Please select a priority.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onAdd({ title: title.trim(), category, priority });
    setTitle("");
    setCategory("");
    setPriority("");
    setErrors({});
  };

  return (
    <section className={`task-form-section ${shake ? "shake" : ""}`}>
      <h2 className="section-title">➕ Add New Task</h2>
      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            id="title"
            type="text"
            placeholder="e.g. Prepare Chicken Biryani order #204"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setErrors((prev) => ({ ...prev, title: "" })); }}
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <span className="error-msg">{errors.title}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => { setCategory(e.target.value); setErrors((prev) => ({ ...prev, category: "" })); }}
              className={errors.category ? "input-error" : ""}
            >
              <option value="">-- Select Category --</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <span className="error-msg">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => { setPriority(e.target.value); setErrors((prev) => ({ ...prev, priority: "" })); }}
              className={errors.priority ? "input-error" : ""}
            >
              <option value="">-- Select Priority --</option>
              {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.priority && <span className="error-msg">{errors.priority}</span>}
          </div>
        </div>

        <button type="submit" className="btn-submit">Add Task</button>
      </form>
    </section>
  );
}
