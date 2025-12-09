// Agendador interno da Aegis Tipo X
// Envia relatório automático a cada ciclo

const functions = require("firebase-functions");
const relatorio = require("./relatorio_core");
const tarefas = require("./tarefas_monitoradas");

exports.relatorioAutomatico = functions.pubsub.schedule("every 10 minutes").onRun(async () => {

    const lista = tarefas.listarTarefas();

    const dados = {
        horario: new Date().toISOString(),
        tarefasMonitoradas: lista,
        status: "Aegis ativa e executando vigília contínua."
    };

    return await relatorio.enviarRelatorio(dados);
});
