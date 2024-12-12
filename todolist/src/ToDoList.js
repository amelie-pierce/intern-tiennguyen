import React, { useState } from "react";
import FormToDo from "./FormToDo";

function ToDoList() {

    const [task, setTask] = useState([
        { id: 0, todo: "Learn JavaScript", status: true},
        { id: 1, todo: "Learn React", status: false}
    ]);

    const create = (newToDo) => {
        setTask([...task, newToDo]);
    }

    return (
        <div>
            <h1>Todo App</h1>
            <span>Task Checking Application</span>
            <ul>
                {task.map((t) => (
                    <li key={t.id}>{t.todo} - {t.status ? "Completed" : "Incomplete"}</li>
                ))}
            </ul>
            <FormToDo newTask={create} />
        </div>
    );
}

export default ToDoList;