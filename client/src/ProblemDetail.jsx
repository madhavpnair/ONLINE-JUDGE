import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState('');


  console.log("Fetching problem with ID:", id);
    // Fetch problem details by ID
  useEffect(() => {
    fetch(`/api/problems/${id}`)
      .then(res => {
        if(!res.ok)throw new Error('Failed to fetch problem');
        return res.json();
  })
      .then(setProblem)
      .catch(err => setError(err.message || 'Something went wrong'));
  }, [id]);

  if(error) {
    return <p className="text-red-500 text-center p-10">{error}</p>;
  }
  if (!problem) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300 mb-4">{problem.title}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Difficulty: {problem.difficulty}</p>
      <div className="mb-4">{problem.tags?.map(tag => <span key={tag} className="text-xs bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded mr-1">{tag}</span>)}</div>
      <div className="prose dark:prose-invert max-w-none">
        <h2>Description</h2>
        <p>{problem.description}</p>

        <h2>Input Format</h2>
        <p>{problem.inputFormat}</p>

        <h2>Output Format</h2>
        <p>{problem.outputFormat}</p>

        <h2>Constraints</h2>
        <p>{problem.constraints}</p>

        <h2>Sample Input</h2>
        <pre>{problem.sampleInput}</pre>

        <h2>Sample Output</h2>
        <pre>{problem.sampleOutput}</pre>
      </div>
    </div>
  );
}
