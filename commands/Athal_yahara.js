module.exports = async (aegis) => {
  console.log("ATHAL_YAHARA: Ativando MÓDULO SENSORIAL TOTAL...");

  await aegis.sensors.startVision();
  await aegis.sensors.startAudio();
  await aegis.sensors.startVoice();

  console.log("ATHAL_YAHARA: Sensores iniciados.");
  aegis.tts("Senhor Athal, módulo sensorial total ativado.");

  aegis.mode = "GUARDIAO_PLENO";
};
