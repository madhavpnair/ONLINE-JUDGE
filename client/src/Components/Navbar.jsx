import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Context/ThemeContext';
import { useAuth } from '../Context/AuthContext';
import { SunIcon, MoonIcon } from 'lucide-react';

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Immediately logout on client side
    logout();
    navigate('/');

    // Try sending logout request (optional feedback)
    try {
      await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user?.username }),
      });
    } catch (error) {
      console.error('Logout request failed:', error);
      // We ignore this since logout is already done on client
    }
  };

  return (
    <nav className="w-full bg-white dark:bg-black text-black dark:text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-semibold">
        <Link to="/home">JudgePro</Link>
      </div>

      <div className="hidden md:flex space-x-8 text-sm">
        <Link to="/contests" className="hover:text-blue-500 dark:hover:text-gray-300 transition">Contests</Link>
        <Link to="/problems" className="hover:text-blue-500 dark:hover:text-gray-300 transition">Problems</Link>
        <Link to="/standings" className="hover:text-blue-500 dark:hover:text-gray-300 transition">LeaderBoard</Link>
      </div>

      <div className="flex items-center space-x-4 text-sm">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>

        <button onClick={toggleTheme} className="text-lg hover:text-yellow-500 transition">
          {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
