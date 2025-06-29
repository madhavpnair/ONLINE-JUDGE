import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';

function Index() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api') // Will be proxied to http://localhost:5000/api
      .then((res) => res.text())
      .then((data) => setMsg(data));
  }, []);

  return (
    <div>
      <h1>Frontend + Backend Connected</h1>
      <p>{msg}</p>
      <Link to="/register">Go to Register</Link>
      <br></br>
      <Link to="/login" className="ml-4">Login</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
