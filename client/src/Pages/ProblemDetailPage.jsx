import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Compiler from '../Components/Compiler';
import Split from 'react-split';
import './SplitStyle.css'; // For split styling

export default function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/problems/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch problem');
        return res.json();
      })
      .then(setProblem)
      .catch(err => setError(err.message || 'Something went wrong'));
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center p-10">{error}</p>;
  }

  if (!problem) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="h-screen overflow-hidden">
      <Split
        className="split"
        sizes={[50, 50]}
        minSize={300}
        expandToMin={false}
        gutterSize={8}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        {/* Problem Panel */}
        <div className="overflow-y-auto p-6 bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-300 mb-2">
            {problem.title}
          </h1>

          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Difficulty: <span className="font-medium">{problem.difficulty}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {problem.tags?.map(tag => (
              <span key={tag} className="bg-indigo-100 dark:bg-indigo-800 text-xs px-2 py-1 rounded-full text-indigo-700 dark:text-indigo-200">
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="font-semibold text-lg text-indigo-500">Description</h2>
              <p className="mt-1">{problem.description}</p>
            </section>

            <section>
              <h2 className="font-semibold text-lg text-indigo-500">Input Format</h2>
              <p className="mt-1">{problem.inputFormat}</p>
            </section>

            <section>
              <h2 className="font-semibold text-lg text-indigo-500">Output Format</h2>
              <p className="mt-1">{problem.outputFormat}</p>
            </section>

            <section>
              <h2 className="font-semibold text-lg text-indigo-500">Constraints</h2>
              <p className="mt-1 whitespace-pre-wrap">{problem.constraints}</p>
            </section>

            <section>
              <h2 className="font-semibold text-lg text-indigo-500">Sample Input</h2>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm whitespace-pre-wrap">{problem.sampleInput}</pre>
            </section>

            <section>
              <h2 className="font-semibold text-lg text-indigo-500">Sample Output</h2>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm whitespace-pre-wrap">{problem.sampleOutput}</pre>
            </section>
          </div>
        </div>

        {/* Compiler Panel */}
        <div className="bg-gray-50 dark:bg-gray-950 p-4 overflow-y-auto">
          <Compiler
            problemId={id}
            sampleInput={problem.sampleInput}
            expectedOutput={problem.sampleOutput}
            problemst={problem.description}
          />
        </div>
      </Split>
    </div>
  );
}
