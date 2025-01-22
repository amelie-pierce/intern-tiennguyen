import React, { useState } from 'react';
import './TaskListItem.css';

function TaskListItem({ task, onToggle, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const handleUpdate = async () => {
        if (!editTitle.trim()) return;
        try {
            await onUpdate(task.id, {
            // Gọi hàm onUpdate với task.id và object có tiêu đề mới
                title: editTitle
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    if (isEditing) {
        return (
            <div className="task-item editing">
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="edit-input"
                />
                <div className="img-group">
                    <button onClick={handleUpdate} className="save-button">Save</button>
                    <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="task-item">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    className="task-checkbox"
                />
                <div className="task-text">
                    <h3 className="task-title">{task.title}</h3>
                    <span className={`status-badge ${task.completed ? 'completed' : 'incomplete'}`}>
                        {task.completed ? 'Completed' : 'Incomplete'}
                    </span>
                </div>
            <div className="img-group">
                <img 
                    style={{width: "30px", height: "30px"}}
                    src="https://icon-library.com/images/edit-icon-image/edit-icon-image-29.jpg"
                    alt="img-edit-task"
                    onClick={() => setIsEditing(true)} className="edit-button"/>
                <img 
                    style={{width: "30px", height: "30px"}}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnhY_tishzTeujCDUzLrVq_ZIb7rIBZ9A8uQ&s"
                    alt="img-remove-task" 
                    onClick={() => onDelete(task.id)} className="delete-button"/>
            </div>
        </div>
    );
}

export default TaskListItem;