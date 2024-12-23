import React, { useState } from "react";
// React: Nhập thư viện React để sử dụng tính năng React trong component
// useState: Hook để quản lý trạng thái trong function
import TaskForm from "./TaskForm"
// Nhập component TaskForm để sử dụng
import TaskListItem from "./TaskListItem";
// Nhập component TaskListItem để sử dụng
import EditTask from "./EditTask";
// Nhập component EditTask để sử dụng
import { v4 as uuidv4 } from "uuid";
// Nhập thư viện uuid để tạo id duy nhất
import "./TaskList.css";
// Thêm CSS
import useReloadTask from "./useReloadTask";
//Nhập custom hook để sử dụng

function TaskList() {
// Tạo function TaskApp

    const [tasks, setTasks] = useReloadTask("tasks",[
    // Custom hook quản lý trạng thái lưu trữ vào localStorage
    // + "tasks": Key sử dụng trong localStorage để lưu trạng thái
    // [{...}, {...}]: Giá trị mặc định nếu không tìm thấy dữ liệu trong localStorage
        { id: uuidv4(), task: "Learn JavaScript", status: true},
        { id: uuidv4(), task: "Learn React", status: false}
    ]);
    // Tạo useState:
    // + tasks: Trạng thái hiện tại, lưu danh sách (tasks.). Nó lấy từ localStorage hoặc giá trị mặc định
    // + setTasks: Giá trị này được lưu trữ vào localStorage để duy trì qua các lần reload page

    const [editTask, setEditTask] = useState(null);
    // Tạo useState:
    // + editTask: Để lưu id công việc hiện tại đang được chỉnh sửa, giá trị ban đầu là null (không có công việc nào đang được chỉnh sửa)

    const addTask = (newTask) => {
        newTask.id = uuidv4();
        //Sau khi nhận được công việc (newTask) từ tham số truyền vào, dòng mã này gán một giá trị ID duy nhất cho newTask bằng cách gọi uuidv4()
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
    // Lặp qua từng phần tử trong mảng và trả về một mảng mới sau khi mỗi phần tử trong mảng tasks được truyền vào hàm callback dưới dạng task
            if(task.id === taskId) {
            // Nếu id của phần tử hiện tại bằng với id khi hàm được thực thi
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

    const startEdit = (id) => {
    // Hàm được gọi khi người dùng click img bút chì
    // Tham số id là id của công việc đang chỉnh sửa
        setEditTask(id);
        // Cập nhập trạng thái editTask thành id của công việc cần chỉnh sửa
    }

    const updateTask = (id, updatedTask) => {
    // Tham số id là id của công việc cần được cập nhập
    // Tham số updatedTask là nội dung mới của công việc
        const updatedTasks = tasks.map((tasks) => 
        // updatedTasks: Biến để lưu trữ danh sách công việc sau khi cập nhập
        // tasks.map() lặp qua từng công việc trong danh sách tasks
        // tasks: callback nhận từng phần tử công việc trong mảng tasks
            tasks.id === id ? {...tasks, task: updatedTask} : tasks
            // tasks.id: id của công việc hiện tại (trong vòng lặp map())
            // id: id của công việc muốn cập nhập (được truyền vào hàm updateTask) => Nếu tasks.id bằng id cập nhập thì thực hiện cập nhập
            // ...tasks: sao chép tất cả thuộc tính của công việc hiện tại
            // task: updateTask: ghi đè thuộc tính task bằng nội dung được truyền vào qua updatedTask
            // => Tạo một object mới. giữ nguyên tất cả các thuộc tính trù thuộc tính task
            // Nếu điều kiện sai thì giữ nguyên không thay đổi gì
        ); 
        setTasks(updatedTasks);
        // Cập nhập trạng thái công việc với danh sách mới
        setEditTask(null);
        // Đặt lại trạng thái editTask về null (kết thúc chỉnh sửa)
    };

    const cancelEdit = () => {
    // Hàm dùng để hủy trạng thái chỉnh sửa
        setEditTask(null);
        // Khi thực thi thì nó đặt lại trạng thái editTask về null, kết thúc chỉnh sửa mà không thay đổi gì
    }


    return (
        <div className="task-app">
        {/* Thẻ chứa toàn bộ nội dung  */}
            <h1>Task List</h1>
            {/* Tiêu đề  */}
            <span>A Simple React Task List</span> <hr/> 
            {/* Phụ đề */}
            {/* thẻ <hr> để tạo đường line */}
            <ul>
            {/* Tạo danh sách */}
                {tasks.map((task) => (
                // Lặp qua từng phần tử trong tasks và hiển thị. Trong đó task là mỗi Object trong mảng
                   <div key={task.id}>
                    {/* Để theo dõi từng id */}
                        {editTask === task.id ? (
                        // Kiểm tra công việc hiện có đang được chỉnh sửa không
                        // Nếu đúng thì hiển thị component EditTask
                        // Nếu sai thì hiển thị component TaskListItem
                            <EditTask
                                task={task}
                                // Truyền công việc hiện tại
                                onUpdate={updateTask}
                                // Prop xử lý khi người dùng lưu chỉnh sửa
                                onCancel={cancelEdit}
                                // Prop hủy chỉnh sửa
                            />
                        ) : (
                             <TaskListItem
                            // Gọi component TaskListItem
                                task={task}
                                // Truyền toàn bộ các Object vào prop task của component TaskListItem
                                onRemoveTask={removeTask}
                                // onRemoveTask là prop được truyền vào từ component TaskListItem và truyền hàm removeTask vào đây
                                onToggleTaskStatus={toggleTaskStatus}
                                // onToggleTaskStatus là prop được truyền vào từ component TaskListItem và truyền hàm toggleTaskStatus vào đây
                                onEdit={startEdit}
                            />
                        )}
                   </div>
                ))}
            </ul>
            <TaskForm onAddTask={addTask} tasks={tasks} />
            {/* onAddTask là prop được truyền vào từ component TaskForm và truyền hàm addTask*/}
            {/* tasks là prop được truyền vào từ component TaskForm để gọi mảng tasks*/}
        </div>
    );
}

export default TaskList;
// Xuất component dưới dạng mặc định từ file hiện tại