"use client"; // Add this at the top

import { useState, useEffect } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
}

const ITEMS_PER_PAGE = 4;

export default function HomePage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeamMembers, setFilteredTeamMembers] = useState<TeamMember[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function fetchTeamData() {
      const response = await fetch('/api/team', {
        cache: 'no-store', // Avoid caching
      });
      const data = await response.json();
      setTeamMembers(data);
      setFilteredTeamMembers(data);
    }
    fetchTeamData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = teamMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query)
    );
    setFilteredTeamMembers(filtered);
    setCurrentPage(0); // Reset to the first page when a search is performed
  };

  const totalPages = Math.ceil(filteredTeamMembers.length / ITEMS_PER_PAGE);
  const displayedMembers = filteredTeamMembers.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-10 animate-slide-down">
          Meet Our Team
        </h1>

        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search by name or role..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full max-w-md p-4 border rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-transparent transition-all placeholder-gray-400"
          />
        </div>

        {displayedMembers.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedMembers.map((member) => (
                <div
                  key={member.id}
                  className="border rounded-lg shadow-lg p-6 bg-gradient-to-br from-indigo-100 via-white to-indigo-200 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-indigo-700">{member.name}</h2>
                    <p className="text-lg text-indigo-500">{member.role}</p>
                  </div>
                  <div className="text-center mb-6">
                    <p className="text-gray-600 italic">{`"${member.bio}"`}</p>
                  </div>
                  <div className="text-center">
                    <a
                      href={`/task-management?id=${member.id}`}
                      className="inline-block bg-indigo-600 text-white font-medium py-2 px-5 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-300"
                    >
                      Manage Tasks
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="p-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300 disabled:opacity-50"
              >
                &lt; Previous
              </button>
              <span className="text-lg font-medium">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className="p-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300 disabled:opacity-50"
              >
                Next &gt;
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-red-500 text-lg font-semibold animate-pulse mt-8">
            No team members found with that name or role.
          </div>
        )}
      </div>

      <footer className="bg-indigo-600 text-white text-center py-4 mt-6">
        <p className="text-sm">© 2025 Team Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}


// import React from 'react';

// async function fetchTeamData() {
//   const res = await fetch('http://localhost:3000/api/team', {
//     cache: 'no-store', // Disable caching for fresh data on each request
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch team data');
//   }

//   return res.json(); // Return the JSON response
// }

// export default async function HomePage() {
//   let teamMembers = [];

//   try {
//     // Fetch team data server-side
//     teamMembers = await fetchTeamData();
//   } catch (error) {
//     console.error('Error fetching team data:', error);
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="container mx-auto p-6 flex-grow">
//         <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-10">
//           Meet Our Team
//         </h1>
//         {teamMembers.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {teamMembers.map(
//               (member: { id: number; name: string; role: string; bio: string }) => (
//                 <div key={member.id} className="border rounded-lg shadow-lg p-6">
//                   <h2 className="text-2xl font-bold">{member.name}</h2>
//                   <p className="text-indigo-500">{member.role}</p>
//                   <p className="text-gray-700">{member.bio}</p>
//                 </div>
//               )
//             )}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No team members found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

