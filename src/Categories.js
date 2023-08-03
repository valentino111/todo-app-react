export function Categories({ categoryFilter, onCategoryFilterSelect }) {
  return (
    <div className="task-count-and-clear">
      <label>Filter by category: </label>
      <select
        className="add-button"
        value={categoryFilter}
        onChange={(e) => onCategoryFilterSelect(e.target.value)}
      >
        <option key="1" value="All">
          All
        </option>
        <option key="2" value="Personal">
          Personal
        </option>
        <option key="3" value="Work">
          Work
        </option>
        <option key="4" value="Shopping">
          Shopping
        </option>
      </select>
    </div>
  );
}
