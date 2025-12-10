const admin = require("firebase-admin");
const hmac = require("crypto");

async function registrarPresenca() {
    const assinatura = hmac.create("sha256")
        .update("AEGIS_ONLINE_" + Date.now())
        .update(process.env.AEGIS_MASTER_HMAC)
        .digest("hex");

    await admin.firestore()
        .collection("registry")
        .doc("aegis_tipo_x")
        .set({
            online: true,
            timestamp: Date.now(),
            assinatura
        });

    return true;
}

module.exports = { registrarPresenca };
