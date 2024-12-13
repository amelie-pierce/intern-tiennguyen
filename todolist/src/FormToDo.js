import React, { useState} from "react";

function FormToDo({newTask, task}) {
    const [todo, setTodo] = useState("")

    const handleChange = (event) => {
        setTodo(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (todo.trim() === "") return;
        const maxId = task.length > 0 ? Math.max(...task.map((e) => e.id)) : 0;
        const newId = maxId + 1;
        const createNewTodo = { id: newId, todo, status: false };
        newTask(createNewTodo);
        setTodo("");
    }

    return(
        <form className="FormToDo" onSubmit={handleSubmit}>
            <label htmlFor="todo">New Todo</label>
            <input id="todo" type="text" placeholder="New Todo" value={todo} onChange={handleChange} />
            <button type="submit">Add</button>
        </form>
    );
}

export default FormToDo;