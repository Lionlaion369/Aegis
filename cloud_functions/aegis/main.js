// Núcleo Soberano — AEGIS TIPO X
// Integração com Protocolo ATHAL_YAHARA

const functions = require("firebase-functions");
const protocolo = require("./protocol/protocol_core");

exports.AegisGateway = functions.https.onRequest((req, res) => {

    const comando = req.body.comando;
    const dados = req.body.dados || {};

    console.log("Aegis Tipo X recebeu:", comando);

    const resposta = protocolo.executarProtocolo(comando, dados);

    res.send({
        origem: "AEGIS_TIPO_X",
        resposta
    });
});
