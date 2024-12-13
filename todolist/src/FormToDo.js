import React, { useState} from "react";

function FormToDo({newTask, task}) {
    const [todo, setTodo] = useState("")

    const handleChange = (event) => {
        setTodo(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (todo.trim() === "") return;
        const newId = task.length; 
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