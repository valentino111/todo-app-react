import { useState } from "react";

export function TaskForm({ onTaskAdd }) {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState(1);
  const [category, setCategory] = useState("Personal");

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskText) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      priority: priority,
      category: category,
    };
    onTaskAdd(newTask);
    setTaskText("");
    setPriority(1);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add new Task"
      ></input>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option key="1" value="Personal">
          Personal
        </option>
        <option key="2" value="Work">
          Work
        </option>
        <option key="3" value="Shopping">
          Shopping
        </option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
      >
        <option value={1}>High</option>
        <option value={2}>Medium</option>
        <option value={3}>Low</option>
      </select>
      <button className="add-button">Add Task</button>
    </form>
  );
}
