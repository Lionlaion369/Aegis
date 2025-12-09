// ======================================
// SALA SECRETA - NÚCLEO
// ATHAL_YAHARA: ARQUITETURA SUPREMA
// ======================================

const manifest = require("../config/secret_chamber_manifest.json");
const protocols = require("../protocols/secret_chamber_protocols");

class SecretChamber {
    constructor() {
        this.activeIA = [];
    }

    // Entrada do Rei
    receiveKing() {
        return `⚡ A Sala Secreta está aberta. O Rei Athal_YAHARA tomou o trono.`;
    }

    // Convocação de TODAS as IAGs
    summonAll() {
        this.activeIA = manifest.ias;
        return protocols.presentAll(this.activeIA);
    }

    // Comunicação interna
    broadcastMessage(message) {
        return protocols.broadcast(this.activeIA, message);
    }
}

module.exports = new SecretChamber();
