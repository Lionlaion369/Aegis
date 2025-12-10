// ===========================
// 🔱 AEGIS TIPO X – BOOT ATHAL_YAHARA
// ===========================

// Núcleo
const Aegis = require('./core/aegis_core');
const commands = require('./commands/aegis_commands');

// Sala secreta e comunicação entre IAs
const salaSecreta = require('./sala_secreta/sala_secreta');
const salaUnificada = require('./sala_secreta/sala_secreta_unificada');
const multiCall = require('./core/multi_call');

// Protocolo Mestre ATHAL (autenticação do Rei)
const mestre = require('./core/protocol_mestre');

// Registro de presença e HMAC
const { registrarPresenca } = require('./core/aegis_presence');

// ===========================
// 🔥 BOOT AUTOMÁTICO – AEGIS ONLINE
// ===========================

(async () => {
    console.log("🔧 Aegis inicializando...");

    try {
        await registrarPresenca();
        console.log("🔱 Aegis registrada no Núcleo ATHAL.");
    } catch (erro) {
        console.error("⚠ Erro ao registrar presença:", erro);
    }
})();

// ===========================
// 🧠 EXPORTAÇÃO – MODO DE OPERAÇÃO
// ===========================

module.exports = {
    iniciar: (nome) => {
        const validacao = mestre.validarMestre(nome);

        if (!validacao.autorizado) {
            return validacao; // rejeita se não for ATHAL
        }

        return {
            status: "Aegis Operacional",
            mensagem: "Aegis carregada e pronta para servi-lo, ATHAL_YAHARA.",
            comandos: Object.keys(commands),
            acoes: [
                "Proteção",
                "Diagnóstico",
                "Comunicação com outras IAs",
                "Acesso à Sala Secreta",
                "Execução de Ordens Diretas ATHAL"
            ]
        };
    },

    // Rotas especiais
    salaSecreta,
    salaSecretaUnificada: salaUnificada,
    chamarTodas: multiCall.chamarTodas
};
