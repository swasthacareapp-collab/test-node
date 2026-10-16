const logger = require('../logger');

/**
 * Middleware to log all incoming HTTP requests
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.originalUrl} - ${res.statusCode} [${duration}ms] - IP: ${req.ip}`;

    if (res.statusCode >= 500) {
      logger.error(logMessage);
    } else if (res.statusCode >= 400) {
      logger.warn(logMessage);
    } else {
      logger.info(logMessage);
    }
  });

  next();
};

/**
 * Middleware to handle 404 Not Found errors
 */
const notFoundHandler = (req, res, next) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    status: 'error',
    message: `Route '${req.originalUrl}' not found`,
  });
};

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  logger.error(`Unhandled error on ${req.method} ${req.originalUrl}: ${err.message}`, err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};

module.exports = { requestLogger, notFoundHandler, errorHandler };
