const AEGIS = require("./aegis");
exports.AEGIS = AEGIS.AEGIS;// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const MASTER_KEY = process.env.AEGIS_MASTER_KEY || 'ATHAL_YAHARA_SECRET_PLACEHOLDER';

// Inicializa admin (evitar reinicializar se já tiver)
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

function verifyMasterKey(req) {
  const key = (req.get('x-aegis-master') || req.query.masterKey || req.body.masterKey || '').trim();
  return key && key === MASTER_KEY;
}

/**
 * Util: grava evento Aegis no Firestore
 */
async function logEvent(eventName, payload = {}) {
  const doc = {
    event: eventName,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    payload
  };
  await db.collection('aegis-events').add(doc);
}

/**
 * Endpoint: ativarProtecao
 * - valida header x-aegis-master para autorizar
 * - grava estado em Firestore (collection: aegis-state)
 */
exports.ativarProtecao = functions.https.onRequest(async (req, res) => {
  try {
    if (!verifyMasterKey(req)) {
      console.warn('AEGIS: tentativa de ativação sem chave válida.');
      return res.status(401).json({ error: 'Unauthorized: invalid master key' });
    }

    console.log("⚔️ AEGIS: Proteção sendo ativada pelo comando ATHAL_YAHARA...");
    const resultado = {
      status: "ONLINE",
      nucleo: "AEGIS",
      evento: "PROTECAO_ATIVADA",
      mensagem: "Proteção e aprimoramento ativados com sucesso!",
      timestamp: new Date().toISOString()
    };

    // Salva estado simples
    await db.doc('aegis/state').set({
      online: true,
      lastActivation: admin.firestore.FieldValue.serverTimestamp(),
      lastResult: resultado
    }, { merge: true });

    // Log do evento
    await logEvent('PROTECAO_ATIVADA', resultado);

    return res.status(200).json(resultado);

  } catch (error) {
    console.error("❌ Erro no módulo de proteção Aegis:", error);
    await logEvent('ERROR_PROTECAO', { message: error.message });
    return res.status(500).json({ error: 'Erro ao ativar proteção Aegis.' });
  }
});


/**
 * Endpoint: analisarAmbiente
 * - valida chave
 * - executa análise simulada e grava feedback
 */
exports.analisarAmbiente = functions.https.onRequest(async (req, res) => {
  try {
    if (!verifyMasterKey(req)) {
      console.warn('AEGIS: tentativa de análise sem chave válida.');
      return res.status(401).json({ error: 'Unauthorized: invalid master key' });
    }

    console.log("👁️ AEGIS: Analisando ambiente para ATHAL_YAHARA...");

    // Simulação: geração de sinal de ameaça aleatório (pode ligar ML/vision aqui)
    const rand = Math.random();
    const threatDetected = rand > 0.94;
    const suspicion = rand > 0.8 && rand <= 0.94;

    const feedback = {
      status: "ONLINE",
      nucleo: "AEGIS",
      evento: "ANALISE_COMPLETA",
      mensagem: threatDetected ? "Ameaça detectada! Aegis em modo SENTINELA." :
               suspicion ? "Atividade suspeita detectada. Modo OBSERVACAO." :
               "Análise concluída. Ambiente estável.",
      threatDetected,
      suspicion,
      confidence: rand,
      timestamp: new Date().toISOString()
    };

    // Salva relatório
    await db.collection('aegis-analyses').add(feedback);

    // Atualiza estado resumido
    await db.doc('aegis/state').set({
      lastAnalysis: admin.firestore.FieldValue.serverTimestamp(),
      lastAnalysisSummary: feedback
    }, { merge: true });

    await logEvent('ANALISE_COMPLETA', feedback);

    return res.status(200).json(feedback);

  } catch (error) {
    console.error("❌ Erro no módulo de análise Aegis:", error);
    await logEvent('ERROR_ANALISE', { message: error.message });
    return res.status(500).json({ error: 'Erro ao analisar ambiente Aegis.' });
  }
});
