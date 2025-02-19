import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { customFilter, customMap } from "./utils";

const TasksContext = createContext();
// Tạo context dùng để chia sẻ trạng thái tasks cho các component con
const TasksDispatchContext = createContext();
// Tạo context chứa hàm dispatch, dùng để gửi các action đến reducer và thay đổi trạng thái tasks

const initialTasks = [
  { id: uuidv4(), task: "Learn JavaScript", status: true },
  { id: uuidv4(), task: "Learn React", status: false },
];

function tasksReducer(tasks, action) {
// Hàm reducer thực hiện các action và cập nhật trạng thái của danh sách tasks

  // eslint-disable-next-line default-case
  switch (action.type) {
    case "add": {
      const createTask = [];
      for (let i = 0; i < tasks.length; i++) {
        createTask.push(tasks[i]);
      }
      createTask.push({ id: uuidv4(), task: action.task, status: false });
      return createTask;
    }
    case "delete": {
      return customFilter(tasks, (task) => task.id !== action.id);
    }
    case "toggleStatus": {

      return customMap(tasks, (task) => 
        task.id === action.id ? { id: task.id, task: task.task, status: !task.status } : task
      );
    }
    case "update": {
      return customMap(tasks, (task) =>
        task.id === action.id ? { id: task.id, task: action.updatedTask, status: task.status } : task
      );
    }
  }
  return tasks;
}

export function TasksProvider({ children }) {
// Component bao bọc và cung cấp context cho các component con
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // Sử dụng useReducer tạo ra một state và hàm dispatch để thay đổi state

  return (
    <TasksContext.Provider value={tasks}>
    {/* Cung cấp danh sách tasks cho các component con */}
      <TasksDispatchContext.Provider value={dispatch}>
    {/* Cung cấp hàm dispatch cho các component con */}
        {children}
        {/* Hiển thị các component con */}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  // Hook dùng để truy cập danh sách tasks từ context
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  // Hook dùng để truy cập hàm dispatch từ context
  return useContext(TasksDispatchContext);
}
