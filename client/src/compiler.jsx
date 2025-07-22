import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function Compiler() {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRun = async () => {
    setLoading(true);
    setError('');
    setOutput('');

    try {
      const res = await fetch('http://localhost:8000/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language, code, input }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Unknown server error');
      }

      // ✅ Access actual string output
      setOutput(data.output.output);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded shadow space-y-4 h-full">
      <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Code Compiler</h2>

      <select
        className="p-2 border rounded"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="c">C</option>
      </select>

      {/* Code Editor */}
      <div className="h-[300px] border rounded overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language === 'c' ? 'cpp' : language} // map 'c' to cpp for highlighting
          value={code}
          theme="vs-dark"
          onChange={(value) => setCode(value || '')}
        />
      </div>

      <textarea
        className="w-full p-2 bg-white dark:bg-gray-800 dark:text-white border rounded"
        rows={3}
        placeholder="Custom input (optional)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        onClick={handleRun}
        disabled={loading}
      >
        {loading ? 'Running...' : 'Run Code'}
      </button>

      {error && <div className="text-red-500">❌ {error}</div>}

      <div>
        <label className="font-semibold text-gray-700 dark:text-gray-300">Output:</label>
        <pre className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded min-h-[100px] whitespace-pre-wrap">
          {output || (loading ? 'Waiting...' : '—')}
        </pre>
      </div>
    </div>
  );
}
