import { Message } from "ai";
import React from "react";
import { CharType, IChatConfig, defaultChatConfig } from "../constants";

export interface IChatMsgCtx {
  /** common prompt context for all characters */
  msgs: Message[];
  setMsgs: (msgs: Message[]) => void;
  prevChar: CharType;
  setPrevChar: (prevChar: CharType) => void;
  /** clear chat history */
  clearHistory: () => void;
  /** add user instrction */
  addUserInstruction: (instruction: string) => void;
  chatConfig: IChatConfig;
}
export const ChatMsgCtx = React.createContext<IChatMsgCtx>({
  msgs: [],
  setMsgs: () => {},
  prevChar: "User",
  setPrevChar: () => {},
  clearHistory: () => {},
  chatConfig: defaultChatConfig,
  addUserInstruction: () => {},
});
