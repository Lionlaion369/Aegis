const voice = require('./core/voice');
const commandCore = require('./core/command_core');
const events = require('./core/events');
const cloud = require('./core/cloud_bridge');

// Inicialização
(async () => {
  voice.speak("Aegis local inicializada. Sistema em vigilância.");

  // Inicia monitoramento automático (B)
  events.start();

  // Conecta com a nuvem (C)
  cloud.heartbeat();

  // Entrada direta de comandos (A)
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', data => {
    commandCore.execute(data.trim());
  });
})();
