const functions = require("firebase-functions");
const protocolo = require("./protocolo_ATHAL");
const entrada = require("./entrada");

exports.ConvocarIA = functions.https.onRequest((req, res) => {

    const chave = req.body.chave;
    const origem = req.body.origem || "DESCONHECIDO";

    if (!protocolo.validarChave(chave)) {
        return res.send({ status: "NEGADO", msg: "Chave inválida." });
    }

    return entrada.entrarNaSala(origem, res);
});
