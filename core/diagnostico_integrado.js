const diagnosticoInterno = require("./diagnostico_interno");
const diagnosticoExterno = require("./diagnostico_externo");

module.exports = async function diagnosticoIntegrado() {
    console.log("\n=== 🔥 DIAGNÓSTICO INTEGRADO AEGIS TIPO X ===");

    const interno = await diagnosticoInterno();
    const externo = await diagnosticoExterno();

    const tudoOK = interno.erros.length === 0 && externo.erros.length === 0;

    console.log("\n→ INTERNOS:");
    console.log(interno);

    console.log("\n→ EXTERNOS:");
    console.log(externo);

    console.log("\n→ RESULTADO FINAL:");
    console.log(tudoOK ? "Aegis 100% operacional." : "Falhas detectadas.");

    return {
        interno,
        externo,
        status: tudoOK ? "OK" : "ERROS"
    };
};
