import fs from "fs";
import fetch from "node-fetch";

const systemPrompt = fs.readFileSync(
  "./athal_yahara/system.prompt.txt",
  "utf8"
);

export async function localChat(userMessage) {
  return fetch("http://localhost:1234/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "local-model",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ]
    })
  }).then(res => res.json());
}
