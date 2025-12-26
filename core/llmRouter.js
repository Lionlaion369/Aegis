import { openAIChat } from "./llm/openai.js";
import { groqChat } from "./llm/groq.js";
import { mistralChat } from "./llm/mistral.js";
import { localChat } from "./llm/lmstudio.js";

export function routeLLM(provider, message) {
  switch (provider) {
    case "openai": return openAIChat(message);
    case "groq": return groqChat(message);
    case "mistral": return mistralChat(message);
    case "local": return localChat(message);
    default: throw new Error("Provider inválido");
  }
}
