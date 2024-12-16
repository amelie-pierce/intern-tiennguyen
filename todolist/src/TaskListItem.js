import React from "react";
// React: Nhập thư viện React để sử dụng tính năng React trong component

function TaskListItem({ task, onRemoveTask, onToggleTaskStatus }) {
// Tạo function TaskListItem và truyền props: 
// + task: Object chứa thông tin của một công việc: id: , todo, status: 
// + onRemoveTask: Hàm callback để xóa công việc
// + onToggleTaskStatus: Hàm callback để thay đổi trạng thái công việc
    return (
        <div>
            <input 
                type="checkbox" 
                // Định nghĩa input là loại checkbox
                checked={task.status} 
                // Kiểm tra trạng thái
                onChange={()=>onToggleTaskStatus(task.id)} 
                // Gọi hàm onToggleTaskStatus với task.id là tham số 
                // Xử lý sự kiện khi người dùng click vào checkbox
            />
            <li>
                {task.todo} - {task.status ? "Completed" : "Incomplete"}
                {/* Hiển thị danh sách: */}
                {/* + {task.todo}: Hiển thị tên công việc */}
                {/* + {task.status}: Toán tử ba ngôi - Nếu task.status là true thì hiển thị Completed và ngược lại */}
            </li>
            <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnhY_tishzTeujCDUzLrVq_ZIb7rIBZ9A8uQ&s" 
                onClick={()=>onRemoveTask(task.id)}
            />
            {/* Hình ảnh biểu thị cho xóa công việc */}
            {/* Xử lý sự kiện khi người dùng click vào ảnh thì gọi hàm onRemoTask với task.id là tham số và xóa công việc */}
        </div>
    );
}

export default TaskListItem;
// Xuất component dưới dạng mặc định từ file hiện tại