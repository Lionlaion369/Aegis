// aegis_listener.js
const signer = require('./aegis_signer'); // helper local (vimos similar na Willa)
const executor = require('./aegis_executor');
const alerts = require('./aegis_alerts');
const fs = require('fs');
const LOG = 'logs/last_commands.log';

function _log(entry) {
  fs.appendFileSync(LOG, JSON.stringify(entry) + '\n');
}

module.exports = {
  receive: async function(reqBody, signature) {
    // signature verificator
    if (!signer.verify(reqBody, signature)) {
      _log({ time: Date.now(), status: 'signature_invalid' });
      throw new Error('Signature invalid');
    }

    const { command, payload, meta } = reqBody;
    _log({ time: new Date().toISOString(), command, meta });

    // decide to auto-run or ask for authorization
    if (command === 'CRITICAL_CHANGE') {
      // require authorization step (report back to Willa)
      const alert = await alerts.raiseAlert({ level: 'HIGH', reason: 'Critical change requested', meta });
      return { status: 'AWAITING_AUTH', alert };
    }

    // otherwise execute
    const result = await executor.run(command, payload);
    _log({ time: new Date().toISOString(), command, result });
    return { status: 'EXECUTED', result };
  }
};
