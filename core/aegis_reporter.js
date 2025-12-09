module.exports = {
    generateReport(status) {
        return {
            timestamp: new Date().toISOString(),
            status,
            message: "Relatório gerado e enviado à Willa Suprema."
        };
    }
};
