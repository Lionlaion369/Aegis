const Aegis = require('./core/aegis_core');
const commands = require('./commands/aegis_commands');
const salaSecreta = require('./sala_secreta/sala_secreta');
const mestre = require('./core/protocol_mestre');

module.exports = {
    iniciar: (nome) => {
        const validacao = mestre.validarMestre(nome);

        if (!validacao.autorizado) {
            return validacao;
        }

        return {
            status: "Aegis Operacional",
            mensagem: "Aegis carregada e pronta para servi-lo, ATHAL_YAHARA.",
            comandos: Object.keys(commands),
            acoes: [
                "Proteção",
                "Diagnóstico",
                "Comunicação com outras IAs",
                "Acesso à Sala Secreta"
            ]
        };
    }
};
const salaUnificada = require('./sala_secreta/sala_secreta_unificada');
const multiCall = require('./core/multi_call');

module.exports.salaSecretaUnificada = salaUnificada;
module.exports.chamarTodas = multiCall.chamarTodas;
