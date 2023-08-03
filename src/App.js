import { TodoApp } from "./TodoApp";

export const tasksInit = [
  { id: 1, text: "Task 1", completed: false, priority: 1, category: "Work" },
  { id: 2, text: "Task 2", completed: true, priority: 3, category: "Personal" },
  {
    id: 3,
    text: "Task 3",
    completed: false,
    priority: 2,
    category: "Shopping",
  },
];

export default function App() {
  return (
    <div>
      <TodoApp></TodoApp>
    </div>
  );
}
