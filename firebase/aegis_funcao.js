const functions = require("firebase-functions");
const identity = require("../core/aegis_identity");
const chamber = require("../secret_chamber/chamber");

const ATHAL = "ATHAL_YAHARA";

exports.AEGIS = functions.https.onRequest((req, res) => {
    const command = req.body.command || req.query.command;

    if (command !== ATHAL)
        return res.status(403).send("Acesso negado.");

    return res.send({
        status: "AEGIS TIPO X ATIVADA",
        identity,
        chamber: chamber.open(),
        timestamp: new Date().toISOString()
    });
});
