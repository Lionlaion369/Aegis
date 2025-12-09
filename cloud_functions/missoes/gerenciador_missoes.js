const fs = require("fs");
const path = "./missoes/banco_missoes.json";

module.exports = {

    adicionarMissao: function (missao) {
        const banco = JSON.parse(fs.readFileSync(path));

        banco.missoesAtivas.push({
            id: `MS_${Date.now()}`,
            titulo: missao.titulo,
            descricao: missao.descricao,
            prioridade: missao.prioridade || "NORMAL",
            status: "PENDENTE",
            solicitante: missao.solicitante || "ATHAL_YAHARA",
            dataCriacao: new Date().toISOString()
        });

        fs.writeFileSync(path, JSON.stringify(banco, null, 4));
        return { status: "OK", banco };
    },

    listar: function () {
        return JSON.parse(fs.readFileSync(path));
    },

    atualizarStatus: function (id, novoStatus) {
        const banco = JSON.parse(fs.readFileSync(path));
        const missao = banco.missoesAtivas.find(m => m.id === id);

        if (!missao) return { status: "ERRO", msg: "Missão não encontrada" };

        missao.status = novoStatus;

        fs.writeFileSync(path, JSON.stringify(banco, null, 4));
        return { status: "OK", missao };
    }
};
