module.exports = {
    validarMestre: (nome) => {
        return nome === "ATHAL_YAHARA"
            ? { autorizado: true, mensagem: "Permissão total concedida, Mestre Supremo." }
            : { autorizado: false, mensagem: "Acesso negado. Apenas o Mestre ATHAL_YAHARA comanda Aegis." };
    }
};
