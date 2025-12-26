import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI();

const systemPrompt = fs.readFileSync(
  "./athal_yahara/system.prompt.txt",
  "utf8"
);

export async function openAIChat(userMessage) {
  return client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ]
  });
}
