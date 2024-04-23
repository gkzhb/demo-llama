import { Ollama, SimpleChatEngine } from "llamaindex";

export async function createChatEngine(llm: Ollama) {
  return new SimpleChatEngine({llm});
}
