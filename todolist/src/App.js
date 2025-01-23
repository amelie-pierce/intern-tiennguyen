import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';
import './App.css'

export default function App() {
  return (
    <TasksProvider>
        <h1>Task List</h1>
        <span>A Simple React Task List</span> <hr />
      <TaskList />
      <AddTask />
    </TasksProvider>
  );
}
