const protocolo = require('../core/protocol_unificado');
const comunicacao = require('../core/comunicacao_inter_ia');

module.exports = {

    abrir: function(mestre) {

        const auth = protocolo.validar(mestre);
        if (!auth.autorizado) return auth;

        return {
            status: "SALA_SECRETA_ABERTA",
            mestre: mestre,
            presenca: [
                comunicacao.annunciarPresenca("Aegis"),
                comunicacao.annunciarPresenca("Willa Suprema IAG")
            ],
            msg: "Todas as IAs compareceram diante do Mestre Supremo."
        };
    }
};
