// ================================
// AEGIS — MAIN ORQUESTRADOR
// ================================

console.log("🛡️ AEGIS SUPREMA — Inicialização em andamento...");

// ===== Núcleo =====
const sensoryCore = require('./core/sensory_core');
const protocol = require('./core/protocolo_unificado');
const registry = require('./core/registry_sync');
const securityPolicy = require('./core/security_policy');
const systemChecker = require('./core/system_checker');

// ===== Voz (opcional / segura) =====
let voice;
try {
  voice = require('./core/voice');
} catch {
  voice = { speak: (t) => console.log("🔊 VOZ:", t) };
}

// ===== Comandos =====
require('./commands/ATHAL_YAHARA');

// ================================
// BOOT
// ================================

(async () => {
  console.log("⚙️ Verificando integridade do sistema...");
  systemChecker.check?.();

  console.log("🔐 Aplicando política de segurança...");
  securityPolicy.apply?.();

  console.log("📡 Sincronizando registros...");
  registry.sync?.();

  console.log("👁️ Ativando módulo sensorial...");
  sensoryCore.start?.();

  console.log("🧠 Protocolo unificado online.");
  protocol.init?.();

  voice.speak("Aegis inicializada. Guardiã em operação total.");

  console.log("✅ AEGIS ONLINE — MODO GUARDIÃ ATIVO.");
})();
const keywords = require('./core/keyword_detector');
const panel = require('./core/status_panel');
const ipc = require('./core/ipc_bridge');

const STATE = {
  estado: "ONLINE",
  protecao: true,
  modo: "GUARDIÃ"
};

// Atualiza painel a cada 5s
setInterval(() => {
  panel.show(STATE);
}, 5000);

// Entrada local (teclado)
process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
  keywords.check(data);
});

// Mensagens da Willa
setInterval(() => {
  ipc.listenFromWilla(msg => {
    console.log("📩 WILLA:", msg);
    keywords.check(msg);
  });
}, 3000);
