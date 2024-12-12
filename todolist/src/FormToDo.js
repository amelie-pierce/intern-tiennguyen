import React, { useState} from "react";

function FormToDo({newTask}) {
    const [todo, setTodo] = useState("")

    const handleChange = (event) => {
        setTodo(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (todo.trim() === "") return;
        const createNewTodo = { id: todo.length + 1, todo, status: false };
        newTask(createNewTodo);
        setTodo("");
    }

    return(
        <form className="FormToDo" onSubmit={handleSubmit}>
            <label htmlFor="todo">New Todo</label>
            <input type="text" placeholder="New Todo" value={todo} onChange={handleChange} />
            <button type="submit">Add</button>
        </form>
    );
}

export default FormToDo;