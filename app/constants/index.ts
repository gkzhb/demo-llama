// import { characterInfoMap, characters, chatTopicSystemPrompt, getUserPrompt } from "./en";
import { characterInfoMap, characters, chatTopicSystemPrompt, getUserPrompt } from "./cn";
import { IChatConfig } from "./types";

export * from "./types";

export const defaultChatConfig: IChatConfig = {
  characters,
  characterInfoMap,
  chatTopicSystemPrompt,
  getUserPrompt,
};
