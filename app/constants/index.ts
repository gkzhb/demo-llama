import { ICharacterInfo, characterInfoMap, characters } from "./characters";

export * from "./characters";

export type CharType = string | "User";

export const chatTopicSystemPrompt = `
Chinese Aircraft Carrier Fujian Leaves for First Set of Sea Trials. What will happen in the future?  
${characters.map((char) => characterInfoMap[char].name).join(",")} will share their opinions and argue with each other.`;

export const getUserPrompt = (
  char: string,
  characterInfoMap: Record<string, ICharacterInfo>,
) =>
  `Based on the conversation above, **${characterInfoMap[char]?.name ?? char}**, please share your opinions.`;

export interface IChatConfig {
  model?: string;
  characters: string[];
  characterInfoMap: Record<string, ICharacterInfo>;
  chatTopicSystemPrompt: string;
  getUserPrompt: (
    char: string,
    characterInfoMap: Record<string, ICharacterInfo>,
  ) => string;
}
export const defaultChatConfig: IChatConfig = {
  characters,
  characterInfoMap,
  chatTopicSystemPrompt,
  getUserPrompt,
};
