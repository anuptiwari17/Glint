import React from 'react';
import ReactMarkdown from 'react-markdown';

const AISuggestion = ({ isLoading, suggestion, error }) => {
  return (
    <div className="card border border-blue-300 bg-blue-50 dark:bg-blue-900/20 p-4">
      <h4 className="text-md font-semibold mb-2 text-blue-800 dark:text-blue-200">AI Suggestion</h4>

      {isLoading && (
        <p className="text-sm italic text-gray-600 dark:text-gray-300">
          Analyzing error... please wait 🤖
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-300">⚠️ {error}</p>
      )}

      {suggestion && (
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{suggestion}</ReactMarkdown>
        </div>
      )}

      {!isLoading && !error && !suggestion && (
        <p className="text-sm italic text-gray-500 dark:text-gray-400">
          No suggestion available.
        </p>
      )}
    </div>
  );
};

export default AISuggestion;