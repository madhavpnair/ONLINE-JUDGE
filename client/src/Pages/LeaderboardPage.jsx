import React, { useEffect, useState } from "react";
import Navbar from '../Components/Navbar';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/leaderboard", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((users) => {
        setData(users);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-6">
        <Navbar />
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Leaderboard
        </h2>
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="bg-indigo-100">
              <th className="px-4 py-2 text-indigo-700">Rank</th>
              <th className="px-4 py-2 text-indigo-700">UserName</th>
              <th className="px-4 py-2 text-indigo-700">Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr
                key={user._id || index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50 transition`}
              >
                <td className="px-4 py-2 font-semibold">{index + 1}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
