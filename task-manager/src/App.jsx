import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Summary from "./components/Summary";
import "./App.css";
export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("quickbite-tasks");
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Prepare Biryani Order", category: "Cooking", priority: "High", done: false },
      { id: 2, title: "Assign delivery partner", category: "Delivery", priority: "Medium", done: false },
      { id: 3, title: "Update menu pricing", category: "Admin", priority: "Low", done: true },
    ];
  });
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    localStorage.setItem("quickbite-tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const pending = tasks.filter((t) => !t.done).length;
    document.title = pending > 0 ? `QuickBite (${pending} pending)` : "QuickBite | Task Manager";
  }, [tasks]);
  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now(), done: false }]);
  };
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };
  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };
  const filteredTasks = tasks.filter((t) => {
    if (filter === "Pending") return !t.done;
    if (filter === "Completed") return t.done;
    return true;
  });
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Summary tasks={tasks} filter={filter} setFilter={setFilter} />
        <TaskForm onAdd={addTask} />
        <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleDone} />
      </main>
    </div>
  );
}
