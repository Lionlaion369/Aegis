// aegis_listener_fn.js
const functions = require('firebase-functions');
const listener = require('../core/aegis_listener');

exports.AegisGateway = functions.https.onRequest(async (req, res) => {
  const signature = req.headers['x-cmd-sign'] || req.headers['x-cmd-signature'];
  const body = req.body || {};
  try {
    const out = await listener.receive(body, signature);
    res.send({ status: 'OK', out });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
});
