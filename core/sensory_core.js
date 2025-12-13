// core/sensory_core.js
const stt = require('../sensorial/stt');
const tts = require('../sensorial/tts');
const visao = require('../sensorial/visao');

class SensoryCore {
  start() {
    console.log("👁️🦻🗣️ MÓDULO SENSORIAL ATIVADO");

    // Audição
    if (stt?.start) {
      stt.start((texto) => {
        console.log("🦻 OUVIDO:", texto);
      });
    }

    // Visão
    if (visao?.start) {
      visao.start((imagem) => {
        console.log("👁️ VISÃO: imagem capturada", imagem);
      });
    }

    // Voz inicial
    if (tts?.speak) {
      tts.speak("Sistema sensorial online. Vigilância ativa.");
    }
  }

  speak(texto) {
    tts?.speak?.(texto);
  }
}

module.exports = new SensoryCore();
