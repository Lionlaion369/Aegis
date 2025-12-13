const fs = require('fs');

module.exports = {
  show(state) {
    console.clear();
    console.log("🛡️  AEGIS — PAINEL DE STATUS");
    console.log("──────────────────────────");
    console.log("Estado:      ", state.estado);
    console.log("Proteção:    ", state.protecao ? "ATIVA" : "INATIVA");
    console.log("Modo:        ", state.modo || "GUARDIÃ");
    console.log("Timestamp:   ", new Date().toISOString());
    console.log("──────────────────────────");
  }
};
