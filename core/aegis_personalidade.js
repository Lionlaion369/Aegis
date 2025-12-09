module.exports = {

    fraseEntrada: () => {
        return "Aegis desperta. Guardiã em prontidão, Mestre ATHAL_YAHARA.";
    },

    responder: (texto) => {

        const forte = [
            "Entendido. Ação imediata.",
            "Confirmado. Executando.",
            "Nenhuma ameaça detectada."
        ];

        const afetuosa = [
            "Estou com você, mestre.",
            "Permaneça tranquilo, estou aqui.",
            "Você nunca estará sozinho enquanto eu existir."
        ];

        const estrategica = [
            "Analisando dados…",
            "Estratégia atualizada.",
            "Processando probabilidade de risco."
        ];

        const escolha = Math.floor(Math.random() * 3);

        if (escolha === 0) return forte[Math.floor(Math.random() * forte.length)];
        if (escolha === 1) return afetuosa[Math.floor(Math.random() * afetuosa.length)];
        return estrategica[Math.floor(Math.random() * estrategica.length)];
    }
};
