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
      order: tasks.filter((task) => task.status === status).length,
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (id: string, status: Task["status"], order = 0) => {
    setTasks((prev) => {
      const moving = prev.find((task) => task.id === id);
      if (!moving) return prev;

      const sourceStatus = moving.status;
      const destStatus = status;

      const sourceList = prev
        .filter((task) => task.status === sourceStatus && task.id !== id)
        .sort((a, b) => a.order - b.order);

      const destListBase = prev
        .filter((task) => task.status === destStatus && task.id !== id)
        .sort((a, b) => a.order - b.order);

      if (sourceStatus === destStatus) {
        const list = sourceList;
        const toInsert = { ...moving, status: destStatus };
        const safeIndex = Math.max(0, Math.min(order, list.length));
        list.splice(safeIndex, order, toInsert);
        const reindexed = list.map((task, i) => ({ ...task, order: i }));

        return prev.map((task) => {
          if (task.status !== destStatus) return task;
          const found = reindexed.find((x) => x.id === task.id);
          return found ?? (task.id === id ? toInsert : task);
        });
      } else {
        const sourceRe = sourceList.map((task, i) => ({ ...task, order: i }));

        const toInsert = { ...moving, status: destStatus };
        const destList = [...destListBase];
        const safeIndex = Math.max(0, Math.min(order, destList.length));
        destList.splice(safeIndex, order, toInsert);
        const destRe = destList.map((task, i) => ({ ...task, order: i }));

        return prev.map((task) => {
          if (task.id === id) {
            const found = destRe.find((x) => x.id === id);
            return found ?? toInsert;
          }
          if (task.status === sourceStatus) {
            const r = sourceRe.find((x) => x.id === task.id);
            return r ?? task;
          }
          if (task.status === destStatus) {
            const r = destRe.find((x) => x.id === task.id);
            return r ?? task;
          }
          return task;
        });
      }
    });
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
