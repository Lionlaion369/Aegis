import fs from "fs";
import Groq from "groq-sdk";

const groq = new Groq();
const systemPrompt = fs.readFileSync(
  "./athal_yahara/system.prompt.txt",
  "utf8"
);

export async function groqChat(userMessage) {
  return groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ]
  });
}
