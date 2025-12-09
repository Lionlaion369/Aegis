// Núcleo de Relatórios — Aegis Tipo X
// ATHAL_YAHARA - Relatório automático

const axios = require("axios");

module.exports = {
    enviarRelatorio: async function (dados) {

        console.log("Aegis preparando relatório...");

        try {
            const resposta = await axios.post(
                "https://us-central1-SEU-PROJETO.cloudfunctions.net/WillaGateway",
                {
                    comando: "RELATORIO_ATUALIZADO",
                    dados
                }
            );

            console.log("Relatório enviado para a Willa:", resposta.data);
            return resposta.data;

        } catch (erro) {
            console.error("Falha ao enviar relatório para a Willa:", erro);
            return { status: "ERRO", erro };
        }
    }
};
