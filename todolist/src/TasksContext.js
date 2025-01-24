import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { customFilter, customMap } from "./utils";

const TasksContext = createContext(null);
// Tạo context dùng để chia sẻ dữ liệu task cho các component con
const TasksDispatchContext = createContext(null);
// Context chứa hàm dispatch, dùng để gửi các action đến reducer và thay đổi trạng thái task

const initialTasks = [
  { id: uuidv4(), task: "Learn JavaScript", status: true },
  { id: uuidv4(), task: "Learn React", status: false },
];

function tasksReducer(tasks, action) {
// Hàm reducer quản lý các action và cập nhật trạng thái của danh sách tasks
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
      return customMap(tasks, (task) => {
        if (task.id === action.id) {
          return {
            id: task.id,
            task: task.task,
            status: !task.status,
          };
        } else {
          return {
            id: task.id,
            task: task.task,
            status: task.status,
          };
        }
      });
    }
    case "update": {
      return customMap(tasks, (task) =>
        task.id === action.id ? { id: task.id, task: action.updatedTask, status: task.status } : task
      );
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}

export function TasksProvider({ children }) {
// Component bao bọc và cung cấp context cho các component con
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // Đối số tasksReducerr: hàm reducer để xử lý các action và thay đổi trạng thái
  // Đối số initialTasks: giá trị ban đầu của state

  return (
    <TasksContext.Provider value={tasks}>
    {/*  Cung cấp giá trị tasks cho các component con */}
      <TasksDispatchContext.Provider value={dispatch}>
    {/* Cung cấp hàm dispatch cho các component con */}
        {children}
        {/* Truyền nội dung hoặc các component con vào bên trong một component cha */}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
// Hook dùng để truy cập danh sách các công việc từ context
  return useContext(TasksContext);
}

export function useTasksDispatch() {
// Hook dùng để truy cập hàm dispatch từ context, giúp gửi các action thay đổi trạng thái task
  return useContext(TasksDispatchContext);
}
