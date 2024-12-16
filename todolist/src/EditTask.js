import React, { useState } from "react";
// React: Nhập thư viện React để sử dụng tính năng React trong component

function EditTask({ task, onUpdate, onCancel }) {
// Tạo function EditTask và nhận 3 props: 
// + task: công việc muốn chỉnh sửa
// + onUpdate: Hàm lưu thông tin công việc và được gọi khi người dùng click button save
// + onCancel: Hàm hủy chỉnh sửa và được gọi khi người dùng click button cancel

    const [newTasks, setNewTasks] = useState(task.task);
    // newTasks: lưu giá trị công việc mà người dùng nhập vào ô input (ban đầu là tên công việc hiện tại)
    // setNewTasks: Cập nhập giá trị newTasks. Được gọi khi người dùng thay đổi nội dung trong input

    const handleChange = (event) => {
        setNewTasks(event.target.value);
        // event.target,value: Lấy giá trị mà người dùng nhập vào input
        // setNewTasks: Cập nhập giá trị của newTasks với giá trị mới nhập vào
    };

    const handleSubmit = (event) => {
    // Hàm xử lý sự kiện khi người dùng gửi form ( click button Save )
        event.preventDefault();
        // Ngăn reload trang khi gửi form
        if (newTasks.trim() === "") return;
        // Nếu task chỉ chứa khoảng trắng thì dừng sự kiện ( không thêm được )
        onUpdate(task.id, newTasks);
        // Gọi hàm onUpdate được truyền từ component cha để cập nhập công việc:
        // + task.id: id của công việc cần cập nhập (xác định công việc cần thay đổi)
        // + newTasks: Giá trị mới mà dùng nhập vào
    };

    return (
        <form className="EditTask" onSubmit={handleSubmit}>
        {/* Hiển thị biểu mẫu để người dùng nhập và chỉnh sửa công việc */}
        {/* onSubmit={handleSubmit}: Gọi hàm handleSubmit khi người dùng click button Save */}
            <input
                type="text"
                // Dạng nhập liệu text
                value={newTasks}
                // Liên kết giá trị của input với newTasks. Khi newTasks thay đổi thì input thay đổi theo
                onChange={handleChange}
                // Khi người dùng thay đổi nội dung trong input, hàm handleChange sẽ được gọi để cập nhập giá trị newTasks
                placeholder="Edit Task"
                // Hiển thị văn bản Edit Task trong input khi không có gì
            />
            <button type="submit">Save</button>
            {/* Gọi hàm handleSubmit để lau các thay đổi khi người dùng click button Save */}
            <button type="button" onClick={onCancel}>Cancel</button>
            {/* Gọi hàm cancel để huy chỉnh sửa khi người dùng click button Cancel */}
        </form>
    );
}

export default EditTask;