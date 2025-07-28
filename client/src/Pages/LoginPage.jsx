import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // 

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();
  const { login } = useAuth(); //the login fn is there at Authcontext

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', formData,{withCredentials: true});

      const { username } = res.data;

      if (!username) {
        throw new Error("Invalid response from server");
      }

      //  Save login state
      login({ username }); 

      // alert(message); // success message from backend
      navigate('/home'); //  go to home

    } catch (error) {
      alert(error.response?.data?.message || "Invalid response from server");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-[1.01]">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Login to your Account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              name="username"
              type="text"
              onChange={handleChange}
              placeholder="username"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
