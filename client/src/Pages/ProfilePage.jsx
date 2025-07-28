import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile", { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return <div className="text-center mt-10 text-lg">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="flex items-center space-x-6">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstname}%20${user.lastname}`}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-2 border-yellow-500"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {user.firstname} {user.lastname}
          </h1>
          <p className="text-gray-500">@{user.username}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-gray-700">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Institution</p>
          <p className="font-medium">{user.institution || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Problems Solved</p>
          <p className="font-medium">{user.problemsSolved}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Score</p>
          <p className="font-medium">{user.score}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Ranking</p>
          <p className="font-medium">{user.ranking}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Joined On</p>
          <p className="font-medium">
            {new Date(user.joinedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-500">Bio</p>
          <p className="font-medium">{user.bio || "No bio provided."}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
