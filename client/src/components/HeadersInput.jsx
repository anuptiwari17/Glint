import React from 'react';

const commonHeaders = {
  'Content-Type': [
    'application/json',
    'application/x-www-form-urlencoded',
    'multipart/form-data',
  ],
  'Accept': ['application/json', 'text/plain', '*/*'],
  'Authorization': ['Bearer ', 'Basic '],
  'Cache-Control': ['no-cache', 'max-age=0'],
  'User-Agent': ['Mozilla/5.0'],
  'Accept-Language': ['en-US,en;q=0.9'],
};

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
              {/* Key Input with datalist */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  list={`headerKeys${index}`}
                  className="input-field w-full"
                  value={header.key}
                  onChange={(e) => updateHeader(index, 'key', e.target.value)}
                  placeholder="Header Name"
                />
                <datalist id={`headerKeys${index}`}>
                  {Object.keys(commonHeaders).map((key) => (
                    <option key={key} value={key} />
                  ))}
                </datalist>
              </div>

              {/* Value Input with conditional datalist */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  list={`headerValues${index}`}
                  className="input-field w-full"
                  value={header.value}
                  onChange={(e) => updateHeader(index, 'value', e.target.value)}
                  placeholder="Header Value"
                />
                <datalist id={`headerValues${index}`}>
                  {header.key &&
                    commonHeaders[header.key]?.map((value) => (
                      <option key={value} value={value} />
                    ))}
                </datalist>
              </div>

              {/* Remove Button */}
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