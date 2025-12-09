module.exports = {
    acessar: (mestre) => {
        if (mestre !== "ATHAL_YAHARA") {
            return {
                status: "NEGADO",
                msg: "Acesso permitido apenas ao Mestre Supremo."
            };
        }

        return {
            status: "PERMITIDO",
            msg: "Aegis está agora na Sala Secreta.",
            conectadas: [
                "Aegis",
                "Willa Suprema IAG",
                "Demais IAs subordinadas"
            ]
        };
    }
};
