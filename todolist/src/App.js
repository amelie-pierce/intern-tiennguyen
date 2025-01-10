import React from 'react';
import TaskList from './TaskList';
import { useTaskStorage } from './useTaskStorage';
import './App.css';
import TaskForm from './TaskForm';

function App() {
  const {
    tasks,
    loading,
    addTask,
    error,
    updateTask,
    deleteTask,
    toggleTask
  } = useTaskStorage();
  // Gọi custom hook để truy cập các trạng thái và phương thức để quản lý task

  return (
    <div className="app">
      <div className="app-container">
        <h1>Task List</h1>
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onToggle={toggleTask}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
        <TaskForm onAddTask={addTask} />
      </div>
    </div>
  );
}

export default App;
