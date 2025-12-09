// aegis_signer.js
const crypto = require('crypto');
const SECRET = process.env.COMMAND_SECRET || 'coloque_a_mesma_chave_que_willa';

module.exports = {
  sign(payload) {
    const hmac = crypto.createHmac('sha256', SECRET);
    hmac.update(JSON.stringify(payload));
    return hmac.digest('hex');
  },

  verify(payload, signature) {
    const expected = this.sign(payload);
    return expected === signature;
  }
};
