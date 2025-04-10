import React from 'react';

const HeadersInput = ({ headers, setHeaders }) => {
  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="font-medium text-gray-700 dark:text-gray-300">
          Headers
        </label>
        <button
          type="button"
          onClick={addHeader}
          className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
        >
          + Add Header
        </button>
      </div>
      
      {headers.length === 0 ? (
        <div className="text-sm text-gray-500 dark:text-gray-400 italic">
          No headers added yet. Click "Add Header" to add request headers.
        </div>
      ) : (
        <div className="space-y-2">
          {headers.map((header, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                className="input-field flex-1"
                value={header.key}
                onChange={(e) => updateHeader(index, 'key', e.target.value)}
                placeholder="Header Name"
              />
              <input
                type="text"
                className="input-field flex-1"
                value={header.value}
                onChange={(e) => updateHeader(index, 'value', e.target.value)}
                placeholder="Header Value"
              />
              <button
                type="button"
                onClick={() => removeHeader(index)}
                className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 focus:outline-none"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeadersInput;