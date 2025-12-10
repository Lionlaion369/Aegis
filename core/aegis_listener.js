const admin = require('firebase-admin');
const { gerarHMAC, validarHMAC } = require('./hmac_utils');

admin.initializeApp();

module.exports = async function listener(payload) {
    const hmacValido = validarHMAC(payload.data, payload.hmac);

    await admin.firestore().collection("aegis_logs").add({
        origem: payload.origem,
        data: payload.data,
        hmacRecebida: payload.hmac,
        hmacValida: hmacValido,
        timestamp: Date.now()
    });

    if (!hmacValido) {
        console.log("⚠️ HMAC inválido — transmissão pode ter sido adulterada.");
        return { status: "erro", motivo: "hmac_invalida" };
    }

    console.log("✔️ Aegis Listener recebeu pacote válido.");
    return { status: "ok" };
};
