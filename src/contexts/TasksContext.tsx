import React, { createContext, useContext } from "react";
import type { Task } from "../types/task";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

interface TasksContextType {
  tasks: Task[];
  addTask: (title: string, description: string, status: Task["status"]) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  moveTask: (id: string, status: Task["status"], order?: number) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  const addTask = (
    title: string,
    description: string,
    status: Task["status"]
  ) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status,
      order: tasks.filter((t) => t.status === status).length,
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const moveTask = (id: string, status: Task["status"], order = 0) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status, order } : t)));
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, editTask, removeTask, moveTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TasksProvider");
  }
  return context;
}
