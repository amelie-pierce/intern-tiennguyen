import React, { useState } from "react";
import TaskForm from "./TaskForm"
import TaskListItem from "./TaskListItem";
import EditTask from "./EditTask";
import { v4 as uuidv4 } from "uuid";
import "./TaskList.css";
import useTaskStorage from "./useTaskStorage";

function TaskList() {
// Tạo function TaskApp

    const [tasks, setTasks] = useTaskStorage("tasks",[
        { id: uuidv4(), task: "Learn JavaScript", status: true},
        { id: uuidv4(), task: "Learn React", status: false}
    ]);

    const [editTask, setEditTask] = useState(null);

    const addTask = (newTask) => {
        newTask.id = uuidv4();
        setTasks([...tasks, newTask]); 
    }  
    
    const removeTask = (id) => {
        setTasks(filter(tasks, task => task.id !== id))
    }

    const filter = (tasks, remove) => {
    // Hàm thay thế cho phương thức Array.filter()
    // tasks: Mảng các công việc
    // remove: Hàm callback để kiểm tra điều kiện
        const newItem = [];
        for ( let i = 0; i < tasks.length; i++){
        // Vòng lặp đi qua từng phần tử trong mảng
            if (remove(tasks[i])){
            // Gọi hàm remove với đối số là tasks[i]. Kết quả trả về true - ĐK của hàm remove
                newItem.push(tasks[i])
                // Thêm phần tử vào cuối mảng
            }
        }
        return newItem;

        // Dùng vòng lặp while: 
        // const newItem = [];
        // let i = 0;
        // while (i < tasks.length) {
        //  if (remove(tasks[i])) {
        //      newItem.push(tasks[i]);
        //  }
        //  i++;
        // }
        // return newItem;
    }

    const map = (tasks, repeatTask) => {
    // Thay thế cho phương thức Array.map()
        const newItem = [];
        for ( let i = 0; i < tasks.length; i++){
            newItem.push(repeatTask(tasks[i]));
        }
        return newItem;

        // const newItem = [];
        // let i = 0;
        // while (i < tasks.length) {
        //      newItem.push(repeatTask(tasks[i]));
        //      i++; 
        // }
        // return newItem;
    }

    const toggleTaskStatus = (taskId) => {
        const updatedTasks = map(tasks, (task) => {
            if(task.id === taskId) {
                task.status = !task.status
            }
            return {
                ...task,
            }
        })
        setTasks(updatedTasks)
    }

    const startEdit = (id) => {
        setEditTask(id);
    }

    const updateTask = (id, updatedTask) => {
        const updatedTasks = map(tasks, (tasks) => 
            tasks.id === id ? {...tasks, task: updatedTask} : tasks
        ); 
        setTasks(updatedTasks);
        setEditTask(null);
    };

    const cancelEdit = () => {
        setEditTask(null);
    }

    return (
        <div className="task-list">
            <h1>Task List</h1>
            <span>A Simple React Task List</span> <hr/> 
            <ul>
                {tasks.map((task) => (
                   <li key={task.id}>
                        {editTask === task.id ? (
                            <EditTask
                                task={task}
                                onUpdate={updateTask}
                                onCancel={cancelEdit}
                            />
                        ) : (
                             <TaskListItem
                                task={task}
                                onRemoveTask={removeTask}
                                onToggleTaskStatus={toggleTaskStatus}
                                onEdit={startEdit}
                            />
                        )}
                   </li>
                ))}
            </ul>
            <TaskForm onAddTask={addTask} tasks={tasks} />
        </div>
    );
}

export default TaskList;