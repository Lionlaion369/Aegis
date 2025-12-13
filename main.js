// ================================
// AEGIS SUPREMA — MAIN ORQUESTRADOR
// ================================

console.log("🛡️ AEGIS SUPREMA — Inicialização em andamento...");

// ===== Núcleos existentes =====
const sensoryCore = require('./core/sensory_core');
const protocol = require('./core/protocolo_unificado');
const registry = require('./core/registry_sync');
const securityPolicy = require('./core/security_policy');
const systemChecker = require('./core/system_shecker'); // nome real do arquivo
const aegisCore = require('./core/aegis_core');

// ===== Voz (fallback seguro) =====
let voice;
try {
  voice = require('./core/voice');
} catch {
  voice = { speak: (t) => console.log("🔊 VOZ:", t) };
}

// ===== Comandos =====
require('./commands/ATHAL_YAHARA');

// ================================
// BOOT SEQUENCIAL — ATHAL
// ================================
(async () => {
  try {
    console.log("⚙️ Verificando integridade do sistema...");
    systemChecker.check?.();

    console.log("🔐 Aplicando política de segurança...");
    securityPolicy.apply?.();

    console.log("📡 Sincronizando registros...");
    registry.sync?.();

    console.log("👁️ Ativando módulo sensorial...");
    sensoryCore.start?.();

    console.log("🧠 Iniciando protocolo unificado...");
    protocol.init?.();

    aegisCore.registrar("BOOT_COMPLETO");

    voice.speak("Aegis inicializada. Guardiã em operação total.");

    console.log("✅ AEGIS ONLINE — MODO GUARDIÃ ATIVO.");
  } catch (err) {
    console.error("❌ FALHA NO BOOT AEGIS:", err);
  }
})();
