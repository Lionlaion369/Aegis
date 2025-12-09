// aegis-local.js
const fs = require('fs');
const { exec } = require('child_process');
const STATE_FILE = './aegis_local_state.json';

function nowISO(){ return new Date().toISOString(); }
function loadState(){
  try{ return JSON.parse(fs.readFileSync(STATE_FILE,'utf8')); }catch(e){ return { emotion:{ fidelity:0.9, alarm:0 }, mode:'GUARDIA', last: null }; }
}
function saveState(state){ fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2)); }

function tts(text){
  // usa espeak (Termux) — instale: pkg install espeak
  exec(`espeak "${text.replace(/"/g,"'")}"`, (err) => { if (err) console.error('TTS erro:', err); });
}

async function ativarProtecao(){
  const state = loadState();
  state.last = { event: 'PROTECAO_ATIVADA', ts: nowISO() };
  state.mode = 'GUARDIA';
  state.emotion.fidelity = Math.min(1, (state.emotion.fidelity || 0.9) + 0.02);
  saveState(state);
  console.log('AEGIS LOCAL: Proteção ativada.');
  tts('Senhor ATHAL, Aegis pronta para servir.');
}

async function analisarAmbiente(){
  const state = loadState();
  const r = Math.random();
  if (r > 0.94){ state.emotion.alarm = Math.min(1, (state.emotion.alarm || 0) + 0.7); state.mode='SENTINELA'; }
  else if (r > 0.8){ state.emotion.alarm = Math.min(1, (state.emotion.alarm || 0) + 0.25); state.mode='OBSERVACAO'; }
  else { state.emotion.alarm = Math.max(0, (state.emotion.alarm || 0) - 0.15); state.mode='GUARDIA'; }
  state.lastAnalysis = { ts: nowISO(), r, mode: state.mode, alarm: state.emotion.alarm };
  saveState(state);
  console.log('AEGIS LOCAL: Análise completa:', state.lastAnalysis);
  if (state.emotion.alarm > 0.6) tts('Alerta elevado. Solicitando instruções, Senhor.');
  else if (state.emotion.alarm > 0.2) tts('Sinais suspeitos detectados. Mantendo vigilância.');
}

async function cycle(intervalMs = 60000){
  console.log('AEGIS LOCAL: Iniciando ciclo automático — intervalo ms:', intervalMs);
  await ativarProtecao();
  setInterval(async () => {
    await analisarAmbiente();
    // opcional: chamar endpoints remotos aqui (fetch/axios) para sincronizar com Firebase
  }, intervalMs);
}

// Se executado diretamente
if (require.main === module){
  const ms = parseInt(process.argv[2] || '60000',10);
  cycle(ms).catch(console.error);
}

module.exports = { ativarProtecao, analisarAmbiente, cycle };
