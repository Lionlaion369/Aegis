const personality = require('./aegis_personality');
const checker = require('./system_checker');
const memory = require('./memory');
const errorHandler = require('./error_handler');
const comandos = require('../commands/aegis_commands');

module.exports = {

    ativar: () => {
        return {
            status: "ONLINE",
            mensagem: personality.fraseEntrada(),
            memoria: memory.estado(),
            diagnostico: checker.verificarSistema()
        };
    },

    executarComando: (cmd) => {
        try {
            if (!comandos[cmd]) {
                return { erro: "Comando inexistente." };
            }
            return comandos[cmd].invoke();
        } catch (erro) {
            return errorHandler.tratar(erro);
        }
    },

    falar: (input) => personality.responder(input)
};
