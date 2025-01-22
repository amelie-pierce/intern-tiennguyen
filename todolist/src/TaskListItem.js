import React, { useContext } from "react";
import "./TaskListItem.css";
import { TaskContext } from "./TaskContext";

function TaskListItem({ task }) {
    // Lấy các hàm từ context
    const { removeTask, toggleTaskStatus, startEdit } = useContext(TaskContext);

    return (
        <div className="task-list-item">
            <input
                type="checkbox"
                checked={task.status}
                onChange={() => toggleTaskStatus(task.id)}
            />
            <span className="task-text">{task.task}</span>
            <span>- {task.status ? "Completed" : "Incomplete"}</span>
            <img
                style={{ width: "30px", height: "30px" }}
                src="https://icon-library.com/images/edit-icon-image/edit-icon-image-29.jpg"
                alt="img-edit-task"
                onClick={() => startEdit(task.id)} // Bắt đầu chỉnh sửa công việc
            />
            <img
                style={{ width: "30px", height: "30px" }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnhY_tishzTeujCDUzLrVq_ZIb7rIBZ9A8uQ&s"
                alt="img-remove-task"
                onClick={() => removeTask(task.id)} // Xóa công việc
            />
        </div>
    );
}

export default TaskListItem;
