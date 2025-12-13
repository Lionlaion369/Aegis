const alerts = require('./alert_engine');

const KEYWORDS = [
  "aegis",
  "alerta",
  "status",
  "proteção",
  "athal"
];

module.exports = {
  check(text) {
    const t = (text || "").toLowerCase();
    for (const k of KEYWORDS) {
      if (t.includes(k)) {
        alerts.trigger(`PALAVRA_CHAVE:${k.toUpperCase()}`);
        return k;
      }
    }
    return null;
  }
};
