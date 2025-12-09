// registry_sync.js
const fs = require('fs');
const path = '../config/secret_chamber_manifest.json'; // ou outro manifest local
function getWillaEndpoint() {
  try {
    const m = JSON.parse(fs.readFileSync(path, 'utf8'));
    // procura um serviço Willa no manifesto (ajuste conforme o manifesto real)
    const willa = (m.ias || []).find(i => i.id && i.id.startsWith('WILLA'));
    if (willa && willa.endpoint) return willa.endpoint;
  } catch (e) {}
  // fallback (deve ser configurado por você)
  return process.env.WILLA_ENDPOINT || 'https://SEU_PROJETO_WILLA.cloudfunctions.net/WillaGateway';
}
module.exports = { getWillaEndpoint };
