import React from "react";
import "./TaskListItem.css";


function TaskListItem({ task, onRemoveTask, onToggleTaskStatus, onEdit }) {
// + task: Object chứa thông tin của một công việc: id: , task, status: 
// + onRemoveTask: Hàm callback để xóa công việc
// + onToggleTaskStatus: Hàm callback để thay đổi trạng thái công việc
// + onEdit: Bắt đầu chỉnh sửa công việc
    return (
        <div className="task-list-item">
            <input 
                type="checkbox" 
                checked={task.status} 
                onChange={()=>onToggleTaskStatus(task.id)} 
            />
            <span>{task.task} - {task.status ? "Completed" : "Incomplete"}</span>
            <img
                style={{width: "30px", height: "30px"}}
                src="https://icon-library.com/images/edit-icon-image/edit-icon-image-29.jpg"
                alt="img-edit-task"
                onClick={() => onEdit(task.id)}
            />
            <img 
                style={{width: "30px", height: "30px"}}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnhY_tishzTeujCDUzLrVq_ZIb7rIBZ9A8uQ&s"
                alt="img-remove-task" 
                onClick={()=>onRemoveTask(task.id)}
            />
        </div>
    );
}

export default TaskListItem;