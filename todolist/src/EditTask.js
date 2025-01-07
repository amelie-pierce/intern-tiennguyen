import React, { useState } from "react";
import "./EditTask.css"

function EditTask({ task, onUpdate, onCancel }) { 
// + task: công việc muốn chỉnh sửa
// + onUpdate: Hàm lưu thông tin công việc và được gọi khi người dùng click button save
// + onCancel: Hàm hủy chỉnh sửa và được gọi khi người dùng click button cancel

    const [newTasks, setNewTasks] = useState(task.task);

    const handleChange = (event) => {
        setNewTasks(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newTasks === "") return;
        // Nếu task chỉ chứa khoảng trắng thì dừng sự kiện ( không thêm được )
        onUpdate(task.id, newTasks);
    };

    return (
        <form className="edit-task" onSubmit={handleSubmit}>
            <input
                type="text"
                value={newTasks}
                onChange={handleChange}
                placeholder="Edit Task"
            />
            <button type="submit">Save</button>
            {/* type="submit": Chỉ định rằng nút này có nhiệm vụ gửi biểu mẫu (form). Khi người dùng bấm vào nút này */}
            {/* Sự kiện onSubmit của thẻ <form> được kích hoạt. */}
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}

export default EditTask;