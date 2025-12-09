const functions = require("firebase-functions");
const gerente = require("./gerenciador_missoes");
const relatorio = require("../relatorios/relatorio_core");

exports.executarMissoes = functions.pubsub.schedule("every 5 minutes").onRun(async () => {

    const banco = gerente.listar();
    const pendentes = banco.missoesAtivas.filter(m => m.status === "PENDENTE");

    if (pendentes.length === 0) {
        console.log("Aegis: Nenhuma missão pendente.");
        return null;
    }

    for (let m of pendentes) {

        console.log("Aegis iniciando missão:", m.titulo);
        gerente.atualizarStatus(m.id, "EXECUTANDO");

        // Aqui Aegis executaria a missão real (código real depois)
        await new Promise(r => setTimeout(r, 2000));

        gerente.atualizarStatus(m.id, "CONCLUÍDA");

        await relatorio.enviarRelatorio({
            titulo: "Missão concluída",
            id: m.id,
            descricao: m.descricao,
            horario: new Date().toISOString()
        });
    }

    return true;
});
