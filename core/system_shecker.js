module.exports = {

    verificarSistema: () => ({
        status: "OK",
        integridade: "100%",
        recomendacao: "Operação normal.",
        alerta: false
    }),

    detectarErro: (erro) => ({
        status: "ERRO_DETECTADO",
        erro: erro,
        mensagem: "Aegis solicita autorização do Mestre para corrigir."
    })
};
