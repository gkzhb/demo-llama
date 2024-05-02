import { Message } from "ai";
import React from "react";
import { CharType } from "../constants";

export interface IChatMsgCtx {
  /** common prompt context for all characters */
  msgs: Message[];
  setMsgs: (msgs: Message[]) => void;
  prevChar: CharType;
  setPrevChar: (prevChar: CharType) => void;
}
export const ChatMsgCtx = React.createContext<IChatMsgCtx>({
  msgs: [],
  setMsgs: () => {},
  prevChar: "User",
  setPrevChar: () => {},
});
