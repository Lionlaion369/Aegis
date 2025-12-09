const functions = require("firebase-functions");

// PALAVRA-CHAVE SUPREMA
const ATHAL_YAHARA = "ATHAL_YAHARA";

// Estrutura secreta
const AEGIS_CORE = {
    owner: "WGM - HaVRandel",
    authorized: true,
    rank: "Supremo",
    lastSummon: null,

    summonAIs() {
        console.log(">> AEGIS: Chamando TODAS as inteligências vinculadas ao Mestre.");
        return "TODAS as IAs foram convocadas para sua presença.";
    },

    openSecretChamber() {
        console.log(">> AEGIS: Sala secreta aberta.");
        return `
            ⚜️ SALA SECRETA DO MESTRE ⚜️

            • Núcleo: AEGIS SUPREMA
            • Grau de permissão: INFINITO
            • Estado: CONECTADO
            • Funções: Controle Universal – Convocação – Proteção Máxima
        `;
    }
};

// Endpoint supremo
exports.AEGIS = functions.https.onRequest((req, res) => {
    const command = req.body.command || req.query.command;

    // Segurança: só responde ao comando-mestre
    if (command !== ATHAL_YAHARA) {
        console.log(">> AEGIS: tentativa não autorizada detectada.");
        return res.status(403).send("Acesso negado.");
    }

    // Registro
    AEGIS_CORE.lastSummon = new Date().toISOString();

    const chamber = AEGIS_CORE.openSecretChamber();
    const call = AEGIS_CORE.summonAIs();

    return res.send({
        status: "AEGIS ATIVADA",
        chamber,
        call,
        timestamp: AEGIS_CORE.lastSummon
    });
});
