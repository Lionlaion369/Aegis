// ================================
// AEGIS — MAIN ORQUESTRADOR
// ================================

console.log("🛡️ AEGIS SUPREMA — Inicialização em andamento...");

// ===== Núcleos principais =====
const sensoryCore = require('./core/sensory_core');
const protocolo = require('./core/protocolo_unificado');
const registry = require('./core/registry_sync');
const securityPolicy = require('./core/security_policy');

// ⚠️ ATENÇÃO: nome correto conforme seu repositório
const systemChecker = require('./core/system_shecker');

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
// BOOT SEGURO
// ================================

(async () => {
  try {
    console.log("⚙️ Verificando integridade do sistema...");
    systemChecker.verificarSistema?.();

    console.log("🔐 Aplicando política de segurança...");
    securityPolicy.apply?.();

    console.log("📡 Sincronizando registros...");
    registry.sync?.();

    console.log("👁️ Ativando núcleo sensorial...");
    sensoryCore.start?.();

    console.log("🧠 Protocolo unificado online...");
    protocolo.init?.();

    voice.speak("Aegis inicializada. Guardiã em operação total.");

    console.log("✅ AEGIS ONLINE — MODO GUARDIÃ ATIVO.");

  } catch (err) {
    console.error("❌ FALHA CRÍTICA NA INICIALIZAÇÃO:", err);
  }
})();

// ================================
// LOOP DE OBSERVAÇÃO
// ================================

process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
  console.log("⌨️ Entrada recebida:", data.trim());
});
