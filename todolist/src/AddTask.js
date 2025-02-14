import React, { useState } from "react";
import { useTasksDispatch } from "./TasksContext";
import './AddTask.css'

export default function AddTask() {
  const [task, setTask] = useState("");
  const dispatch = useTasksDispatch();

  const handleAddTask = (event) => {
    event.preventDefault();
    if (task.trim() === "") return;
    dispatch({ type: "add", task });
<<<<<<< HEAD
    setTask(""); 
=======
    setTask(""); // Reset input field
>>>>>>> d1ecd39c1a8d629e1267d9a123cf9bf9fa4c7261
  };

  return (
    <form className="add-task">
        <label htmlFor="new-task">New Task</label>
      <div className="form-input">
      <input
        id="new-task"
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      </div>
    </form>
  );
}
