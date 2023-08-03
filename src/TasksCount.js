export function TasksCount({ tasks }) {
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
