import React, { useState } from "react";
// React: Nhập thư viện React để sử dụng tính năng React trong component
// useState: Hook để quản lý trạng thái trong function
import FormToDo from "./FormToDo";
// Nhập component FormToDo để sử dụng
import TaskItem from "./TaskItem";
// Nhập component TaskItem để sử dụng

function ToDoList() {
// Tạo function ToDoList

    const [task, setTask] = useState([
        { id: 0, todo: "Learn JavaScript", status: true},
        { id: 1, todo: "Learn React", status: false}
    ]);
    // Tạo useState:
    // + task: Trạng thái ban đầu có mảng chứa 2 Object
    // + setTask: Hàm để cập nhập trạng thái task

    const create = (newToDo) => {
        setTask([...task, newToDo]);
    }
    // Tạo hàm create nhận tham số newToDo 
    // setTask: cập nhập trạng thái thêm task mới vào mảng
    // + ...task: sao chép toàn bộ phần tử trong mảng task
    // + newToDo: thêm mới các phần tử vào cuối mảng   

    const remove = (id) => {
        setTask(task.filter(task => task.id !== id))
    }
    // Tạo hàm remove nhận tham số id
    // setTask: cập nhập trạng thái xóa task trong mảng
    // + task.filter(task => task.id !== id): Trả về mảng mới chỉ chứa các phần tử đáp ứng điều kiện của hàm callback 

    const changeCheckBox = (inputId) => {
    // Tạo hàm changeCheckBox nhận tham số inputId
        const listItem = task.map((item) => {
    // Lặp qua từng phần tử trong mảng và trả về một mảng mới sau khi mỗi tử trong mảng task được truyền vào hàm callback dưới dạng item
            if(item.id === inputId) {
            // Nếu id của phần tử hiện tại bằng với id khi hàm được thi
                item.status = !item.status
                // Đảo ngược trạng thái: true đổi thành false và ngược lại
            }
            return {
                ...item,
            }
            // Sau khi xử lý trạng thái thì hàm trả về về Object mới với (...item) sao chép tất các thuộc tính của Object ban đầu vào 1 Object mới
        })
        setTask(listItem)
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
                {task.map((t) => (
                // Lặp qua từng phần tử trong task và hiển thị. Trong đó t là mỗi Object trong mảng
                    <TaskItem
                    // Gọi component TaskItem
                        key={t.id}
                        // Để xác định từng phần tử trong mảng có 1 id duy nhất
                        task={t}
                        // Truyền toàn bộ các Object vào prop task của component TaskItem
                        onRemove={remove}
                        // onRemove là prop được truyền vào từ component TaskItem và truyền hàm remove vào đây
                        onCheckBox={changeCheckBox}
                        // onCheckBox là prop được truyền vào từ component TaskItem và truyền hàm changeCheckBox vào đây
                    />
                ))}
            </ul>
            <FormToDo newTask={create} task={task} />
            {/* newTask là prop được truyền vào từ component FormToDo và truyền hàm create*/}
            {/* task là prop được truyền vào từ component FormToDo để gọi mảng task*/}
        </div>
    );
}

export default ToDoList;
// Xuất component dưới dạng mặc định từ file hiện tại