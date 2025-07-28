import { useState } from 'react';
import Editor from '@monaco-editor/react';
import Hint1Modal from './Hint1Modal';
import Hint2Modal from './Hint2Modal';
import ErrorExplanationModal from './ErrorExplanationModal';

export default function Compiler({ problemst, testcases }) {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setError('');
    setOutput('');

    try {
      // If custom input is provided, run only that
      if (customInput.trim()) {
        const res = await fetch('http://localhost:8000/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language, code, input: customInput }),
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Unknown server error');
        setOutput(`Output:\n${data.output}`);
        return;
      }

      // Else run all test cases
      let results = [];
      //console.log(`Running ${testcases.length} test cases...`);
      console.log(testcases);
      for (let i = 0; i < 4; i++) {
        const tc = testcases[i];

        console.log(`Running Test Case ${i + 1}:`, tc);

        const res = await fetch('http://localhost:8000/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language, code, input: tc.input }),
        });

        const data = await res.json();
        if (!data.success) {
          results.push(`❌ Test Case ${i + 1}: Error - ${data.error || 'Execution failed'}`);
        } else if (data.output.trim() === tc.expectedOutput.trim()) {
          results.push(`✅ Test Case ${i + 1}: Passed`);
        } else {
          results.push(
            `❌ Test Case ${i + 1}: Failed\nExpected: ${tc.expectedOutput.trim()}\nReceived: ${data.output.trim()}`
          );
        }
      }

      let passedAll = results.every((r) => r.startsWith('✅'));
      results.push(passedAll ? '🎉 All test cases passed!' : '❌ Some test cases failed.');
      setOutput(results.join('\n\n'));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const buttonClass =
    'relative px-4 py-2 rounded text-white font-semibold shadow-md transition-transform transform hover:scale-105 overflow-hidden';
  const glitter =
    'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:animate-glitter';

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
      } min-h-screen p-6 transition-all`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
          Code Compiler
        </h2>

        <div className="flex gap-2">
          <button
            className={`${buttonClass} bg-yellow-500 hover:bg-yellow-600 ${glitter}`}
            onClick={() => setShowHint1(true)}
          >
            Hint 1
          </button>
          <button
            className={`${buttonClass} bg-yellow-500 hover:bg-yellow-600 ${glitter}`}
            onClick={() => setShowHint2(true)}
          >
            Hint 2
          </button>
          <button
            className={`${buttonClass} bg-green-600 hover:bg-green-700 ${glitter}`}
            onClick={() => setShowErrorModal(true)}
          >
            Explain Error
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`${buttonClass} bg-gray-700 hover:bg-gray-800 ${glitter}`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      {/* Language Selector */}
      <select
        className="p-2 mb-4 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="c">C</option>
      </select>

      {/* Code Editor */}
      <div className="h-[300px] w-full border rounded overflow-hidden mb-4">
        <Editor
          height="100%"
          width="100%"
          defaultLanguage={language}
          language={language === 'c' ? 'cpp' : language}
          value={code}
          theme={darkMode ? 'vs-dark' : 'light'}
          onChange={(value) => setCode(value || '')}
        />
      </div>

      {/* Custom Input */}
      <textarea
        className="h-[40px] w-full p-2 mb-4 bg-white dark:bg-gray-800 dark:text-white border rounded"
        rows={2}
        placeholder="Custom input (optional)"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
      />

      {/* Run Button */}
      <button
        className={`${buttonClass} bg-indigo-600 hover:bg-indigo-700 ${glitter}`}
        onClick={handleRun}
        disabled={loading}
      >
        {loading ? 'Running...' : 'Run Code'}
      </button>

      {/* Error */}
      {error && <div className="text-red-500 mt-2">❌ {error}</div>}

      {/* Output */}
      <div className="mt-4">
        <label className="font-semibold block mb-1">Output:</label>
        <pre className="p-3 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded min-h-[100px] whitespace-pre-wrap">
          {output || (loading ? 'Waiting...' : '—')}
        </pre>
      </div>

      {/* Modals */}
      {showHint1 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <Hint1Modal onClose={() => setShowHint1(false)} problem={problemst} />
          </div>
        </div>
      )}
      {showHint2 && <Hint2Modal onClose={() => setShowHint2(false)} problem={problemst} />}
      {showErrorModal && (
        <ErrorExplanationModal onClose={() => setShowErrorModal(false)} code={code} />
      )}
    </div>
  );
}
