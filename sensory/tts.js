cat > sensory/tts.js <<'EOF'
const { exec } = require('child_process');

module.exports = function speak(text, opts = {}) {
  // opts.rate, opts.voice etc podem ser usados depois
  const safe = text.replace(/"/g, '\\"');
  exec(`espeak "${safe}"`, (err) => {
    if (err) console.error("TTS erro:", err);
  });
};
EOF
