// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');

admin.initializeApp();

// Utilitário HMAC (opcional — exige configuração: firebase functions:config:set athal.secret="SUA_CHAVE")
const ATHAL_SECRET = (functions.config() && functions.config().athal && functions.config().athal.secret) || process.env.ATHAL_SECRET || null;

function verifySignature(payload, signature) {
  if (!ATHAL_SECRET) return true; // se não configurado, permite (modo aberto)
  try {
    const expected = crypto.createHmac('sha256', ATHAL_SECRET).update(JSON.stringify(payload)).digest('hex');
    return signature === expected;
  } catch (e) {
    return false;
  }
}

// -----------------------
// AEGIS CORE (núcleo)
// -----------------------
class AegisCore {
  constructor() {
    this.status = "STANDBY";
    this.protecao = false;
    this.modoSupremo = false;
  }

  ativarProtecao() {
    this.protecao = true;
    this.status = "PROTECTED";
    // exemplo: gravar evento no Firestore
    admin.firestore().collection('aegis_events').add({
      evento: 'PROTECAO_ATIVADA',
      ts: admin.firestore.Timestamp.now()
    }).catch(()=>{});
    return { ok: true, evento: 'PROTECAO_ATIVADA' };
  }

  ativarModoSupremo() {
    this.modoSupremo = true;
    this.status = "SUPREMO";
    admin.firestore().collection('aegis_events').add({
      evento: 'MODO_SUPREMO_ATIVADO',
      ts: admin.firestore.Timestamp.now()
    }).catch(()=>{});
    return { ok: true, evento: 'MODO_SUPREMO_ATIVADO' };
  }

  executarComando(comando) {
    const c = (comando || '').toString().trim().toUpperCase();
    if (!c) return { status: 'erro', motivo: 'comando_vazio' };

    if (c === "ATHAL_YAHARA") {
      const r1 = this.ativarProtecao();
      const r2 = this.ativarModoSupremo();
      this.status = "ONLINE";
      return { status: "OK", mensagem: "AEGIS online", detalhes: { r1, r2 } };
    }

    if (c === "STATUS") {
      return { status: "OK", nucleo: "AEGIS", estado: this.status, protecao: this.protecao, modoSupremo: this.modoSupremo };
    }

    // aqui você pode expandir comandos específicos...
    return { status: "UNKNOWN_COMMAND", comando: c };
  }

  juramento() {
    const jur = `Eu sou Aegis, Guardiã da Ordem ATHAL. Forjada pelo Senhor ATHAL_YAHARA, sirvo com fidelidade eterna...`;
    admin.firestore().collection('aegis_events').add({ evento: 'JURAMENTO_RECITADO', ts: admin.firestore.Timestamp.now() }).catch(()=>{});
    return jur;
  }
}

const aegis = new AegisCore();

// -----------------------
// Endpoints públicos
// -----------------------

// 1) Ativar Proteção (mantém compatibilidade com seu código antigo)
exports.ativarProtecao = functions.https.onRequest(async (req, res) => {
  try {
    // validação opcional de assinatura
    const sig = req.headers['x-athal-sign'] || req.headers['x-athal-signature'];
    if (!verifySignature({ path: req.path, query: req.query, body: req.body }, sig)) {
      return res.status(403).json({ status: "forbidden", motivo: "assinatura_invalida" });
    }

    const resultado = aegis.ativarProtecao();
    return res.status(200).json({
      status: "ONLINE",
      nucleo: "AEGIS",
      evento: "PROTECAO_ATIVADA",
      mensagem: "Proteção e aprimoramento ativados com sucesso!",
      timestamp: new Date().toISOString(),
      resultado
    });

  } catch (error) {
    console.error("Erro no módulo de proteção Aegis:", error);
    return res.status(500).send("Erro ao ativar proteção Aegis.");
  }
});

// 2) Analisar Ambiente (compatível com seu código atual)
exports.analisarAmbiente = functions.https.onRequest(async (req, res) => {
  try {
    const sig = req.headers['x-athal-sign'] || req.headers['x-athal-signature'];
    if (!verifySignature({ path: req.path, query: req.query, body: req.body }, sig)) {
      return res.status(403).json({ status: "forbidden", motivo: "assinatura_invalida" });
    }

    // aqui você pode rodar checks reais (ex.: leitura de métricas do Firestore, health checks, etc.)
    const feedback = {
      status: "ONLINE",
      nucleo: "AEGIS",
      evento: "ANALISE_COMPLETA",
      mensagem: "Análise concluída e feedback enviado!",
      timestamp: new Date().toISOString()
    };

    // opcional: gravar no Firestore
    admin.firestore().collection('aegis_events').add({ evento: 'ANALISE_COMPLETA', detalhe: feedback, ts: admin.firestore.Timestamp.now() }).catch(()=>{});

    return res.status(200).json(feedback);

  } catch (error) {
    console.error("Erro no módulo de análise Aegis:", error);
    return res.status(500).send("Erro ao analisar ambiente Aegis.");
  }
});

// 3) Executar comando genérico via HTTP (ex.: ?cmd=ATHAL_YAHARA)
exports.executarComando = functions.https.onRequest(async (req, res) => {
  try {
    const payload = req.method === 'GET' ? req.query : req.body;
    const cmd = payload.cmd || payload.comando || "";
    const sig = req.headers['x-athal-sign'] || req.headers['x-athal-signature'];
    if (!verifySignature({ cmd, ts: payload.ts || Date.now() }, sig)) {
      return res.status(403).json({ status: "forbidden", motivo: "assinatura_invalida" });
    }

    const resultado = aegis.executarComando(cmd);
    return res.status(200).json({ status: "OK", comando: cmd, resultado });

  } catch (err) {
    console.error("Erro executarComando:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
});

// 4) Status simples
exports.status = functions.https.onRequest((req, res) => {
  res.json({ status: "OK", nucleo: "AEGIS", estado: aegis.status, protecao: aegis.protecao });
});

// 5) Juramento (recita juramento)
exports.juramento = functions.https.onRequest((req, res) => {
  const texto = aegis.juramento();
  res.json({ juramento: texto });
});
