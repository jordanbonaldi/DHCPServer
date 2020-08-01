const express = require('express');
const router = express.Router();
const statusUtils = require('../utils/StatusUtils');
const {getUUID} = require('../utils/AuthorisationUtils');
const requestPromise = require('request-promise');

router.get('/status/:status', (req, res) => {
  if (req.params.status !== 'stop' && req.params.status !== 'launch')
    return res.send('Please use stop or launch as params');

  statusUtils[`${req.params.status}Robot`]();

  return requestPromise.post({
    method: 'POST',
    uri: `http://panel.mall-e-robots.com/admin/robots/${getUUID()}`,
    body: {
      status: req.params.status === 'launch' ? 'Available' : 'off'
    },
    json: true
  }).then(() =>
      res.send({
        status: 'OK',
        message: req.params.status
      })
  );
});

module.exports = router;
