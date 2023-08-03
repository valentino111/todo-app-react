export function FilterTasks({ filter, onFilterSelect }) {
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
