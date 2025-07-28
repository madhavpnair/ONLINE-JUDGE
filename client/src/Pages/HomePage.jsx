import Navbar from '../Components/Navbar'; 
import { Users, FileText, ClipboardList, Code } from 'lucide-react';
import { useState } from 'react';
// import { buttonClass, glitter } from '../Components/Styles';

export default function Home() {

  const [darkMode, setDarkMode] = useState(false);

  let username = 'coder';
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.username) {
      username = user.username;
    }
  } catch (e) {
    console.warn(e,"Failed to parse user from localStorage");
  }

  const stats = [
    {
      label: 'Total Users',
      value: '12,345+',
      icon: <Users size={32} className="text-indigo-600 dark:text-indigo-400" />,
    },
    {
      label: 'Problems Available',
      value: '850+',
      icon: <FileText size={32} className="text-green-600 dark:text-green-400" />,
    },
    {
      label: 'Total Submissions',
      value: '210,000+',
      icon: <ClipboardList size={32} className="text-yellow-600 dark:text-yellow-400" />,
    },
    {
      label: 'Languages Supported',
      value: 'C, C++, Python, Java',
      icon: <Code size={32} className="text-red-600 dark:text-red-400" />,
    },
  ];

  return (
    // <div className="bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white min-h-screen transition-colors duration-500">
    <div className={`${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
      } min-h-screen p-6 transition-all`}
      >
      <Navbar />
      
          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            // className={`${buttonClass} bg-gray-700 hover:bg-gray-800 ${glitter}`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

      
      <main className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">🏠 Welcome {username}!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">Solve problems. Compete on the leaderboard. Track your profile.</p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{item.label}</h3>
              <p className="text-indigo-600 dark:text-indigo-400 text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
