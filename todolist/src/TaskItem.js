import React from "react";

function TaskItem({ task, onRemove, onCheckBox }) {
    return (
        <div>
            <input type="checkbox" checked={task.status} onChange={()=>onCheckBox(task.id)} />
            <li>{task.todo} - {task.status ? "Completed" : "Incomplete"}</li>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnhY_tishzTeujCDUzLrVq_ZIb7rIBZ9A8uQ&s" onClick={()=>onRemove(task.id)}></img>
        </div>
    );
}

export default TaskItem;