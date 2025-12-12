cat > sensory/vision.js <<'EOF'
const { exec } = require('child_process');
const path = require('path');

module.exports = function capture(filename = 'vision.jpg') {
  return new Promise((resolve) => {
    const out = path.resolve(process.cwd(), filename);
    exec(`termux-camera-photo -c 0 ${out}`, (err) => {
      if (err) return resolve({ ok:false, error: err.message });
      resolve({ ok:true, file: out });
    });
  });
};
EOF
