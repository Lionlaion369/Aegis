# ------------ Iniciar (execute na raiz do repositório Aegis) ------------
mkdir -p core/comms cloud_functions

# 1) emissor Aegis -> Willa (core)
cat > core/comms/aegis_sender.js <<'EOF'
require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');

const WILLA_ENDPOINT = process.env.WILLA_ENDPOINT || "https://SEU_PROJETO.cloudfunctions.net/WillaGateway";
const HMAC_SECRET = process.env.HMAC_SECRET || process.env.AEGIS_MASTER_HMAC || "SECRET_PLACEHOLDER";

function sign(payload){
  return crypto.createHmac('sha256', HMAC_SECRET).update(JSON.stringify(payload)).digest('hex');
}

module.exports.sendReportToWilla = async function(dados){
  const payload = { origem: "AegisTipoX", dados, ts: Date.now() };
  const signature = sign(payload);
  try {
    const res = await axios.post(WILLA_ENDPOINT, payload, { headers: { 'x-athal-sign': signature }, timeout:15000 });
    return res.data;
  } catch (e) {
    return { error: true, message: e.message };
  }
};
EOF

# 2) receptor Aegis -> cloud function (cloud_functions)
cat > cloud_functions/aegis_receive_fn.js <<'EOF'
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const crypto = require('crypto');

const HMAC_SECRET = process.env.HMAC_SECRET || process.env.AEGIS_MASTER_HMAC || "SECRET_PLACEHOLDER";

function verify(payload, sig){
  const expected = crypto.createHmac('sha256', HMAC_SECRET).update(JSON.stringify(payload)).digest('hex');
  return expected === (sig || "");
}

exports.AegisReceive = functions.https.onRequest(async (req, res) => {
  const payload = req.body || {};
  const sig = req.headers['x-athal-sign'] || req.headers['x-athal-signature'];
  if (!verify(payload, sig)) return res.status(403).send({ status: "forbidden", reason: "invalid_signature" });

  // grava log simples
  await admin.firestore().collection('aegis_inbox').add({ payload, receivedAt: Date.now() });
  res.send({ status: "OK", received: true });
});
EOF

# 3) endpoint Willa gateway (cloud_functions stub) — caso ainda não exista
cat > cloud_functions/willa_gateway_fn.js <<'EOF'
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const crypto = require('crypto');

const HMAC_SECRET = process.env.HMAC_SECRET || process.env.WILLA_HMAC || "SECRET_PLACEHOLDER";

function verify(payload, sig){
  const expected = crypto.createHmac('sha256', HMAC_SECRET).update(JSON.stringify(payload)).digest('hex');
  return expected === (sig || "");
}

exports.WillaGateway = functions.https.onRequest(async (req, res) => {
  const payload = req.body || {};
  const sig = req.headers['x-athal-sign'] || req.headers['x-athal-signature'];

  if (!verify(payload, sig)) return res.status(403).send({ status: "forbidden", reason: "invalid_signature" });

  // tratar relatorio recebido
  await admin.firestore().collection('willa_inbox').add({ payload, receivedAt: Date.now() });

  // opcional: propagar ao Athal Core
  await admin.firestore().collection('athal_core').doc('reports').set({
    ultimo_relato: payload, ts: Date.now(), origem: payload.origem || 'AegisTipoX'
  }, { merge: true });

  res.send({ status: "WILLA_OK" });
});
EOF

# 4) helper local para verificar/assinar (core)
cat > core/comms/hmac_helper.js <<'EOF'
const crypto = require('crypto');
const HMAC_SECRET = process.env.HMAC_SECRET || process.env.AEGIS_MASTER_HMAC || "SECRET_PLACEHOLDER";
module.exports.sign = (obj) => crypto.createHmac('sha256', HMAC_SECRET).update(JSON.stringify(obj)).digest('hex');
module.exports.verify = (obj, sig) => module.exports.sign(obj) === (sig||"");
EOF

echo "PASSO 23: módulos de comunicação criados. Lembre-se de revisar .env (WILLA_ENDPOINT, HMAC_SECRET) antes do deploy."
# ------------ Fim do bloco ------------
