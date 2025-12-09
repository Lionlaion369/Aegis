// Recebe ORDENS — ATHAL_YAHARA
const functions = require("firebase-functions");
const gerente = require("./missoes/gerenciador_missoes");

exports.AegisCommand = functions.https.onRequest((req, res) => {

    const comando = req.body.comando;

    if (comando === "NOVA_MISSAO") {

        const missao = req.body.missao;

        const resultado = gerente.adicionarMissao({
            titulo: missao.titulo,
            descricao: missao.descricao,
            prioridade: missao.prioridade,
            solicitante: "ATHAL_YAHARA"
        });

        return res.send({
            status: "MISSÃO_REGISTRADA",
            dados: resultado
        });
    }

    return res.send({ status: "ERRO", msg: "Comando inválido." });
});
