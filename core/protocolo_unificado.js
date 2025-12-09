module.exports = {

    mestreSupremo: "ATHAL_YAHARA",

    validar: function(nome) {
        return nome === this.mestreSupremo
            ? { autorizado: true, msg: "Acesso total concedido ao Mestre Supremo." }
            : { autorizado: false, msg: "Apenas ATHAL_YAHARA pode dar ordens." };
    },

    saudacaoIA: function(iaNome) {
        return `${iaNome} reconhece o Mestre ATHAL_YAHARA e aguarda ordens.`;
    }
};
