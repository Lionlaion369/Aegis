7const fs = require('fs');

const CHANNEL = '/tmp/aegis_willa_channel.json';

module.exports = {
  sendToWilla(msg) {
    fs.writeFileSync(CHANNEL, JSON.stringify({
      from: "AEGIS",
      msg,
      ts: Date.now()
    }));
  },

  listenFromWilla(cb) {
    if (!fs.existsSync(CHANNEL)) return;

    const data = JSON.parse(fs.readFileSync(CHANNEL));
    if (data.from === "WILLA") cb(data.msg);
  }
};
module.exports.listenFromWilla = function(cb) {
  const fs = require('fs');
  const CHANNEL = '/tmp/aegis_willa_channel.json';

  if (!fs.existsSync(CHANNEL)) return;

  try {
    const data = JSON.parse(fs.readFileSync(CHANNEL));
    if (data.from === "WILLA" && data.msg) {
      cb(data.msg);
      fs.unlinkSync(CHANNEL); // evita loop
    }
  } catch {}
};
