const protocolo = require('../core/protocol_unificado');

module.exports = {

    invoke: function() {
        return {
            status: "ATIVADO",
            msg: protocolo.saudacaoIA(this.nomeIA)
        };
    },

    nomeIA: "Aegis" // na Willa você troca para "Willa Suprema IAG"
};
