import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Context/ThemeContext';
import { useAuth } from '../Context/AuthContext';
import { SunIcon, MoonIcon, UserCircle } from 'lucide-react';

const Navbar = () => {
  // const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    const res = await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include', //send cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      logout(); // clears user info from localStorage
      navigate('/login'); // then redirect to login page
    } else {
      console.error('Logout failed:', await res.json());
    }
  } catch (error) {
    console.error('Logout request failed:', error);
  }
};



  return (
    <nav className="w-full bg-white dark:bg-zinc-900 text-black dark:text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold tracking-wide">
        <Link to="/home" className="hover:text-blue-500 dark:hover:text-yellow-300 transition duration-200">
          Code4life
        </Link>
      </div>

      <div className="hidden md:flex gap-8 text-sm font-medium">
        <Link to="/problems" className="hover:text-blue-500 dark:hover:text-yellow-300 transition">Problems</Link>
        <Link to="/leaderboard" className="hover:text-blue-500 dark:hover:text-yellow-300 transition">Leaderboard</Link>
        <Link to="/contests" className="hover:text-blue-500 dark:hover:text-yellow-300 transition">Contests</Link>
        <Link to="/submissions" className="hover:text-blue-500 dark:hover:text-yellow-300 transition">Submissions</Link>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <Link
          to="/profile" 
          className="hover:text-blue-500 dark:hover:text-yellow-300 transition"
        >
          <UserCircle size={26} />
        </Link>

        {/* <button
          onClick={toggleTheme}
          className="hover:text-yellow-400 transition"
        >
          {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </button> */}

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
