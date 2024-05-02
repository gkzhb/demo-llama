import { ECharacter, characterInfoMap, characters } from "./characters";

export * from "./characters";

export type CharType = ECharacter | "User";

export const chatTopicPrompt = `
Chinese Aircraft Carrier Fujian Leaves for First Set of Sea Trials. What will happen in the future?
${characters.map((char) => characterInfoMap[char].name).join(",")} will share their opinions and argue with each other.`;

export const getUserPrompt = (char: ECharacter) =>
  `Based on the conversation above, **${characterInfoMap[char].name}**, please share your opinions.`;
