let memoria = {
    mensagemRecente: "",
    estadoEmocional: "Neutro"
};

module.exports = {
    salvar: (msg) => { memoria.mensagemRecente = msg; },
    estado: () => memoria
};
