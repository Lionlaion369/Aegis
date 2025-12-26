import fs from "fs";
import { MistralClient } from "@mistralai/mistralai";

const mistral = new MistralClient(process.env.MISTRAL_API_KEY);

const systemPrompt = fs.readFileSync(
  "./athal_yahara/system.prompt.txt",
  "utf8"
);

export async function mistralChat(userMessage) {
  return mistral.chat({
    model: "mistral-large-latest",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ]
  });
}
