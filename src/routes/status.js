const express = require('express');
const router = express.Router();
const launchRobot = require('../utils/LaunchRobot');

router.get('/launchRobot', (req, res) => {
  launchRobot();
  res.send('Robot launched');
});

module.exports = router;
