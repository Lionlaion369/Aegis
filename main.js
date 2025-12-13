// ================================
// AEGIS — MAIN ORQUESTRADOR SUPREMO
// Boot Seguro + Compatível
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

// ================================
// NÚCLEOS (todos protegidos)
// ================================
const sensoryCore     = safeRequire('./core/sensory_core');
const protocol        = safeRequire('./core/protocolo_unificado');
const registry        = safeRequire('./core/registry_sync');
const securityPolicy  = safeRequire('./core/security_policy');

// ⚠️ nome REAL no teu repo: system_shecker.js
const systemChecker   = safeRequire('./core/system_shecker');

// ================================
// VOZ (opcional / não quebra boot)
// ================================
const voice = safeRequire('./core/voice', {
  speak: (t) => console.log("🔊 VOZ:", t)
});

// ================================
// COMANDOS
// ================================
safeRequire('./commands/ATHAL_YAHARA');

// ================================
// BOOT PRINCIPAL
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
    protocol.init?.();

    voice.speak("Aegis inicializada. Guardiã em operação total.");

    console.log("✅ AEGIS ONLINE — MODO GUARDIÃ ATIVO.");

  } catch (err) {
    console.error("❌ FALHA CRÍTICA NO BOOT AEGIS:", err);
  }
})();
