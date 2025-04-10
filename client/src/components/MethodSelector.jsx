import React from 'react';

const MethodSelector = ({ method, setMethod }) => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
  
  // Color mapping for different HTTP methods
  const methodColors = {
    GET: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    POST: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    PUT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    PATCH: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    HEAD: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    OPTIONS: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
  };

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="method" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
        HTTP Method
      </label>
      <div className="flex space-x-2">
        {methods.map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setMethod(m)}
            className={`px-3 py-1 rounded-md font-medium text-sm ${
              m === method
                ? methodColors[m] + ' ring-2 ring-offset-2 ring-opacity-50 ring-' + m.toLowerCase() + '-400'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MethodSelector;