import React, { useState } from "react";
// React: Nhập thư viện React để sử dụng tính năng React trong component
// useState: Hook để quản lý trạng thái trong function
import TaskForm from "./TaskForm"
// Nhập component TaskForm để sử dụng
import TaskListItem from "./TaskListItem";
// Nhập component TaskListItem để sử dụng

function ToDoApp() {
// Tạo function ToDoApp

    const [tasks, setTasks] = useState([
        { id: 0, todo: "Learn JavaScript", status: true},
        { id: 1, todo: "Learn React", status: false}
    ]);
    // Tạo useState:
    // + tasks: Trạng thái ban đầu có mảng chứa 2 Object
    // + setTasks: Hàm để cập nhập trạng thái task

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    }
    // Tạo hàm addTask nhận tham số newTask
    // setTasks: cập nhập trạng thái thêm tasks mới vào mảng
    // + ...tasks: sao chép toàn bộ phần tử trong mảng tasks
    // + newTask: thêm mới các phần tử vào cuối mảng   

    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id))
    }
    // Tạo hàm removeTask nhận tham số id
    // setTasks: cập nhập trạng thái xóa tasks trong mảng
    // + tasks.filter(task => task.id !== id): Trả về mảng mới chỉ chứa các phần tử đáp ứng điều kiện của hàm callback 

    const toggleTaskStatus = (taskId) => {
    // Tạo hàm toggleTaskStatus nhận tham số taskId
        const updatedTasks = tasks.map((task) => {
    // Lặp qua từng phần tử trong mảng và trả về một mảng mới sau khi mỗi tử trong mảng tasks được truyền vào hàm callback dưới dạng task
            if(task.id === taskId) {
            // Nếu id của phần tử hiện tại bằng với id khi hàm được thi
                task.status = !task.status
                // Đảo ngược trạng thái: true đổi thành false và ngược lại
            }
            return {
                ...task,
            }
            // Sau khi xử lý trạng thái thì hàm trả về về Object mới với (...task) sao chép tất các thuộc tính của Object ban đầu vào 1 Object mới
        })
        setTasks(updatedTasks)
        // Cập nhập trạng thái với giá trị mới
    }


    return (
        <div>
        {/* Thẻ chứa toàn bộ nội dung  */}
            <h1>Todo App</h1>
            {/* Tiêu đề  */}
            <span>Task Checking Application</span>
            {/* Phụ đề */}
            <ul>
            {/* Tạo danh sách */}
                {tasks.map((task) => (
                // Lặp qua từng phần tử trong tasks và hiển thị. Trong đó t là mỗi Object trong mảng
                    <TaskListItem
                    // Gọi component TaskListItem
                        key={task.id}
                        // Để xác định từng phần tử trong mảng có 1 id duy nhất
                        task={task}
                        // Truyền toàn bộ các Object vào prop task của component TaskListItem
                        onRemoveTask={removeTask}
                        // onRemoveTask là prop được truyền vào từ component TaskListItem và truyền hàm removeTask vào đây
                        onToggleTaskStatus={toggleTaskStatus}
                        // onToggleTaskStatus là prop được truyền vào từ component TaskListItem và truyền hàm toggleTaskStatus vào đây
                    />
                ))}
            </ul>
            <TaskForm onAddTask={addTask} tasks={tasks} />
            {/* onAddTask là prop được truyền vào từ component TaskForm và truyền hàm addTask*/}
            {/* tasks là prop được truyền vào từ component TaskForm để gọi mảng tasks*/}
        </div>
    );
}

export default ToDoApp;
// Xuất component dưới dạng mặc định từ file hiện tại