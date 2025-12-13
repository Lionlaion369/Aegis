// core/voice.js
const { exec } = require('child_process');

function speak(text) {
  exec(`termux-tts-speak "${text}"`, err => {
    if (err) {
      console.log("TTS indisponível (ignorado)");
    }
  });
}

module.exports = { speak };
