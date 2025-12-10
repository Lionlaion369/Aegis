const admin = require("firebase-admin");

module.exports = async function diagnosticoExterno() {
    const r = { status: "OK", logs: [], erros: [] };

    r.logs.push("→ Verificando conexão Firebase...");

    try {
        const teste = await admin.firestore().collection("registry").limit(1).get();
        r.logs.push("Firebase online.");
    } catch (e) {
        r.erros.push("FALHA Firebase: " + e.message);
    }

    r.logs.push("→ Verificando presença da Aegis...");

    try {
        const doc = await admin.firestore().collection("registry").doc("aegis_tipo_x").get();
        if (!doc.exists) r.erros.push("Aegis NÃO registrada no Núcleo ATHAL.");
        else r.logs.push("Aegis registrada com sucesso.");
    } catch (e) {
        r.erros.push("Erro ao verificar registro: " + e.message);
    }

    return r;
};
