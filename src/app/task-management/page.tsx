
// 'use client';

// import { useState, useEffect } from 'react';


// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   status: 'To Do' | 'In Progress' | 'Completed';
// }


// interface TeamMember {
//   id: number;
//   name: string;
//   role: string;
//   tasks: Task[];
// }

// export default function TaskManagementPage() {
//   const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
//   const [taskTitle, setTaskTitle] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [taskStatus, setTaskStatus] = useState<'To Do' | 'In Progress' | 'Completed'>('To Do');
//   const [editingTask, setEditingTask] = useState<Task | null>(null); 

//   const memberId = new URLSearchParams(window.location.search).get('id'); 

  
//   useEffect(() => {
//     async function fetchMemberData() {
//       if (memberId) {
//         const response = await fetch('/api/team');
//         const data = await response.json();
//         const member = data.find((m: TeamMember) => m.id === parseInt(memberId));
//         if (member) {
//           setTeamMember(member);
//           loadTasksFromLocalStorage(member.id); 
//         }
//       }
//     }
//     fetchMemberData();
//   }, [memberId]);

  
//   const loadTasksFromLocalStorage = (memberId: number) => {
//     const savedTasks = localStorage.getItem(`tasks_${memberId}`);
//     if (savedTasks) {
//       setTeamMember((prevState) => ({
//         ...prevState!,
//         tasks: JSON.parse(savedTasks),
//       }));
//     }
//   };

 
//   const saveTasksToLocalStorage = (tasks: Task[], memberId: number) => {
//     localStorage.setItem(`tasks_${memberId}`, JSON.stringify(tasks));
//   };

  
//   const handleAddTask = () => {
//     if (taskTitle && taskDescription) {
//       const newTask: Task = {
//         id: Date.now(),
//         title: taskTitle,
//         description: taskDescription,
//         status: taskStatus,
//       };

//       if (teamMember) {
//         const updatedTasks = [...teamMember.tasks, newTask];
//         setTeamMember({
//           ...teamMember,
//           tasks: updatedTasks,
//         });
//         saveTasksToLocalStorage(updatedTasks, teamMember.id); 
//       }

      
//       setTaskTitle('');
//       setTaskDescription('');
//       setTaskStatus('To Do');
//     }
//   };

  
//   const handleEditTask = (task: Task) => {
//     setEditingTask(task);
//     setTaskTitle(task.title);
//     setTaskDescription(task.description);
//     setTaskStatus(task.status);
//   };

  
//   const handleSaveEditedTask = () => {
//     if (editingTask && taskTitle && taskDescription) {
//       const updatedTask = { ...editingTask, title: taskTitle, description: taskDescription, status: taskStatus };
//       if (teamMember) {
//         const updatedTasks = teamMember.tasks.map((task) =>
//           task.id === updatedTask.id ? updatedTask : task
//         );
//         setTeamMember({
//           ...teamMember,
//           tasks: updatedTasks,
//         });
//         saveTasksToLocalStorage(updatedTasks, teamMember.id); 
//         setEditingTask(null); 
//       }

      
//       setTaskTitle('');
//       setTaskDescription('');
//       setTaskStatus('To Do');
//     }
//   };

  
//   const handleUpdateTaskStatus = (taskId: number, newStatus: 'To Do' | 'In Progress' | 'Completed') => {
//     if (teamMember) {
//       const updatedTasks = teamMember.tasks.map((task) =>
//         task.id === taskId ? { ...task, status: newStatus } : task
//       );
//       setTeamMember({
//         ...teamMember,
//         tasks: updatedTasks,
//       });
//       saveTasksToLocalStorage(updatedTasks, teamMember.id); 
//     }
//   };

  
//   const handleDeleteTask = (taskId: number) => {
//     if (teamMember) {
//       const updatedTasks = teamMember.tasks.filter((task) => task.id !== taskId);
//       setTeamMember({
//         ...teamMember,
//         tasks: updatedTasks,
//       });
//       saveTasksToLocalStorage(updatedTasks, teamMember.id); 
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       {teamMember ? (
//         <>
//           <h1 className="text-4xl font-semibold mb-6 text-center">{teamMember.name}'s Task Management</h1>

//           {/* Task Management Form */}
//           <div className="w-full mb-6">
//             <h3 className="text-xl font-semibold">{editingTask ? 'Edit Task' : 'Add Task'}</h3>
//             <input
//               type="text"
//               placeholder="Task Title"
//               value={taskTitle}
//               onChange={(e) => setTaskTitle(e.target.value)}
//               className="p-3 border border-gray-300 rounded-md w-full mb-4"
//             />
//             <textarea
//               placeholder="Task Description"
//               value={taskDescription}
//               onChange={(e) => setTaskDescription(e.target.value)}
//               className="p-3 border border-gray-300 rounded-md w-full mb-4"
//             />
//             <select
//               value={taskStatus}
//               onChange={(e) => setTaskStatus(e.target.value as 'To Do' | 'In Progress' | 'Completed')}
//               className="p-3 border border-gray-300 rounded-md w-full mb-4"
//             >
//               <option value="To Do">To Do</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//             <button
//               onClick={editingTask ? handleSaveEditedTask : handleAddTask}
//               className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
//             >
//               {editingTask ? 'Save Task' : 'Add Task'}
//             </button>
//           </div>

//           {/* Task List */}
//           <div className="space-y-6">
//             {teamMember.tasks.map((task) => (
//               <div key={task.id} className="border p-4 rounded-md">
//                 <h4 className="text-lg font-semibold">{task.title}</h4>
//                 <p className="text-gray-500">{task.description}</p>
//                 <div className="flex items-center justify-between mt-4">
//                   <select
//                     value={task.status}
//                     onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value as 'To Do' | 'In Progress' | 'Completed')}
//                     className="p-2 border border-gray-300 rounded-md"
//                   >
//                     <option value="To Do">To Do</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                   </select>
//                   <div className="flex">
//                     <button
//                       onClick={() => handleEditTask(task)}
//                       className="bg-yellow-500 text-white py-2 px-4 rounded-md mr-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteTask(task.id)}
//                       className="bg-red-500 text-white py-2 px-4 rounded-md"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div>Loading team member data...</div>
//       )}
//     </div>
//   );
// }




// 'use client';

// import { useState, useEffect } from 'react';

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   status: 'To Do' | 'In Progress' | 'Completed';
// }

// interface TeamMember {
//   id: number;
//   name: string;
//   role: string;
//   tasks: Task[];
// }

// export default function TaskManagementPage() {
//   const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
//   const [taskTitle, setTaskTitle] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [taskStatus, setTaskStatus] = useState<'To Do' | 'In Progress' | 'Completed'>('To Do');
//   const [editingTask, setEditingTask] = useState<Task | null>(null);

//   const memberId = new URLSearchParams(window.location.search).get('id');

//   useEffect(() => {
//     async function fetchMemberData() {
//       if (memberId) {
//         const response = await fetch('/api/team');
//         const data = await response.json();
//         const member = data.find((m: TeamMember) => m.id === parseInt(memberId));
//         if (member) {
//           setTeamMember(member);
//           loadTasksFromLocalStorage(member.id);
//         }
//       }
//     }
//     fetchMemberData();
//   }, [memberId]);

//   const loadTasksFromLocalStorage = (memberId: number) => {
//     const savedTasks = localStorage.getItem(`tasks_${memberId}`);
//     if (savedTasks) {
//       setTeamMember((prevState) => ({
//         ...prevState!,
//         tasks: JSON.parse(savedTasks),
//       }));
//     }
//   };

//   const saveTasksToLocalStorage = (tasks: Task[], memberId: number) => {
//     localStorage.setItem(`tasks_${memberId}`, JSON.stringify(tasks));
//   };

//   const handleAddTask = () => {
//     if (taskTitle && taskDescription) {
//       const newTask: Task = {
//         id: Date.now(),
//         title: taskTitle,
//         description: taskDescription,
//         status: taskStatus,
//       };

//       if (teamMember) {
//         const updatedTasks = [...teamMember.tasks, newTask];
//         setTeamMember({
//           ...teamMember,
//           tasks: updatedTasks,
//         });
//         saveTasksToLocalStorage(updatedTasks, teamMember.id);
//       }

//       setTaskTitle('');
//       setTaskDescription('');
//       setTaskStatus('To Do');
//     }
//   };

//   const handleEditTask = (task: Task) => {
//     setEditingTask(task);
//     setTaskTitle(task.title);
//     setTaskDescription(task.description);
//     setTaskStatus(task.status);
//   };

//   const handleSaveEditedTask = () => {
//     if (editingTask && taskTitle && taskDescription) {
//       const updatedTask = { ...editingTask, title: taskTitle, description: taskDescription, status: taskStatus };
//       if (teamMember) {
//         const updatedTasks = teamMember.tasks.map((task) =>
//           task.id === updatedTask.id ? updatedTask : task
//         );
//         setTeamMember({
//           ...teamMember,
//           tasks: updatedTasks,
//         });
//         saveTasksToLocalStorage(updatedTasks, teamMember.id);
//         setEditingTask(null);
//       }

//       setTaskTitle('');
//       setTaskDescription('');
//       setTaskStatus('To Do');
//     }
//   };

//   const handleUpdateTaskStatus = (taskId: number, newStatus: 'To Do' | 'In Progress' | 'Completed') => {
//     if (teamMember) {
//       const updatedTasks = teamMember.tasks.map((task) =>
//         task.id === taskId ? { ...task, status: newStatus } : task
//       );
//       setTeamMember({
//         ...teamMember,
//         tasks: updatedTasks,
//       });
//       saveTasksToLocalStorage(updatedTasks, teamMember.id);
//     }
//   };

//   const handleDeleteTask = (taskId: number) => {
//     if (teamMember) {
//       const updatedTasks = teamMember.tasks.filter((task) => task.id !== taskId);
//       setTeamMember({
//         ...teamMember,
//         tasks: updatedTasks,
//       });
//       saveTasksToLocalStorage(updatedTasks, teamMember.id);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
//       {teamMember ? (
//         <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
//           <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
//             {teamMember.name}'s Task Management
//           </h1>

//           {/* Task Form */}
//           <div className="bg-gray-100 p-6 rounded-lg mb-8">
//             <h3 className="text-xl font-semibold text-gray-700 mb-4">
//               {editingTask ? 'Edit Task' : 'Add Task'}
//             </h3>
//             <input
//               type="text"
//               placeholder="Task Title"
//               value={taskTitle}
//               onChange={(e) => setTaskTitle(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-indigo-400"
//             />
//             <textarea
//               placeholder="Task Description"
//               value={taskDescription}
//               onChange={(e) => setTaskDescription(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-indigo-400"
//             />
//             <select
//               value={taskStatus}
//               onChange={(e) => setTaskStatus(e.target.value as 'To Do' | 'In Progress' | 'Completed')}
//               className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-indigo-400"
//             >
//               <option value="To Do">To Do</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//             <button
//               onClick={editingTask ? handleSaveEditedTask : handleAddTask}
//               className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
//             >
//               {editingTask ? 'Save Task' : 'Add Task'}
//             </button>
//           </div>

//           {/* Task List */}
//           <div className="space-y-6">
//             {teamMember.tasks.map((task) => (
//               <div key={task.id} className="p-4 border rounded-lg bg-gray-50 shadow-md">
//                 <h4 className="text-lg font-bold text-indigo-600">{task.title}</h4>
//                 <p className="text-gray-600 mb-4">{task.description}</p>
//                 <div className="flex items-center justify-between">
//                   <select
//                     value={task.status}
//                     onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value as 'To Do' | 'In Progress' | 'Completed')}
//                     className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
//                   >
//                     <option value="To Do">To Do</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                   </select>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleEditTask(task)}
//                       className="py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteTask(task.id)}
//                       className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="text-lg font-semibold text-gray-600">Loading team member data...</div>
//       )}
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed';
}

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
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);

  useEffect(() => {
    // This code will only run on the client side
    const id = new URLSearchParams(window.location.search).get('id');
    setMemberId(id);
  }, []);

  useEffect(() => {
    async function fetchMemberData() {
      if (memberId) {
        const response = await fetch('/api/team');
        const data = await response.json();
        const member = data.find((m: TeamMember) => m.id === parseInt(memberId));
        if (member) {
          setTeamMember(member);
          loadTasksFromLocalStorage(member.id);
        }
      }
    }
    if (memberId) {
      fetchMemberData();
    }
  }, [memberId]);

  const loadTasksFromLocalStorage = (memberId: number) => {
    const savedTasks = localStorage.getItem(`tasks_${memberId}`);
    if (savedTasks) {
      setTeamMember((prevState) => ({
        ...prevState!,
        tasks: JSON.parse(savedTasks),
      }));
    }
  };

  const saveTasksToLocalStorage = (tasks: Task[], memberId: number) => {
    localStorage.setItem(`tasks_${memberId}`, JSON.stringify(tasks));
  };

  const handleAddTask = () => {
    if (taskTitle && taskDescription) {
      const newTask: Task = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
      };

      if (teamMember) {
        const updatedTasks = [...teamMember.tasks, newTask];
        setTeamMember({
          ...teamMember,
          tasks: updatedTasks,
        });
        saveTasksToLocalStorage(updatedTasks, teamMember.id);
      }

      setTaskTitle('');
      setTaskDescription('');
      setTaskStatus('To Do');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskStatus(task.status);
  };

  const handleSaveEditedTask = () => {
    if (editingTask && taskTitle && taskDescription) {
      const updatedTask = { ...editingTask, title: taskTitle, description: taskDescription, status: taskStatus };
      if (teamMember) {
        const updatedTasks = teamMember.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        setTeamMember({
          ...teamMember,
          tasks: updatedTasks,
        });
        saveTasksToLocalStorage(updatedTasks, teamMember.id);
        setEditingTask(null);
      }

      setTaskTitle('');
      setTaskDescription('');
      setTaskStatus('To Do');
    }
  };

  const handleUpdateTaskStatus = (taskId: number, newStatus: 'To Do' | 'In Progress' | 'Completed') => {
    if (teamMember) {
      const updatedTasks = teamMember.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setTeamMember({
        ...teamMember,
        tasks: updatedTasks,
      });
      saveTasksToLocalStorage(updatedTasks, teamMember.id);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    if (teamMember) {
      const updatedTasks = teamMember.tasks.filter((task) => task.id !== taskId);
      setTeamMember({
        ...teamMember,
        tasks: updatedTasks,
      });
      saveTasksToLocalStorage(updatedTasks, teamMember.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      {teamMember ? (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
            {teamMember.name}&apos;s Task Management
          </h1>

          {/* Task Form */}
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              {editingTask ? 'Edit Task' : 'Add Task'}
            </h3>
            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-indigo-400"
            />
            <textarea
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-indigo-400"
            />
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value as 'To Do' | 'In Progress' | 'Completed')}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-indigo-400"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              onClick={editingTask ? handleSaveEditedTask : handleAddTask}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
            >
              {editingTask ? 'Save Task' : 'Add Task'}
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-6">
            {teamMember.tasks.map((task) => (
              <div key={task.id} className="p-4 border rounded-lg bg-gray-50 shadow-md">
                <h4 className="text-lg font-bold text-indigo-600">{task.title}</h4>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex items-center justify-between">
                  <select
                    value={task.status}
                    onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value as 'To Do' | 'In Progress' | 'Completed')}
                    className="p-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-lg font-semibold text-gray-600">Loading team member data...</div>
      )}
    </div>
  );
}



