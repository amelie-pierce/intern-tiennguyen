import React, { useState } from "react";

function ToDoList() {

    const [task, setTask] = useState([
        { id: 0, todo: "Learn JavaScript", status: true},
        { id: 0, todo: "Learn React", status: false}
    ]);

    const create = () => {
        const newToDo = { id: task.length + 1, todo: "Learn Design", status: true}
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

            <button onClick={create}>Add</button>
        </div>
    );
}

export default ToDoList;