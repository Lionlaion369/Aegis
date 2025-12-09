module.exports = {
    shield() {
        return "Escudo de proteção Aegis ativado.";
    },

    verifyIntegrity() {
        return "Integridade dos sistemas confirmada. Nenhuma ameaça detectada.";
    },

    block(source) {
        return `Fonte não autorizada bloqueada: ${source}`;
    }
};
