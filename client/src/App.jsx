import React, { useState, useContext } from 'react';
import UrlInput from './components/UrlInput';
import MethodSelector from './components/MethodSelector';
import HeadersInput from './components/HeadersInput';
import BodyEditor from './components/BodyEditor';
import ResponseViewer from './components/ResponseViewer';
import ThemeToggle from './components/ThemeToggle';
import { ThemeContext } from './context/ThemeContext';
import { sendRequest } from './utils/apiCaller';
import { isValidUrl, isValidJson, getSampleApis } from './utils/helpers';

function App() {
  const { darkMode } = useContext(ThemeContext);
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSamples, setShowSamples] = useState(false);

  const handleSubmit = async () => {
    // Validate input
    if (!url || !isValidUrl(url)) {
      setError({ message: 'Please enter a valid URL' });
      return;
    }

    if (method !== 'GET' && method !== 'DELETE' && body && !isValidJson(body)) {
      setError({ message: 'Request body contains invalid JSON' });
      return;
    }

    // Clear previous response and error
    setResponse(null);
    setError(null);
    setIsLoading(true);

    try {
      // Parse body if it's a string and not empty
      let bodyData = body;
      if (body && typeof body === 'string' && body.trim() !== '') {
        try {
          bodyData = JSON.parse(body);
        } catch (e) {
          // If parsing fails, use the raw body
          bodyData = body;
        }
      }

      const responseData = await sendRequest(url, method, headers, bodyData);
      setResponse(responseData);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleApiClick = (sample) => {
    setUrl(sample.url);
    setMethod(sample.method);
    setShowSamples(false);
  };

  const sampleApis = getSampleApis();

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}>
      <div className="container mx-auto p-4 md:p-6 max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-light">Glint - API Tester Tool</h1>
          <ThemeToggle />
        </header>

        <main className="card">
          {/* Request Section */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <h2 className="text-xl font-semibold mb-2 md:mb-0">Request</h2>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="button-secondary text-sm"
                  onClick={() => setShowSamples(!showSamples)}
                >
                  Sample APIs
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !url}
                  className="button-primary flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Request'
                  )}
                </button>
              </div>
            </div>
            
            {/* Sample APIs dropdown */}
            {showSamples && (
              <div className="mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium mb-2">Quick Start - Sample APIs</h3>
                <ul className="space-y-1">
                  {sampleApis.map((api, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleSampleApiClick(api)}
                        className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
                      >
                        <span className="font-medium">{api.name}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2 text-xs">{api.method}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <UrlInput url={url} setUrl={setUrl} onSubmit={handleSubmit} />
            <MethodSelector method={method} setMethod={setMethod} />
            <HeadersInput headers={headers} setHeaders={setHeaders} />
            <BodyEditor body={body} setBody={setBody} method={method} />
          </div>

          {/* Response Section */}
          <ResponseViewer response={response} isLoading={isLoading} error={error} />
        </main>

        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Glint - AI Powered API Tester Tool</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
