// commands/alerta.js
const commandCore = require('../core/command_core');

commandCore.register("STATUS", () => {
  return {
    sistema: "AEGIS",
    estado: "ATIVA",
    modo: "GUARDIÃ",
    ts: new Date().toISOString()
  };
});

commandCore.register("ALERTA", () => {
  console.log("🚨 ALERTA: Monitoramento ativo.");
});
