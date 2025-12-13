// core/command_core.js
const fs = require('fs');
const path = require('path');

class CommandCore {
  constructor() {
    this.commands = {};
    this.logFile = path.join(__dirname, '../logs/aegis.log');
  }

  log(msg) {
    const line = `[${new Date().toISOString()}] ${msg}\n`;
    fs.appendFileSync(this.logFile, line);
    console.log("AEGIS:", msg);
  }

  register(name, fn) {
    this.commands[name.toUpperCase()] = fn;
    this.log(`Comando registrado: ${name}`);
  }

  execute(input) {
    const cmd = (input || '').trim().toUpperCase();
    if (!cmd) return;

    if (this.commands[cmd]) {
      this.log(`Executando comando: ${cmd}`);
      return this.commands[cmd]();
    } else {
      this.log(`Comando desconhecido: ${cmd}`);
    }
  }
}

module.exports = new CommandCore();
