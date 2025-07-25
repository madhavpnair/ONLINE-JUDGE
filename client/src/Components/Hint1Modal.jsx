import { useEffect, useState } from 'react';

const Hint1Modal = ({ problem, onClose }) => {
  const [hint, setHint] = useState('Loading...');

  useEffect(() => {
    const fetchHint = async () => {
      try {
        const res = await fetch('http://localhost:8000/ai/hint/level1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problem }),
        });

        // if (res.status === 429) {
        //   setHint('Quota exceeded. Please try again later.');
        //   return;
        // }

        const data = await res.json();
        setHint(data.hint || 'Fetching...');
        console.log(data);
      } catch (err) {
        // if(err.message === "Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent: [429 Too Many Requests] You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. [{\"@type\":\"type.googleapis.com/google.rpc.QuotaFailure\",\"violations\":[{\"quotaMetric\":\"generativelanguage.googleapis.com/generate_content_free_tier_requests\",\"quotaId\":\"GenerateRequestsPerDayPerProjectPerModel-FreeTier\",\"quotaDimensions\":{\"location\":\"global\",\"model\":\"gemini-1.5-flash\"},\"quotaValue\":\"50\"}]},{\"@type\":\"type.googleapis.com/google.rpc.Help\",\"links\":[{\"description\":\"Learn more about Gemini API quotas\",\"url\":\"https://ai.google.dev/gemini-api/docs/rate-limits\"}]},{\"@type\":\"type.googleapis.com/google.rpc.RetryInfo\",\"retryDelay\":\"31s\"}]"){
        //     setHint('quota exceeded try again later');
        // }
        // if(err.message == "Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"){
        //     setHint('quota exceeded please try again later')
        // }
        setHint('Failed to fetch hint.');
        console.error(err);
      }
    };

    fetchHint();
  }, [problem]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Hint 1</h3>
        <p>{hint}</p>
        <button
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Hint1Modal;
