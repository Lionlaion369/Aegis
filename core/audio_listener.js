const { exec } = require('child_process');

module.exports = {
  start() {
    console.log("🎧 AEGIS: Audição ativa.");

    setInterval(() => {
      exec(
        'termux-microphone-record -f /tmp/aegis_audio.wav -l 3',
        () => {
          console.log("🎙️ AEGIS: Som capturado.");
        }
      );
    }, 10000);
  }
};
