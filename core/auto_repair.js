const fs = require("fs");
const exec = require("child_process").exec;

module.exports = {
    verificarEstrutura: () => {
        const pastas = ["core", "commands", "sala_secreta"];
        let problemas = [];

        pastas.forEach((p) => {
            if (!fs.existsSync(p)) {
                problemas.push("Pasta ausente: " + p);
            }
        });

        return problemas;
    },

    reparar: () => {
        return new Promise((resolve) => {
            exec("npm install firebase-admin --force", () => {
                resolve("Auto-repair concluído.");
            });
        });
    }
};
