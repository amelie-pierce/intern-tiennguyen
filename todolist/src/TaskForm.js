import React, { useState } from "react";

import "./TaskForm.css";


function TaskForm({ onAddTask }) {

    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            await onAddTask(title);
            setTitle('');
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task"
                className="task-input"
            />
            <button type="submit" className="add-button">
                Add Task
            </button>
        </form>
    );
}

export default TaskForm;