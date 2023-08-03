import { useState } from "react";
import { tasksInit } from "./App";
import { Categories } from "./Categories";
import { FilterTasks } from "./FilterTasks";
import { TasksCount } from "./TasksCount";
import { ClearCompleted } from "./ClearCompleted";
import { TaskList } from "./TaskList";
import { TaskForm } from "./TaskForm";

export function TodoApp() {
  const [tasks, setTasks] = useState(tasksInit);
  const [filter, setFilter] = useState("All");
  const [filterByCategory, setFilterByCategory] = useState("All");

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

  function handleFilterSelect(value) {
    setFilter(value);
  }

  function handleCategoryFilterSelect(value) {
    setFilterByCategory(value);
  }

  return (
    <div className="todo-app">
      <h1 className="logo"> ✔️ My Todo List ✔️</h1>
      <TaskForm onTaskAdd={handleAddTask}></TaskForm>
      <FilterTasks filter={filter} onFilterSelect={handleFilterSelect} />
      <Categories
        categoryFilter={filterByCategory}
        onCategoryFilterSelect={handleCategoryFilterSelect}
      />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
        onEditTask={handleEditTask}
        filter={filter}
        filterByCategory={filterByCategory}
      ></TaskList>
      <div className="task-count-and-clear">
        <TasksCount tasks={tasks} />
        <ClearCompleted onClearCompleted={handleClearCompleted} />
      </div>
    </div>
  );
}
