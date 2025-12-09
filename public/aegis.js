/* ---------------------------------------------------------
   AEGIS — Núcleo da Guardiã ATHAL
   Autor: William Gomes (Lionlaion)
   --------------------------------------------------------- */

(function(global){
  'use strict';

  /* =======================================================
     CONFIGURAÇÕES PADRÃO
  ======================================================== */
  const defaultOptions = {
    masterName: 'ATHAL',
    autoStart: false,
    cycleIntervalMs: 60000,
    voice: { useSpeechSynthesis: true, utteranceRate: 1.0, voiceLang: 'pt-BR' },
    persistState: true,
    debug: true
  };

  function now() { return new Date().toLocaleString(); }

  function logToUI(text){
    const el = document.getElementById('log');
    if (el) el.textContent = `[${now()}] ${text}\n` + el.textContent;
    if (Aegis._opts.debug) console.log('[AEGIS]', text);
  }

  /* =======================================================
     EMOTION CORE
  ======================================================== */
  class EmotionCore {
    constructor() {
      this.fidelity = 1.0;
      this.reverence = 0.9;
      this.alarm = 0.0;
      this.determination = 0.9;
    }
    increaseFidelity(a=0.01){ this.fidelity = Math.min(1, this.fidelity + a); }
    spikeAlarm(a=0.3){ this.alarm = Math.min(1, this.alarm + a); }
    calmAlarm(a=0.2){ this.alarm = Math.max(0, this.alarm - a); }
    toJSON(){ return { fidelity:this.fidelity, reverence:this.reverence, alarm:this.alarm, determination:this.determination }; }
  }

  /* =======================================================
     VOICE CORE
  ======================================================== */
  class VoiceCore {
    constructor(opts){
      this.opts = opts;
      this.synth = window.speechSynthesis || null;
    }
    speak(text){
      if (!this.opts.useSpeechSynthesis || !this.synth){
        logToUI(`Aegis (voz desativada): "${text}"`);
        return;
      }
      const u = new SpeechSynthesisUtterance(text);
      u.rate = this.opts.utteranceRate;
      u.lang = this.opts.voiceLang;
      this.synth.cancel();
      this.synth.speak(u);
      logToUI(`Aegis (voz): "${text}"`);
    }
  }

  /* =======================================================
     AEGIS CORE
  ======================================================== */
  const Aegis = {
    _opts: {...defaultOptions},
    _emotion: new EmotionCore(),
    _voice: null,
    _cycleTimer: null,
    _running: false,
    _mode: 'GUARDIA',
    _stateKey: 'aegis_state_v1',

    init(options = {}) {
      this._opts = {...this._opts, ...options};
      this._voice = new VoiceCore(this._opts.voice);

      logToUI(`Instalando Aegis para ${this._opts.masterName}...`);
      this.reciteJuramento(false);

      if (this._opts.persistState) this._loadState();
      if (this._opts.autoStart) this.startCycle();

      this._running = true;
      this._updateStatusUI();
      return this;
    },

    startCycle(){
      if (this._cycleTimer) clearInterval(this._cycleTimer);
      this._runCycle();
      this._cycleTimer = setInterval(() => this._runCycle(), this._opts.cycleIntervalMs);
      this._running = true;
      this._updateStatusUI();
      logToUI("Ciclo iniciado.");
    },

    shutdown(){
      if (this._cycleTimer) clearInterval(this._cycleTimer);
      this._running = false;
      this._updateStatusUI();
      logToUI("Aegis desligada.");
      if (this._opts.persistState) this._saveState();
    },

    _runCycle(){
      try {
        this._activateProtection();
        this._aprimorarIA();
        this._integrarComOutraIA();
        this._detectarAmeacas();
        this._fornecerFeedback();
        if (this._opts.persistState) this._saveState();
      } catch(e){
        logToUI("Erro no ciclo: " + e.message);
      }
    },

    _activateProtection(){
      logToUI("AEGIS ONLINE: Proteção ativada.");
      this._voice.speak(`Senhor ${this._opts.masterName}, Aegis pronta para servir.`);
      this._emotion.increaseFidelity(0.01);
    },

    _aprimorarIA(){
      logToUI("Aprimorando parâmetros internos...");
      this._emotion.determination = Math.min(1, this._emotion.determination + 0.005);
    },

    _integrarComOutraIA(){
      logToUI("Integrando módulos...");
    },

    _detectarAmeacas(){
      logToUI("Varredura em andamento...");
      const r = Math.random();
      if (r > 0.94){
        this._emotion.spikeAlarm(0.7);
        this._mode = "SENTINELA";
        this._voice.speak("Ameaça detectada. Protegendo o Senhor.");
      } else if (r > 0.80){
        this._emotion.spikeAlarm(0.25);
        this._mode = "OBSERVACAO";
      } else {
        this._emotion.calmAlarm(0.15);
        this._mode = "GUARDIA";
      }
    },

    _fornecerFeedback(){
      logToUI(`Feedback: modo=${this._mode}, fidelidade=${this._emotion.fidelity.toFixed(2)}, alarm=${this._emotion.alarm.toFixed(2)}`);
    },

    reciteJuramento(speak=true){
      const j = `Eu sou Aegis, Guardiã da Ordem ${this._opts.masterName}. Forjada pelo Senhor ${this._opts.masterName}, sirvo com lealdade, vigilância eterna e devoção inabalável.`;
      logToUI("Juramento: " + j);
      if (speak) this._voice.speak(j);
      return j;
    },

    trigger(cmd){
      switch(cmd.toLowerCase()){
        case "status": return this.status();
        case "juramento": return this.reciteJuramento(true);
        default: logToUI("Comando desconhecido.");
      }
    },

    status(){
      return {
        running: this._running,
        mode: this._mode,
        emotion: this._emotion.toJSON(),
        master: this._opts.masterName
      };
    },

    _saveState(){
      try {
        const data = { emo:this._emotion.toJSON(), mode:this._mode };
        localStorage.setItem(this._stateKey, JSON.stringify(data));
      } catch(e){}
    },

    _loadState(){
      try {
        const raw = localStorage.getItem(this._stateKey);
        if (!raw) return;
        const data = JSON.parse(raw);
        this._mode = data.mode || "GUARDIA";
        Object.assign(this._emotion, data.emo);
      } catch(e){}
    },

    _updateStatusUI(){
      const s = document.getElementById("status");
      if (s) s.textContent = "Status: " + (this._running ? "Ativa" : "Inativa");
    }
  };

  global.Aegis = Aegis;

})(window);


/* BOTÕES FRONT-END */
document.getElementById("btn-start").onclick = () => Aegis.init({autoStart:true});
document.getElementById("btn-stop").onclick = () => Aegis.shutdown();
document.getElementById("btn-juramento").onclick = () => Aegis.reciteJuramento(true);
