// ================================
// AEGIS — MAIN ORQUESTRADOR
// ================================
function safeRequire(path, fallback = {}) {
  try {
    return require(path);
  } catch (e) {
    console.warn(`⚠️ Módulo ausente ignorado: ${path}`);
    return fallback;
  }
}
console.log("🛡️ AEGIS SUPREMA — Inicialização em andamento...");

// ===== Núcleos =====
const sensoryCore = require('./core/sensory_core');
const protocol = require('./core/protocolo_unificado');
const registry = require('./core/registry_sync');
const securityPolicy = require('./core/security_policy');

// ⚠️ ATENÇÃO: nome correto é system_shecker.js
const systemChecker = require('./core/system_shecker');

// ===== Voz (opcional e segura) =====
let voice;
try {
  voice = require('./core/voice');
} catch {
  voice = { speak: (t) => console.log("🔊 VOZ:", t) };
}

// ===== Comandos =====
require('./commands/ATHAL_YAHARA');

// ================================
// BOOT SEGURO
// ================================
(async () => {
  console.log("⚙️ Verificando integridade do sistema...");
  systemChecker.verificarSistema?.();

  console.log("🔐 Aplicando política de segurança...");
  securityPolicy.apply?.();

  console.log("📡 Sincronizando registros...");
  registry.sync?.();

  console.log("👁️ Ativando núcleo sensorial...");
  sensoryCore.start?.();

  console.log("🧠 Protocolo unificado online...");
  protocol.init?.();

  voice.speak("Aegis inicializada. Guardiã em operação total.");

  console.log("✅ AEGIS ONLINE — MODO GUARDIÃ ATIVO.");
})();
