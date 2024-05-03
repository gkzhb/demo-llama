export type CharType = string | "User";

export interface ICharacterInfo {
  name: string;
  job: string;
  description: string;
  color: string;
}

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
