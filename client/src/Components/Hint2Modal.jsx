import { useEffect, useState } from 'react';

const Hint2Modal = ({ problem, onClose }) => 
    {
  const [hint, setHint] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:8000/ai/hint/level2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problem }),
    })
      .then(res => res.json())
      .then(data => setHint(data.hint || 'Fetching'))
      .catch(() => setHint('Failed to fetch hint.'));
  }, [problem]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Hint 2</h3>
        <p>{hint}</p>
        <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Hint2Modal;