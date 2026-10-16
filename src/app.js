const express = require('express');
const logger = require('./logger');
const healthRoute = require('./routes/health');
const testRoute = require('./routes/test');
const { requestLogger, notFoundHandler, errorHandler } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use(requestLogger);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js API!', version: '1.0.0' });
});

app.use('/health', healthRoute);
app.use('/test', testRoute);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`Health check available at http://localhost:${PORT}/health`);
});

module.exports = app;
