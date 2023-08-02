import { useState } from "react";

const tasksInit = [
  { id: 1, text: "Task 1", completed: false, priority: 1 },
  { id: 2, text: "Task 2", completed: true, priority: 3 },
  { id: 3, text: "Task 3", completed: false, priority: 2 },
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
  const [filter, setFilter] = useState("All");

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

  function onFilterSelect(value) {
    setFilter(value);
  }

  return (
    <div className="todo-app">
      <h1> ✔️ My Todo List</h1>
      <TaskForm onTaskAdd={handleAddTask}></TaskForm>
      <FilterTasks filter={filter} onFilterSelect={onFilterSelect} />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
        onEditTask={handleEditTask}
        filter={filter}
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
  const [priority, setPriority] = useState("1");

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskText) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      priority: priority,
    };
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

      <select
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
      >
        <option key="1" value="1">
          1
        </option>
        <option key="2" value="2">
          2
        </option>
        <option key="3" value="3">
          3
        </option>
      </select>
      <button className="add-button">Add Task</button>
    </form>
  );
}

function TaskList({
  tasks,
  onDeleteTask,
  onToggleTask,
  onEditTask,
  filter,
  priority,
}) {
  let filteredTasks = tasks;
  if (filter === "Completed") {
    filteredTasks = tasks.filter((task) => task.completed === true);
  }

  if (filter === "Not Completed") {
    filteredTasks = tasks.filter((task) => task.completed === false);
  }

  let sortedTasks = filteredTasks;
  sortedTasks.sort((a, b) => a.priority - b.priority);

  return (
    <div className="task-list">
      <ul>
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onToggleTask={onToggleTask}
            onEditTask={onEditTask}
            priority={priority}
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

      <label className="priority">{task.priority}</label>

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

function FilterTasks({ filter, onFilterSelect }) {
  return (
    <div className="task-count-and-clear">
      <label>Fiter Tasks: </label>
      <select
        className="add-button"
        value={filter}
        onChange={(e) => onFilterSelect(e.target.value)}
      >
        <option key="1" value="All">
          All
        </option>
        <option key="2" value="Not Completed">
          Not Completed
        </option>
        <option key="3" value="Completed">
          Completed
        </option>
      </select>
    </div>
  );
}
