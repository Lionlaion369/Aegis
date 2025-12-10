const fs = require("fs");

module.exports = {
    arquivosEssenciais: [
        "core/aegis_core.js",
        "core/protocol_mestre.js",
        "commands/aegis_commands.js",
        "sala_secreta/sala_secreta.js"
    ],

    reconstruirSeNecessario() {
        this.arquivosEssenciais.forEach((arquivo) => {
            if (!fs.existsSync(arquivo)) {
                fs.writeFileSync(
                    arquivo,
                    "// RECONSTRUÍDO AUTOMATICAMENTE PELO AUTO-HEAL\n"
                );
            }
        });

        return "Auto-heal executado.";
    }
};
