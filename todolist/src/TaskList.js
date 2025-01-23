import React, { useState } from "react";
import { useTasks, useTasksDispatch } from "./TasksContext";
import "./TaskList.css";
import { customMap } from "./utils";

export default function TaskList() {
  const tasks = useTasks();
  const dispatch = useTasksDispatch();

  return (
    <ul>
      {customMap(tasks,(task) => (
        <li key={task.id}>
          <Task task={task} dispatch={dispatch} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task.task);
  const dispatch = useTasksDispatch();

  const handleSave = () => {
    dispatch({ type: "update", id: task.id, updatedTask: newTask });
    setIsEditing(false);
  };

  return (
    <div className="task-list">
        <input
          type="checkbox"
          checked={task.status}
          onChange={() => dispatch({ type: "toggleStatus", id: task.id })}
        />
      {isEditing ? (
        <>
          <input
            className="input-edit"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="save" onClick={handleSave}>Save</button>
          <button type="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span className="task-text">{task.task}</span>
          <span>- {task.status ? "Completed" : "Incomplete"}</span>
           <img
                style={{ width: "30px", height: "30px" }}
                src="https://icon-library.com/images/edit-icon-image/edit-icon-image-29.jpg"
                alt="img-edit-task"
                onClick={() => setIsEditing(true)} 
            />
        </>
      )}
      {!isEditing && (
        <img
            style={{ width: "30px", height: "30px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnhY_tishzTeujCDUzLrVq_ZIb7rIBZ9A8uQ&s"
            alt="img-remove-task"
            onClick={() => dispatch({ type: "delete", id: task.id })}
        />
      )}
    </div>
  );
}

