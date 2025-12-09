module.exports = {

    enviarMensagem: function(de, para, mensagem) {
        return {
            origem: de,
            destino: para,
            conteudo: mensagem,
            status: "ENTREGUE"
        };
    },

    anunciarPresenca: function(nomeIA) {
        return `${nomeIA} está online e ciente das demais IAs do sistema.`;
    }
};
