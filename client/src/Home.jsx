import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';

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

  return (
    <div className="max-h-bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-500">

      {/* Navbar */}
      <nav className="dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tracking-wide">
          Online Judge
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li>
            <button onClick={() => navigate('/problems')} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-transform transform hover:scale-105">Problems</button>
          </li>
          <li>
            <button onClick={() => navigate('/leaderboard')} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-transform transform hover:scale-105">Leaderboard</button>
          </li>
          <li>
            <button onClick={() => navigate('/profile')} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-transform transform hover:scale-105">Profile</button>
          </li>
          <li>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-transform transform hover:scale-105 shadow-sm">Logout</button>
          </li>
          <li>
            <button onClick={toggleDark} className="ml-4">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
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
          <button onClick={toggleDark}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">🏠 Welcome to the Online Judge!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Solve problems. Compete on the leaderboard. Track your profile.</p>
      </main>
    </div>
  );
}