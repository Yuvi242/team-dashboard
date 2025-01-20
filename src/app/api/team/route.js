// let teamMembers = [
//     {
//       id: 1,
//       name: 'Yuvraj Singh',
//       role: 'CEO',
//       bio: 'Yuvraj Singh is the visionary behind our company and leads the strategy.',
//       tasks: [] // Empty tasks for now
//     },
//     {
//       id: 2,
//       name: 'Vivek',
//       role: 'CTO',
//       bio: 'Vivek is responsible for the technological direction of the company.',
//       tasks: [] // Empty tasks for now
//     },
//     {
//       id: 3,
//       name: 'Chandan Yadav',
//       role: 'Lead Developer',
//       bio: 'Chandan Yadav is the mastermind behind the development of our core products.',
//       tasks: [] // Empty tasks for now
//     },
//     {
//       id: 4,
//       name: 'Yashraj',
//       role: 'Project Manager',
//       bio: 'Yashraj manages the timeline and resources for various projects.',
//       tasks: [] // Empty tasks for now
//     },
//     {
//       id: 5,
//       name: 'Aman Singh',
//       role: 'Marketing Head',
//       bio: 'Aman leads our marketing strategy and campaigns to boost brand visibility.',
//       tasks: [] // Empty tasks for now
//     }
//   ];
  
//   export async function GET(req) {
//     return new Response(JSON.stringify(teamMembers), { status: 200 });
//   }
  
//   export async function POST(req) {
//     const { memberId, task } = await req.json();
  
//     const member = teamMembers.find((m) => m.id === memberId);
//     if (member) {
//       // Add the task to the member's task list
//       member.tasks.push(task);
//       return new Response(JSON.stringify(member), { status: 200 });
//     }
  
//     return new Response('Member not found', { status: 404 });
//   }



// const teamMembers = [
//   {
//     id: 1,
//     name: 'Yuvraj Singh',
//     role: 'CEO',
//     bio: 'Yuvraj Singh is the visionary behind our company and leads the strategy.',
//     tasks: []
//   },
//   {
//     id: 2,
//     name: 'Vivek',
//     role: 'CTO',
//     bio: 'Vivek is responsible for the technological direction of the company.',
//     tasks: []
//   },
//   {
//     id: 3,
//     name: 'Chandan Yadav',
//     role: 'Lead Developer',
//     bio: 'Chandan Yadav is the mastermind behind the development of our core products.',
//     tasks: []
//   },
//   {
//     id: 4,
//     name: 'Yashraj',
//     role: 'Project Manager',
//     bio: 'Yashraj manages the timeline and resources for various projects.',
//     tasks: []
//   },
//   {
//     id: 5,
//     name: 'Aman Singh',
//     role: 'Marketing Head',
//     bio: 'Aman leads our marketing strategy and campaigns to boost brand visibility.',
//     tasks: []
//   }
// ];

// // GET request to fetch team members
// export async function GET(request) {
//   return new Response(JSON.stringify(teamMembers), {
//     status: 200,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
// }

// // POST request to add a task for a team member
// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { memberId, task } = body;

//     const member = teamMembers.find((m) => m.id === memberId);
//     if (member) {
//       member.tasks.push(task); // Add the task to the member's task list
//       return new Response(JSON.stringify(member), {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//     }
//     return new Response('Member not found', { status: 404 });
//   } catch (error) {
//     return new Response('Invalid request data', { status: 400 });
//   }
// }


let teamMembers = [
  {
    id: 1,
    name: 'Yuvraj Singh',
    role: 'CEO',
    bio: 'Yuvraj Singh is the visionary behind our company and leads the strategy.',
    tasks: [] // Empty tasks for now
  },
  {
    id: 2,
    name: 'Vivek',
    role: 'CTO',
    bio: 'Vivek is responsible for the technological direction of the company.',
    tasks: [] // Empty tasks for now
  },
  {
    id: 3,
    name: 'Chandan Yadav',
    role: 'Lead Developer',
    bio: 'Chandan Yadav is the mastermind behind the development of our core products.',
    tasks: [] // Empty tasks for now
  },
  {
    id: 4,
    name: 'Yashraj',
    role: 'Project Manager',
    bio: 'Yashraj manages the timeline and resources for various projects.',
    tasks: [] // Empty tasks for now
  },
  {
    id: 5,
    name: 'Aman Singh',
    role: 'Marketing Head',
    bio: 'Aman leads our marketing strategy and campaigns to boost brand visibility.',
    tasks: [] // Empty tasks for now
  }
];

export async function GET() {
  return new Response(JSON.stringify(teamMembers), { status: 200 });
}

export async function POST(req) {
  const { memberId, task } = await req.json();

  const member = teamMembers.find((m) => m.id === memberId);
  if (member) {
    // Add the task to the member's task list
    member.tasks.push(task);
    return new Response(JSON.stringify(member), { status: 200 });
  }

  return new Response('Member not found', { status: 404 });
}
