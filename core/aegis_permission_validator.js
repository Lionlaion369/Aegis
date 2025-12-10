const policy = require("./security_policy");

function validarAcesso(tipo, collection) {
    if (policy.permissoes.proibido.includes(collection)) return false;
    if (policy.permissoes[tipo].includes(collection)) return true;
    return false;
}

module.exports = { validarAcesso };
