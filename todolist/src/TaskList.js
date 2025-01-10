import React from 'react';
import TaskListItem from './TaskListItem';
import './TaskList.css';

function TaskList({ tasks, loading, error, onToggle, onUpdate, onDelete }) {


    if (loading) {
        return <div className="task-list-message">Loading tasks...</div>;
    }

    if (error) {
        return <div className="task-list-message error">{error}</div>;
    }

    if (tasks.length === 0) {
        return <div className="task-list-message">No tasks yet. Add one above!</div>;
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskListItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TaskList;