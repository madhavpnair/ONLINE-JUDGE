import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize navigate for redirection  

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/register', formData);
      alert(res.data.message);

      // Navigate to the home page after successful registration
      navigate('/home');
      
    } catch (error) {
      alert(error.response?.data || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-[1.01]">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              name="firstname"
              onChange={handleChange}
              placeholder="firstname"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              name="lastname"
              onChange={handleChange}
              placeholder="lastname"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="email"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              name="username"
              type="username"
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
            Register
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account? <a href="/login" className="text-blue-600 font-medium hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
