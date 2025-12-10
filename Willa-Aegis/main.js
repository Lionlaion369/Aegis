cat > main.js << 'EOF'
/**
 * Aegis Tipo X — Núcleo de Inicialização
 * Todos os sistemas são ativados automaticamente ao iniciar.
 */

require("dotenv").config();
const admin = require("firebase-admin");

// Inicialização Firebase
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});
console.log("🔥 Aegis Tipo X — Firebase carregado.");

// Sistema de idioma fixo
console.log("🌍 Idioma definido: Português do Brasil (pt-BR).");

// Carregar módulos principais
const iniciarATHALListener = require("./core/athal/athal_bus_listener");
const registrarPresenca = require("./core/registry_sync");
const iniciarSalaSecreta = require("./core/aegis_listener");
const executarComando = require("./core/aegis_executor");
const assinar = require("./core/aegis_signer");

console.log("🔧 Carregando sistemas internos...");

// Ativar Listener ATHAL_YAHARA universal
iniciarATHALListener();
console.log("⚡ ATHAL_YAHARA Bus Listener ativado.");

// Ativar Listener da Sala Secreta
iniciarSalaSecreta();
console.log("🚪 Listener da Sala Secreta ativado.");

// Registrar presença no Firestore com HMAC
registrarPresenca("AegisTipoX");
console.log("📡 Registro de presença enviado.");

// Teste rápido do Executor
executarComando("BOOT_COMPLETO");
console.log("🧠 Executor operacional.");

// Assinatura de integridade
const assinatura = assinar("AegisTipoX");
console.log("🔏 Assinatura de integridade:", assinatura);

console.log("✅ Aegis Tipo X totalmente ativada.");
EOF

echo "PASSO 15 concluído: main.js criado e Aegis agora inicializa todos os módulos."
