// aegis_alerts.js
const axios = require('axios');
const registry = require('./registry_sync'); // small helper to get Willa endpoint

module.exports = {
  raiseAlert: async function(alertData) {
    const willaEndpoint = registry.getWillaEndpoint();
    // try to notify Willa
    try {
      const res = await axios.post(willaEndpoint, { command: 'ALERT', payload: alertData }, { timeout: 10000 });
      return { sent: true, res: res.data };
    } catch (e) {
      return { sent: false, error: e.message };
    }
  }
};
