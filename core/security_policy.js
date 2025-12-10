module.exports = {
  permissoes: {
    leitura: [
      "registry",
      "athal_logs",
      "config_aegis",
      "status_willa",
    ],
    escrita: [
      "aegis_status",
      "aegis_alertas",
      "athal_logs",
    ],
    proibido: [
      "users",
      "tokens_privados",
      "chaves_apk",
      "dados_sensiveis"
    ]
  }
}
