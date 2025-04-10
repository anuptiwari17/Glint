const Request = require('../models/Request');
const axios = require('axios');

/**
 * @desc    Save a request
 * @route   POST /api/request
 * @access  Private
 */
exports.saveRequest = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const request = await Request.create(req.body);

    res.status(201).json({
      success: true,
      data: request
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all requests for a user
 * @route   GET /api/request
 * @access  Private
 */
exports.getRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({ user: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single request
 * @route   GET /api/request/:id
 * @access  Private
 */
exports.getRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found'
      });
    }

    // Make sure user owns the request
    if (request.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this request'
      });
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update request
 * @route   PUT /api/request/:id
 * @access  Private
 */
exports.updateRequest = async (req, res, next) => {
  try {
    let request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found'
      });
    }

    // Make sure user owns the request
    if (request.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this request'
      });
    }

    request = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete request
 * @route   DELETE /api/request/:id
 * @access  Private
 */
exports.deleteRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found'
      });
    }

    // Make sure user owns the request
    if (request.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this request'
      });
    }

    await request.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Execute a request (proxy)
 * @route   POST /api/request/execute
 * @access  Private
 */
exports.executeRequest = async (req, res, next) => {
  try {
    const { url, method, headers, body } = req.body;

    if (!url || !method) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a URL and method'
      });
    }

    // Convert headers from array to object
    const headersObj = {};
    if (headers && Array.isArray(headers)) {
      headers.forEach(header => {
        if (header.key && header.key.trim() !== '') {
          headersObj[header.key] = header.value;
        }
      });
    }

    const startTime = Date.now();
    
    try {
      const response = await axios({
        url,
        method,
        headers: headersObj,
        data: method !== 'GET' && method !== 'DELETE' ? body : undefined,
        timeout: 30000, // 30 second timeout
      });

      const endTime = Date.now();
      
      return res.status(200).json({
        success: true,
        data: {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          duration: endTime - startTime,
        }
      });
    } catch (error) {
      const endTime = Date.now();
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return res.status(200).json({
          success: true,
          data: {
            data: error.response.data,
            status: error.response.status,
            statusText: error.response.statusText,
            headers: error.response.headers,
            duration: endTime - startTime,
            isError: true,
          }
        });
      } else if (error.request) {
        // The request was made but no response was received
        return res.status(500).json({
          success: false,
          error: 'No response received from server',
          request: error.request,
          duration: endTime - startTime,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        return res.status(500).json({
          success: false,
          error: error.message,
          duration: endTime - startTime,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};