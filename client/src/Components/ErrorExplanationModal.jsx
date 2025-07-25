import { useEffect, useState } from "react";

const ErrorExplanationModal = ({code, onClose }) => {
  const [explanation, setExplanation] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:8000/ai/error-explanation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
      .then(res => res.json())
      .then(data => setExplanation(data.explanation || 'No explanation provided'))
      .catch(() => setExplanation('Failed to explain error.'));
  }, [code]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Error Explanation</h3>
        <p>{explanation}</p>
        <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorExplanationModal;
