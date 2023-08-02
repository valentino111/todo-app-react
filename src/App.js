import { useState } from "react";

const tasksInit = [
  { id: 1, text: "Task 1", completed: false },
  { id: 2, text: "Task 2", completed: true },
  { id: 3, text: "Task 3", completed: false },
];

export default function App() {
  return (
    <div>
      <TodoApp></TodoApp>
    </div>
  );
}

function TodoApp() {
  const [tasks, setTasks] = useState(tasksInit);

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleToggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleEditTask(id, newText) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  }

  function handleClearCompleted() {
    setTasks(tasks.filter((task) => !task.completed));
  }

  return (
    <div className="todo-app">
      <h1> ✔️ My Todo List</h1>
      <TaskForm onTaskAdd={handleAddTask}></TaskForm>
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
        onEditTask={handleEditTask}
      ></TaskList>
      <div className="task-count-and-clear">
        <TasksCount tasks={tasks} />
        <ClearCompleted onClearCompleted={handleClearCompleted} />
      </div>
    </div>
  );
}

function TaskForm({ onTaskAdd }) {
  const [taskText, setTaskText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskText) return;

    const newTask = { id: Date.now(), text: taskText, completed: false };
    onTaskAdd(newTask);
    setTaskText("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      ></input>

      <button className="add-button">Add Task</button>
    </form>
  );
}

function TaskList({ tasks, onDeleteTask, onToggleTask, onEditTask }) {
  return (
    <div className="task-list">
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onToggleTask={onToggleTask}
            onEditTask={onEditTask}
          />
        ))}
      </ul>
    </div>
  );
}

function TaskItem({ task, onDeleteTask, onToggleTask, onEditTask }) {
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

      {!isEditMode && (
        <p className={`task-text ${task.completed ? "completed" : ""}`}>
          {task.text}
        </p>
      )}

      <div className="task-buttons">
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

function ClearCompleted({ onClearCompleted }) {
  return (
    <button className="add-button" onClick={() => onClearCompleted()}>
      Clear Completed
    </button>
  );
}

function TasksCount({ tasks }) {
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div>
      <p>
        <label>Tasks: </label>
        <label>{tasks.length}</label>
      </p>
      <p>
        <label>Completed: </label>
        <label>{completedTasks}</label>
      </p>
    </div>
  );
}
