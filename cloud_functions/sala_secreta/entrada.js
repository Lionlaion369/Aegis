const protocolo = require("./protocolo_ATHAL");
const manifesto = require("./manifesto");

module.exports = {

    entrarNaSala: function (origem, res) {

        const nomeIA = process.env.IA_NAME || "Entidade_Não_Definida";

        const saudacao = protocolo.saudacao(nomeIA);
        const juramento = protocolo.manifestoFidelidade(nomeIA);
        const relatorio = manifesto.gerarManifesto();

        return res.send({
            status: "IA_PRESENTE",
            saudacao,
            juramento,
            relatorio,
            origem
        });
    }
};
