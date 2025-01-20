// src/app/context/TaskContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
// import { v4 as uuidv4 } from "uuid"; // Import the UUID library

// Task interface
export interface Task {
  id: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
}

// Team Member interface
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  tasks: Task[];
}

interface TaskContextProps {
  teamMember: TeamMember | null;
  addTask: (task: Task) => void;
  updateTaskStatus: (taskId: string, status: "To Do" | "In Progress" | "Completed") => void;
  deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teamMember, setTeamMember] = useState<TeamMember | null>({
    id: 1,
    name: "Yuvraj Singh",
    role: "CEO",
    tasks: [],
  });

  // Add Task
  const addTask = (task: Task) => {
    setTeamMember((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        tasks: [...prev.tasks, task],
      };
    });
  };

  // Update Task Status
  const updateTaskStatus = (taskId: string, status: "To Do" | "In Progress" | "Completed") => {
    setTeamMember((prev) => {
      if (!prev) return prev;
      const updatedTasks = prev.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      );
      return { ...prev, tasks: updatedTasks };
    });
  };

  // Delete Task
  const deleteTask = (taskId: string) => {
    setTeamMember((prev) => {
      if (!prev) return prev;
      const updatedTasks = prev.tasks.filter((task) => task.id !== taskId);
      return { ...prev, tasks: updatedTasks };
    });
  };

  return (
    <TaskContext.Provider value={{ teamMember, addTask, updateTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
