import axios from 'axios';

/**
 * Send an HTTP request to the specified URL with given parameters
 * @param {string} url - The URL to send the request to
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {Object} headers - Request headers as key-value pairs
 * @param {Object|null} body - Request body (for POST/PUT requests)
 * @returns {Promise} - Promise resolving to the response object
 */
export const sendRequest = async (url, method, headers, body) => {
  const startTime = Date.now();
  
  try {
    // Convert headers from array of objects to a single object
    const headersObj = headers.reduce((acc, header) => {
      if (header.key && header.key.trim() !== '') {
        acc[header.key] = header.value;
      }
      return acc;
    }, {});

    const response = await axios({
      url,
      method,
      headers: headersObj,
      data: method !== 'GET' && method !== 'DELETE' ? body : undefined,
      timeout: 30000, // 30 second timeout
    });

    const endTime = Date.now();
    
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      duration: endTime - startTime,
    };
  } catch (error) {
    const endTime = Date.now();
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        data: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        duration: endTime - startTime,
        isError: true,
      };
    } else if (error.request) {
      // The request was made but no response was received
      throw {
        message: 'No response received from server',
        request: error.request,
        duration: endTime - startTime,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      throw {
        message: error.message,
        duration: endTime - startTime,
      };
    }
  }
};