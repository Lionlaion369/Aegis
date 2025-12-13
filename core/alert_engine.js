module.exports = {
  trigger(event) {
    console.log("🚨 ALERTA AEGIS:", event);

    if (event === "SOM_DETECTADO") {
      console.log("👁️ AEGIS: Atenção ao ambiente.");
    }
  }
};
