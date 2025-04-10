import React from 'react';
import { isValidUrl } from '../utils/helpers';

const UrlInput = ({ url, setUrl, onSubmit }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="url" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
        Request URL
      </label>
      <div className="flex">
        <input
          type="text"
          id="url"
          className={`input-field flex-grow ${!url || isValidUrl(url) ? '' : 'border-red-500'}`}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          onKeyDown={handleKeyDown}
        />
      </div>
      {url && !isValidUrl(url) && (
        <p className="mt-1 text-sm text-red-500">Please enter a valid URL</p>
      )}
    </div>
  );
};

export default UrlInput;