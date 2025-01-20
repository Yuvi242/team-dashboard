// import './globals.css';

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <html lang="en">
//         <head>
//           {/* You can add meta tags, title, links, etc. here */}
//           <meta charSet="UTF-8" />
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//           <title>My Team App</title>
//         </head>
//         <body>
//           <header className="bg-blue-500 text-white p-4">
//             <h1 className="text-2xl">My Team Page</h1>
//           </header>
//           <main>{children}</main>
//           <footer className="bg-gray-800 text-white p-4 mt-6">
//             <p className="text-center">© 2025 My Company</p>
//           </footer>
//         </body>
//       </html>
//     </>
//   );
// }

// import './globals.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';


// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <html lang="en">
//         <head>
//           {/* You can add meta tags, title, links, etc. here */}
//           <meta charSet="UTF-8" />
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//           <title>My Team App</title>
//         </head>
//         <body>
//           <header className="bg-blue-800 text-white p-4 shadow-lg">
//             <h1 className="text-2xl">My Team Page</h1>
//           </header>
//           <main>{children}</main>
//         </body>
//       </html>
//     </>
//   );
// }




'use client'; // Mark this as a Client Component

import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/'); // Redirects to the home page
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Team App</title>
      </head>
      <body>
        <header className="bg-blue-800 text-white p-4 shadow-lg flex justify-between items-center">
          <h1 className="text-2xl">My Team Page</h1>
          <button
            onClick={navigateToHome}
            className="bg-white text-blue-800 px-4 py-2 rounded shadow hover:bg-gray-100"
          >
            Go to Home
          </button>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
