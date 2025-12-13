module.exports = {

  verificarSistema: () => {
    return {
      status: "OK",
      integridade: "100%",
      recomendacao: "Operação normal.",
      alerta: false
    };
  },

  detectarErro: (erro) => {
    return {
      status: "ERRO_DETECTADO",
      erro,
      mensagem: "AEGIS solicita autorização do Mestre para correção."
    };
  }

};
