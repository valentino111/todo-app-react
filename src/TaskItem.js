import { useState } from "react";

export function TaskItem({ task, onDeleteTask, onToggleTask, onEditTask }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskText, setTaskText] = useState(task.text);

  function handleSubmit(e) {
    e.preventDefault();

    onEditTask(task.id, taskText);
    setIsEditMode(false);
  }

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
      />

      <label
        className={`priority ${
          task.completed === true
            ? "completed"
            : task.priority === 1
            ? "high"
            : task.priority === 3
            ? "low"
            : ""
        }`}
      >
        {task.priority}
      </label>

      {!isEditMode && (
        <p className={`task-text ${task.completed ? "completed" : ""}`}>
          {task.text}
        </p>
      )}

      <div className="task-buttons">
        <p>{task.category}</p>

        {!isEditMode && (
          <button className="edit-button" onClick={() => setIsEditMode(true)}>
            Edit
          </button>
        )}

        {isEditMode && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="task-input"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            ></input>
            <button className="edit-button">Save</button>
          </form>
        )}

        <button
          className="complete-button"
          onClick={() => onToggleTask(task.id)}
        >
          Complete
        </button>

        <button className="delete-button" onClick={() => onDeleteTask(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
