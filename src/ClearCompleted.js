export function ClearCompleted({ onClearCompleted }) {
  return (
    <button className="add-button" onClick={() => onClearCompleted()}>
      Clear Completed
    </button>
  );
}
