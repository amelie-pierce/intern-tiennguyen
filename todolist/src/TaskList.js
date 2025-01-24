import React, { useState } from "react";
import { useTasks, useTasksDispatch } from "./TasksContext";
import "./TaskList.css";
import { customMap } from "./utils";

export default function TaskList() {
  const tasks = useTasks();
  //Lấy danh sách tasks từ TasksContext từ hook useTasks

  return (
    <ul>
      {customMap(tasks,(task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task.task);
  // state lưu task mới khi chỉnh sửa
  const dispatch = useTasksDispatch();
  // Lấy hàm dispatch từ TasksContext

  const handleSave = () => {
    dispatch({ type: "update", id: task.id, updatedTask: newTask });
    // Gửi hành động để cập nhập tên task
    // updateTask: newTask - Tên task mới sau khi chỉnh sửa
    setIsEditing(false);
  };

  let deleteIcon = null;
  if (!isEditing) {
    deleteIcon = (
      <img
        style={{ width: "30px", height: "30px" }}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnhY_tishzTeujCDUzLrVq_ZIb7rIBZ9A8uQ&s"
        alt="img-remove-task"
        onClick={() => dispatch({ type: "delete", id: task.id })}
      />
    );
  }

  return (
    <div className="task-list">
        <input
          type="checkbox"
          checked={task.status}
          onChange={() => dispatch({ type: "toggleStatus", id: task.id })}
        />
      {isEditing ? (
        // Kiểm tra state chỉnh sửa: Nếu false thì hiển thị giao diện chỉnh sửa, false thì hiển thị danh sách task
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
      {deleteIcon}
    </div>
  );
}

