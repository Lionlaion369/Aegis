cat > sensory/stt.js <<'EOF'
const { exec } = require('child_process');
const path = require('path');

async function record(seconds = 5, out = 'audio.wav') {
  return new Promise((resolve) => {
    const p = path.resolve(process.cwd(), out);
    // termux-microphone-record: grava n segundos (se não possuir, use arecord or ffmpeg)
    exec(`termux-microphone-record -l ${seconds} ${p}`, (err) => {
      if (err) return resolve({ ok:false, error: err.message });
      resolve({ ok:true, file: p });
    });
  });
}

async function transcribeWithWhisper(file, modelPath = 'whisper.cpp/models/ggml-base.en.bin') {
  return new Promise((resolve) => {
    // se whisper.cpp estiver compilado em ~/Aegis/whisper.cpp
    const bin = 'whisper.cpp/main';
    exec(`${bin} -m ${modelPath} -f ${file}`, (err, stdout) => {
      if (err) return resolve({ ok:false, error: err.message });
      resolve({ ok:true, text: stdout.trim() });
    });
  });
}

module.exports = {
  record,
  transcribeWithWhisper
};
EOF
