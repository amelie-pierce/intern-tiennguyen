import React, { useState } from "react";
import TaskForm from "./TaskForm"
import TaskListItem from "./TaskListItem";
import EditTask from "./EditTask";
import { v4 as uuidv4 } from "uuid";
import "./TaskList.css";
import { customFilter, customMap } from "./utils";
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
        setTasks(customFilter(tasks, task => task.id !== id))
    }

    const toggleTaskStatus = (taskId) => {
        const updatedTasks = customMap(tasks, (task) => {
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
        const updatedTasks = customMap(tasks, (tasks) => 
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