const express = require('express');
const router = express.Router();
const logger = require('../logger');
const os = require('os');

/**
 * GET /health
 * Returns the health status of the application
 */
router.get('/', (req, res) => {
  const healthData = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime().toFixed(2)} seconds`,
    environment: process.env.NODE_ENV || 'development',
    system: {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      memoryUsage: {
        total: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
        free: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
        used: `${((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2)} MB`,
      },
      cpuLoad: os.loadavg().map((load) => load.toFixed(2)),
    },
  };

  logger.info(`Health check requested from ${req.ip}`);
  res.status(200).json(healthData);
});

module.exports = router;
