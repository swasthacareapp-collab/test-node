const express = require('express');
const router = express.Router();
const logger = require('../logger');

/**
 * GET /test?status=success or GET /test?status=failure
 */
router.get('/', (req, res) => {
  const { status } = req.query;

  if (!status) {
    logger.warn('POST /test - Missing "status" field in request body');
    return res.status(400).json({
      status: 'error',
      message: 'Missing required field: "status". Pass "success" or "failure".',
    });
  }

  if (status === 'success') {
    logger.info('POST /test - ✅ Success response triggered');
    return res.status(200).json({
      status: 'success',
      message: 'API call was successful!',
    });
  }

  if (status === 'failure') {
    logger.error('POST /test - ❌ Failure response triggered');
    return res.status(500).json({
      status: 'failure',
      message: 'API call failed!',
    });
  }

  // Invalid value
  logger.warn(`POST /test - Invalid status value: "${status}"`);
  return res.status(400).json({
    status: 'error',
    message: `Invalid value for "status": "${status}". Use "success" or "failure".`,
  });
});

module.exports = router;
