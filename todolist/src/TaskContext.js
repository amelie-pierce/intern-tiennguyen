import React, { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TaskList.css";
import { customFilter, customMap } from "./utils";

const TaskContext = createContext();

function TaskProvider({ children }){

     const [tasks, setTasks] = useState([
        { id: uuidv4(), task: "Learn JavaScript", status: true },
        { id: uuidv4(), task: "Learn React", status: false }
    ]);

    const [editTask, setEditTask] = useState(null); 

    // Hàm thêm công việc mới
    const addTask = (newTask) => {
        newTask.id = uuidv4();
        setTasks([...tasks, newTask]);
    };

    // Hàm xóa công việc
    const removeTask = (id) => {
        setTasks(customFilter(tasks, (task) => task.id !== id));
    };

    // Hàm thay đổi trạng thái công việc
    const toggleTaskStatus = (taskId) => {
        const updatedTasks = customMap(tasks, (task) => {
            if (task.id === taskId) {
                task.status = !task.status;
            }
            return { ...task };
        });
        setTasks(updatedTasks);
    };

    // Bắt đầu chỉnh sửa công việc
    const startEdit = (id) => {
        setEditTask(id);
    };

    // Cập nhật công việc sau khi chỉnh sửa
    const updateTask = (id, updatedTask) => {
        const updatedTasks = customMap(tasks, (task) =>
            task.id === id ? { ...task, task: updatedTask } : task
        );
        setTasks(updatedTasks);
        setEditTask(null); // Dừng chỉnh sửa
    };

    // Hủy chỉnh sửa
    const cancelEdit = () => {
        setEditTask(null);
    };

    const value = {
        tasks, 
        addTask, 
        removeTask, 
        toggleTaskStatus, 
        startEdit, 
        updateTask, 
        cancelEdit,
        editTask
    }

    return(
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );

}

export {TaskContext, TaskProvider}