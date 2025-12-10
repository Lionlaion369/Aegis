const admin = require('firebase-admin');
const { gerarHMAC } = require('./hmac_utils');

admin.initializeApp();

module.exports = async function registrarAegis() {
    const data = {
        id: "AEGIS_TIPO_X",
        status: "ativa",
        ultima_sync: Date.now()
    };

    const hmac = gerarHMAC(data);

    await admin.firestore().collection("registry").doc("aegis_tipo_x").set({
        ...data,
        hmac
    });

    console.log("✔️ Registro da AEGIS atualizado.");
};
