require("dotenv").config();
const admin = require("firebase-admin");

// Inicializa Firebase
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN)),
});

const db = admin.firestore();

// Núcleo ATHAL — orquestrador seguro
async function athalCoreProcess(comando, origem) {
    const permitido = await validarPermissao(origem, comando);

    if (!permitido) {
        return {
            status: "NEGADO",
            motivo: "Comando não autorizado pelo Núcleo ATHAL."
        };
    }

    // Log geral ATHAL
    await db.collection("athal_logs").add({
        origem,
        comando,
        timestamp: Date.now()
    });

    return {
        status: "APROVADO",
        comandoExecutado: comando
    };
}

// Validação de comando
async function validarPermissao(origem, comando) {
    const doc = await db.collection("athal_permissoes").doc(origem).get();

    if (!doc.exists) return false;

    const dados = doc.data();

    return dados.comandosPermitidos.includes(comando);
}

module.exports = { athalCoreProcess };
