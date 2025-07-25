import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Pages/RegisterPage';
import Login from './Pages/LoginPage';
import Problems from './Pages/ProblemsPage';
import ProblemDetail from './Pages/ProblemDetailPage';
import HomePage from './Pages/HomePage';
import Standings from './Pages/StandingsPage';
import { useAuth } from './Context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 relative"> {/* 👈 Container helps fixed modal work */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/problems" element={
          <ProtectedRoute>
            <Problems />
          </ProtectedRoute>
        } />
        <Route path="/problems/:id" element={
          <ProtectedRoute>
            <ProblemDetail />
          </ProtectedRoute>
        } />
        <Route path="/standings" element={
          <ProtectedRoute>
            <Standings />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}
