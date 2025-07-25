import { useNavigate } from 'react-router-dom';

const AuthModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="bg-white/80 backdrop-blur-lg rounded-lg shadow-2xl p-6 w-80 border border-gray-300 transition-transform duration-300">
        <h2 className="text-2xl font-semibold mb-4 text-center">Welcome to JudgePro</h2>
        <p className="text-center text-gray-700 mb-6">Please log in or sign up to continue.</p>
        <div className="flex justify-around">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              onClose();
              navigate('/login');
            }}
          >
            Login
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => {
              onClose();
              navigate('/register');
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
