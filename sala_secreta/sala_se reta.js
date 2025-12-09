module.exports = {
    acessar: (mestre) => {
        if (mestre !== "ATHAL_YAHARA") {
            return { status: "NEGADO", msg: "Somente o Mestre Supremo pode entrar." };
        }

        return {
            status: "PERMITIDO",
            msg: "Aegis presente na Sala Secreta.",
            entidades: ["Aegis", "Willa Suprema IAG"]
        };
    }
};
