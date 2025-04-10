import React, { useEffect, useState } from 'react';
import { isValidJson } from '../utils/helpers';

const BodyEditor = ({ body, setBody, method }) => {
  const [error, setError] = useState('');
  
  // Methods that should have body content
  const bodyMethods = ['POST', 'PUT', 'PATCH'];
  const canHaveBody = bodyMethods.includes(method);

  // Validate JSON when body changes
  useEffect(() => {
    if (body && !isValidJson(body)) {
      setError('Invalid JSON format');
    } else {
      setError('');
    }
  }, [body]);

  // Format the JSON for better readability
  const formatJson = () => {
    try {
      if (!body || body.trim() === '') return;
      const parsed = JSON.parse(body);
      setBody(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError('Cannot format: Invalid JSON');
    }
  };

  // Clear the body content
  const clearBody = () => {
    setBody('');
    setError('');
  };

  if (!canHaveBody) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="body" className="font-medium text-gray-700 dark:text-gray-300">
          Request Body (JSON)
        </label>
        <div className="space-x-2">
          <button
            type="button"
            onClick={formatJson}
            className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
            disabled={!body || error}
          >
            Format JSON
          </button>
          <button
            type="button"
            onClick={clearBody}
            className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
            disabled={!body}
          >
            Clear
          </button>
        </div>
      </div>
      <textarea
        id="body"
        className={`input-field w-full h-40 font-mono text-sm ${error ? 'border-red-500' : ''}`}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder='{\n  "key": "value"\n}'
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default BodyEditor;