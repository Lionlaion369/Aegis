const fs = require("fs");
const crypto = require("crypto");

module.exports = async function diagnosticoInterno() {
    const resultado = {
        status: "OK",
        logs: [],
        erros: []
    };

    resultado.logs.push("→ Verificando pastas essenciais...");

    const pastas = [
        "core",
        "commands",
        "sala_secreta",
        "registry",
        "security",
        "logs"
    ];

    pastas.forEach(p => {
        if (!fs.existsSync(p)) {
            resultado.erros.push(`FALTA A PASTA: ${p}`);
        }
    });

    resultado.logs.push("→ Verificando módulos internos...");

    try {
        require("./aegis_core");
        require("./multi_call");
        require("./aegis_presence");
        require("./protocol_mestre");
        resultado.logs.push("Todos os módulos carregados.");
    } catch (e) {
        resultado.erros.push("Erro ao carregar módulos internos: " + e.message);
    }

    return resultado;
};
