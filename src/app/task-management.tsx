'use client';

import React from 'react';
import { useState, useEffect } from 'react';

// Task Interface
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed';
}

// Team Member Interface
interface TeamMember {
  id: number;
  name: string;
  role: string;
  tasks: Task[];
}

export default function TaskManagementPage() {
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState<'To Do' | 'In Progress' | 'Completed'>('To Do');

  const memberId = new URLSearchParams(window.location.search).get('id'); // Get team member ID from query params

  // Fetch team member data based on ID from API
  useEffect(() => {
    async function fetchMemberData() {
      if (memberId) {
        const response = await fetch('/api/team');
        const data = await response.json();
        const member = data.find((m: TeamMember) => m.id === parseInt(memberId));
        if (member) {
          setTeamMember(member);
        }
      }
    }
    fetchMemberData();
  }, [memberId]);

  // Add Task
  const handleAddTask = () => {
    if (taskTitle && taskDescription) {
      const newTask: Task = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
      };

      if (teamMember) {
        setTeamMember({
          ...teamMember,
          tasks: [...teamMember.tasks, newTask],
        });
      }

      // Reset task form
      setTaskTitle('');
      setTaskDescription('');
      setTaskStatus('To Do');
    }
  };

  // Update Task Status
  const handleUpdateTaskStatus = (taskId: number, newStatus: 'To Do' | 'In Progress' | 'Completed') => {
    if (teamMember) {
      setTeamMember({
        ...teamMember,
        tasks: teamMember.tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        ),
      });
    }
  };

  // Delete Task
  const handleDeleteTask = (taskId: number) => {
    if (teamMember) {
      setTeamMember({
        ...teamMember,
        tasks: teamMember.tasks.filter((task) => task.id !== taskId),
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      {teamMember ? (
        <>
       <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
         {teamMember.name}&apos;s Task Management
       </h1>

          {/* Task Management Form */}
          <div className="w-full mb-6">
            <h3 className="text-xl font-semibold">Add Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
            />
            <textarea
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
            />
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value as 'To Do' | 'In Progress' | 'Completed')}
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              onClick={handleAddTask}
              className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
            >
              Add Task
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-6">
            {teamMember.tasks.map((task) => (
              <div key={task.id} className="border p-4 rounded-md">
                <h4 className="text-lg font-semibold">{task.title}</h4>
                <p className="text-gray-500">{task.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <select
                    value={task.status}
                    onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value as 'To Do' | 'In Progress' | 'Completed')}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                  >
                    Delete Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>Loading team member data...</div>
      )}
    </div>
  );
}
