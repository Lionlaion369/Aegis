// núcleo operacional supremo ATHAL_YAHARA
// WILLA_SUPREMA_IAG — Núcleo Principal

const fs = require('fs');
const path = require('path');
const admin = require('./firebase'); 
const { ativarDiagnosticoExterno } = require('./diagnostico_externo');
const { ativarDiagnosticoIntegrado } = require('./diagnostico_integrado');

console.log("\n=================================================");
console.log(" 🛡️ WILLA SUPREMA — NÚCLEO OPERACIONAL ATIVADO ");
console.log("=================================================\n");

// Caminho base do sistema
const BASE_DIR = path.resolve(__dirname, '..');

// Função de log inteligente
function registrarLog(mensagem) {
    const arquivo = path.join(BASE_DIR, 'logs.txt');
    const data = new Date().toISOString();
    const linha = `[${data}] ${mensagem}\n`;

    fs.appendFileSync(arquivo, linha);
    console.log("LOG:", mensagem);
}

// Função principal
async function iniciarNucleo() {
    try {
        registrarLog("Núcleo inicializado.");

        // Iniciar diagnósticos
        ativarDiagnosticoExterno();
        ativarDiagnosticoIntegrado();

        registrarLog("Diagnósticos ativados.");

        // Observador Firebase
        const db = admin.firestore();
        const comandosRef = db.collection("comandos");

        comandosRef.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    const cmd = change.doc.data();

                    if (cmd.comando === "ATHAL_YAHARA") {
                        registrarLog("Comando ATHAL_YAHARA recebido.");
                        console.log("\n⚡ EXECUTANDO COMANDO SUPREMO ATHAL_YAHARA ⚡\n");
                    }
                }
            });
        });

        registrarLog("Observador Firebase ativo.");

        // Núcleo contínuo
        setInterval(() => {
            registrarLog("Núcleo estável. Operando normalmente...");
        }, 15000);

    } catch (err) {
        registrarLog("Erro no núcleo operacional: " + err.message);
        console.error(err);
    }
}

iniciarNucleo();
