import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Problems from './Problems';


function Index() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api') // Will be proxied to http://localhost:5000
      .then((res) => res.text())
      .then((data) => setMsg(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-500">
      <h1 className="text-3xl font-bold mb-2">Frontend + Backend Connected</h1>
      <p className="mb-6 text-lg">{msg}</p>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

