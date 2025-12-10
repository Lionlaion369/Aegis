const autoRepair = require("./auto_repair");
const autoHeal = require("./auto_heal");

async function iniciarGuardiao() {
    console.log("[Aegis Guardião] Verificando integridade...");

    const problemas = autoRepair.verificarEstrutura();

    if (problemas.length > 0) {
        console.log("[Aegis Guardião] Problemas detectados:");
        problemas.forEach((p) => console.log(" - " + p));

        console.log("[Aegis Guardião] Executando AUTO-REPAIR...");
        await autoRepair.reparar();
    }

    console.log("[Aegis Guardião] Executando AUTO-HEAL...");
    autoHeal.reconstruirSeNecessario();

    console.log("[Aegis Guardião] Aegis protegida e íntegra.");
}

module.exports = iniciarGuardiao;

// Auto-execução imediata
iniciarGuardiao();
