import { useAuth } from '../Context/AuthContext';
import { useEffect, useState } from 'react';
import AuthModal from '../Components/AuthModal';
import NavBar from '../Components/NavBar'; // Import NavBar

const HomePage = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowModal(true);
    }
  }, [user]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 text-center p-6">
      <NavBar /> {/* Always render NavBar */}

      <h1 className="text-4xl font-bold mb-2 mt-6">Welcome to JudgePro</h1>
      <p className="text-gray-700">Where problem solving meets competition!</p>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default HomePage;
