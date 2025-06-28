import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

function Home() {
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
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
