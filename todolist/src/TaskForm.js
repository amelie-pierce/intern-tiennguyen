import React, { useState } from "react";
// React: Nhập thư viện React để sử dụng tính năng React trong component
// useState: Hook để quản lý trạng thái trong function
import { v4 as uuidv4 } from "uuid";
// Nhập thư viện uuid để tạo id duy nhất
import "./TaskForm.css"
// Nhập file CSS
import { TaskContext } from "./TaskContext";
import { useContext } from "react";

function TaskForm() {
// + onAddTask: Hàm callback được truyền từ component cha, dùng để thêm công việc

    const {addTask} = useContext(TaskContext)

    const [task, setTask] = useState("")

    const handleChange = (event) => {
        setTask(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (task.trim() === "") return;
        const newTask = { id: uuidv4(), task, status: false };
        addTask(newTask);
        // Gọi hàm callback onAddTask và truyền newTask làm tham số (Thêm công việc mới vào danh sách trong component cha)
        setTask("");
    }

    return(
        <form className="task-form" onSubmit={handleSubmit}>
            <label htmlFor="task">New Task</label>
            {/* htmlFor: Kết nối nhãn với ô input có id: task (Khi click vào chữ "New Task" thì tự nhảy tới ô input) */}
            <div className="form">
                <input 
                id="task" 
                type="text" 
                placeholder="New Task"
                value={task} 
                onChange={handleChange}
            />
            <button type="submit">Add</button>
             {/* type="submit": Loại nút submit để kích hoạt sự kiện onSubmit của form */}
            </div>
        </form>
    );
}

export default TaskForm;