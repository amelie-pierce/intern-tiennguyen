import './App.css';
import TaskList from './TaskList';
import { TaskProvider } from './TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className="App">
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
