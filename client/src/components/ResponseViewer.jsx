import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view';
import AISuggestion from './AISuggestion'; // ✅ AI suggestion component
import { formatDuration, getStatusCodeColor } from '../utils/helpers';

const ResponseViewer = ({ response, isLoading, error }) => {
  const [viewMode, setViewMode] = useState('formatted');
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  // 🔁 Auto-fetch AI suggestions when response is an error
  useEffect(() => {
    if (response && response.status >= 400) {
      getAISuggestion();
    } else {
      setAiSuggestion(null);
      setAiError(null);
    }
  }, [response]);

  const getAISuggestion = async () => {
    setAiLoading(true);
    setAiError(null);
  
    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: response.url,
          method: response.method,
          headers: response.requestHeaders || {},
          body: response.requestBody || {},
          responseStatus: response.status,
          responseData: response.data || {}
        })
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch AI suggestion');
      }
  
      const data = await res.json();
      if (!data.suggestion) {
        throw new Error('No suggestion received from AI');
      }
  
      setAiSuggestion(data.suggestion);
    } catch (err) {
      console.error('AI Suggestion Error:', err);
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };
  

  if (isLoading) {
    return (
      <div className="mt-6 card animate-pulse">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 card border border-red-300 bg-red-50 dark:bg-red-900/20">
        <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Error</h3>
        <p className="text-red-700 dark:text-red-300">{error.message || 'An error occurred while making the request'}</p>
        {error.request && (
          <div className="mt-2">
            <p className="text-red-700 dark:text-red-300">No response received (timeout or CORS issue).</p>
          </div>
        )}
      </div>
    );
  }

  if (!response) return null;

  const { status, statusText, headers, data, duration } = response;
  const statusColor = getStatusCodeColor(status);
  const showAiSection = response && response.status >= 400;

  return (
    <div className="mt-6">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Response</h3>
          <div className="flex items-center space-x-4">
            <div className={`font-mono ${statusColor}`}>
              {status} {statusText}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formatDuration(duration)}
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
          <nav className="flex space-x-4">
            {['formatted', 'raw', 'headers'].map((mode) => (
              <button
                key={mode}
                className={`py-2 px-4 text-sm font-medium border-b-2 ${
                  viewMode === mode
                    ? 'border-primary-light text-primary-light dark:text-primary-light'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setViewMode(mode)}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Viewer */}
        {viewMode === 'formatted' && (
          <div className="overflow-auto max-h-96 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 p-2">
            {typeof data === 'object' ? (
              <ReactJson 
                src={data} 
                theme={document.documentElement.classList.contains('dark') ? "monokai" : "rjv-default"}
                enableClipboard
                displayDataTypes={false}
                collapsed={2}
              />
            ) : (
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200">
                {String(data)}
              </pre>
            )}
          </div>
        )}

        {viewMode === 'raw' && (
          <div className="overflow-auto max-h-96 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 p-2">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200">
              {typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data)}
            </pre>
          </div>
        )}

        {viewMode === 'headers' && (
          <div className="overflow-auto max-h-96 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 p-2">
            <div className="space-y-1">
              {headers && Object.entries(headers).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 gap-2">
                  <div className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">{key}:</div>
                  <div className="col-span-2 font-mono text-sm text-gray-800 dark:text-gray-200">{value}</div>
                </div>
              ))}
              {(!headers || Object.keys(headers).length === 0) && (
                <p className="text-gray-500 dark:text-gray-400 italic">No headers returned</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 🧠 AI Suggestion Section */}
      {showAiSection && (
        <div className="mt-4">
          <AISuggestion 
            isLoading={aiLoading}
            suggestion={aiSuggestion}
            error={aiError}
          />
        </div>
      )}
    </div>
  );
};

export default ResponseViewer;
