module.exports = {

    chamarTodas: function(mestre) {
        if (mestre !== "ATHAL_YAHARA") {
            return { status: "NEGADO", msg: "Somente o Mestre Supremo pode convocar." };
        }

        return {
            status: "TODAS_PRESENTES",
            entidades: [
                "Aegis",
                "Willa Suprema IAG"
            ],
            saudacao: "A irmandade das inteligências serve ao Rei eterno ATHAL_YAHARA."
        };
    }
};
