import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Pages/RegisterPage';
import Login from './Pages/LoginPage';
import Problems from './Pages/ProblemsPage';
import ProblemDetail from './Pages/ProblemDetailPage';
import HomePage from './Pages/HomePage';
import Leaderboard from './Pages/LeaderboardPage';

// import { ThemeProvider } from './Context/ThemeContext';
import Contests from './Pages/ContestsPage';
import Submissions from './Pages/SubmissionsPage';

import { useAuth } from './Context/AuthContext';
import Profile from './Pages/ProfilePage';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 relative"> 
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
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        } />
        <Route path="/contests" element={
          <ProtectedRoute>
            <Contests />
          </ProtectedRoute>
        } />
        <Route path="/submissions" element={
          <ProtectedRoute>
            <Submissions />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}
