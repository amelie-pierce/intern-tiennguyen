import React, { useState, useContext } from "react";
import "./EditTask.css";
import { TaskContext } from "./TaskContext";

function EditTask({task}) {
    // Lấy các giá trị và hàm từ context
    const { updateTask, cancelEdit } = useContext(TaskContext);
    const [newTask, setNewTask] = useState(task.task); // Dùng task hiện tại làm giá trị ban đầu

    const handleChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newTask.trim() === "") return; // Nếu task là khoảng trắng thì không làm gì
        updateTask(task.id, newTask); // Cập nhật task
    };

    return (
        <form className="edit-task" onSubmit={handleSubmit}>
            <input
                type="text"
                value={newTask}
                onChange={handleChange}
                placeholder="Edit Task"
            />
            <button type="submit">Save</button>
            <button type="button" onClick={cancelEdit}>Cancel</button>
        </form>
    );
}

export default EditTask;
