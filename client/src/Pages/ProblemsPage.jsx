import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/problems') // full URL, no proxy needed btw i added proxy in vite.config.js???
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch problems');
        return res.json();
      })
      .then((data) => {
        setProblems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-6">📘 Problem Set</h1>

      {loading && <p className="text-center">Loading problems...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <div
            key={problem._id}
            onClick={() => navigate(`/problems/${problem._id}`)} // Navigate to problem detail
            role="button"
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{problem.title}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              {problem.description?.slice(0, 100)}...
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Difficulty: <span className="font-medium">{problem.difficulty}</span>
            </p>
            {problem.tags?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {problem.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white px-2 py-1 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
