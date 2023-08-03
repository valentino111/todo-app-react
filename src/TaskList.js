import { TaskItem } from "./TaskItem";

const categoriesList = ["Personal", "Work", "Shopping"];

export function TaskList({
  tasks,
  onDeleteTask,
  onToggleTask,
  onEditTask,
  filter,
  filterByCategory,
}) {
  // Filter tasks based on the selected filter
  let filteredTasks = tasks.slice();
  if (filter === "Completed") {
    filteredTasks = tasks.filter((task) => task.completed === true);
  }

  if (filter === "Not Completed") {
    filteredTasks = tasks.filter((task) => task.completed === false);
  }

  // Filter tasks based on the selected category
  if (filterByCategory !== "All") {
    filteredTasks = filteredTasks.filter(
      (task) => task.category === filterByCategory
    );
  }

  let sortedTasks = filteredTasks.slice();
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
          />
        ))}
      </ul>
    </div>
  );
}
