// HMAC UNIVERSAL DA AEGIS TIPO X
require('dotenv').config();
const crypto = require('crypto');

const AEGIS_KEY = process.env.AEGIS_MASTER_KEY || "CHAVE_AEGIS_NAO_DEFINIDA";

module.exports = {
    gerarHMAC(dados) {
        return crypto
            .createHmac('sha256', AEGIS_KEY)
            .update(JSON.stringify(dados))
            .digest('hex');
    },

    validarHMAC(dados, hmacRecebida) {
        const hmacGerada = crypto
            .createHmac('sha256', AEGIS_KEY)
            .update(JSON.stringify(dados))
            .digest('hex');

        return hmacGerada === hmacRecebida;
    }
};
