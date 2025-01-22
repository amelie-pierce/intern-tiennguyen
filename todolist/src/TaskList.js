import React, { useContext } from "react";
import TaskForm from "./TaskForm";
import TaskListItem from "./TaskListItem";
import EditTask from "./EditTask";
import "./TaskList.css";
import { customMap } from "./utils";
import { TaskContext } from "./TaskContext";

function TaskList() {
   const context = useContext(TaskContext)

    return (
            <div className="task-list">
                <h1>Task List</h1>
                <span>A Simple React Task List</span> <hr />
                <ul>
                    {customMap(context.tasks,(task) => (
                        <li key={task.id}>
                            {context.editTask === task.id ? (
                                <EditTask task={task}/>
                            ) : (
                                <TaskListItem task={task} />
                            )}
                        </li>
                    ))}
                </ul>
                <TaskForm />
            </div>
    );
}

export default TaskList;
