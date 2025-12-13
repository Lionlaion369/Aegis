const { exec } = require('child_process');

function speak(text) {
  console.log("🗣️ AEGIS:", text);

  exec(`termux-tts-speak "${text}"`, err => {
    if (err) {
      // fallback silencioso
    }
  });
}

module.exports = { speak };
