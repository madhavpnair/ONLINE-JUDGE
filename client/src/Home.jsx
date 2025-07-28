import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, Users, FileText, ClipboardList, Code } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

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
    <div className="max-h-bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-500 min-h-screen">

      {/* Navbar */}
      <nav className="dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tracking-wide">
          Online Judge
        </div>

        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li><button onClick={() => navigate('/problems')} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-transform transform hover:scale-105">Problems</button></li>
          <li><button onClick={() => navigate('/leaderboard')} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-transform transform hover:scale-105">Leaderboard</button></li>
          <li><button onClick={() => navigate('/profile')} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-transform transform hover:scale-105">Profile</button></li>
          <li><button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-transform transform hover:scale-105 shadow-sm">Logout</button></li>
          <li><button onClick={toggleDark} className="ml-4">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button></li>
        </ul>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-4 space-y-4">
          <button onClick={() => navigate('/problems')} className="block w-full text-left">Problems</button>
          <button onClick={() => navigate('/leaderboard')} className="block w-full text-left">Leaderboard</button>
          <button onClick={() => navigate('/profile')} className="block w-full text-left">Profile</button>
          <button onClick={handleLogout} className="block w-full text-left text-red-500">Logout</button>
          <button onClick={toggleDark}>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</button>
        </div>
      )}

      {/* Main Content */}
      <main className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">🏠 Welcome to the Online Judge!</h1>
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
