import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { customFilter, customMap } from "./utils";

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

const initialTasks = [
  { id: uuidv4(), task: "Learn JavaScript", status: true },
  { id: uuidv4(), task: "Learn React", status: false },
];

function tasksReducer(tasks, action) {
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
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
