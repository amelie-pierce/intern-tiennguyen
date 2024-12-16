import React, { useState} from "react";
// React: Nhập thư viện React để sử dụng tính năng React trong component
// useState: Hook để quản lý trạng thái trong function

function TaskForm({onAddTask, tasks}) {
// Tạo function TaskForm và truyền props:
// + onAddTask: Hàm callback được truyền từ component cha, dùng để thêm công việc
// + tasks: Danh sách công việc hiện có, được dùng để tạo ID duy nhất cho công việc mới 
    const [todo, setTodo] = useState("")
    // Tạo use useState với trạng thái mặc định là chuỗi rỗng - Lưu thông tin mà người dùng nhập vào

    const handleChange = (event) => {
        setTodo(event.target.value);
        // Lấy giá trị mới từ ô input
    };
    // Xử lý sự kiện khi người dùng nhập vào ô input

    const handleSubmit = (event) => {
        event.preventDefault();
        // Ngăn reload trang khi gửi form
        if (todo.trim() === "") return;
        // Nếu todo chỉ chứa khoảng trắng thì dừng sự kiện ( không thêm được )
        const newTask = { id: tasks.length, todo, status: false };
        // Tạo Object newTask đại diện cho công việc mới
        // + id: task.length -> STT của id dựa trên độ dài danh sách tasks
        onAddTask(newTask);
        // Gọi hàm callback onAddTask và truyền newTask làm tham số (Thêm công việc mới vào danh sách trong component cha)
        setTodo("");
        // Xóa nội dung trong input sau khi submit bằng cách đặt trạng thái về chuỗi rỗng
    }

    return(
        <form className="FormToDo" onSubmit={handleSubmit}>
        {/* Hiển thị biểu mẫu để người dùng nhập và thêm công việc */}
        {/*  Hàm handleSubmit để xử lý sự kiện khi người dùng nhấn nút Add */}
            <label htmlFor="todo">New Todo</label>
            {/* Hiển thị nhãn cho ô inout */}
            {/* htmlFor: Kết nối nhãn với ô input có id: todo (Khi click vào chữ "New Todo" thì tự nhảy tới ô input) */}
            <input 
                id="todo" 
                // Đặt id để kết nối với thẻ <label></label>
                type="text" 
                // Định nghĩa đây là ô nhập văn bản
                placeholder="New Todo"
                // Hiển thị gợi ý khi ô inout rỗng 
                value={todo} 
                // Liên kết ô input với trạng thái todo
                onChange={handleChange}
                // Xử lý sự kiện khi người dùng thay đổi nội dung trong ô input, cập nhập trạng thái 
            />
            <button type="submit">Add</button>
             {/* type="submit": Loại nút submit để kích hoạt sự kiện onSubmit của form */}
        </form>
    );
}

export default TaskForm;