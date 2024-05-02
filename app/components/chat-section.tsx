"use client";

import { Message } from "ai";
import { useChat } from "ai/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CharType, defaultChatConfig } from "../constants";
import { ChatMsgCtx, IChatMsgCtx } from "./context";
import { ChatInput, ChatMessages } from "./ui/chat";

export default function ChatSection() {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [prevChar, setPrevChar] = useState<CharType>("User");

  const msgMapRef = useRef<Map<string, Message>>(new Map());
  const messagesRef = useRef<Message[]>([]);
  const {
    messages,
    setMessages,
    input,
    setInput,
    isLoading,
    handleSubmit,
    reload,
    stop,
  } = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_API,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
    onFinish: (msg) => {
      const newMsgs = msgs.slice();
      // push into user message
      newMsgs.push(messagesRef.current[messagesRef.current.length - 2]);
      const latestMsg: Message = { ...msg, char: prevChar } as any;
      newMsgs.push(latestMsg);
      msgMapRef.current.set(latestMsg.id, latestMsg);
      console.log("finish", newMsgs, msg, messagesRef.current);
      setMsgs(newMsgs);
    },
  });
  messagesRef.current = messages;

  useEffect(() => {
    if (
      messages.length &&
      messages[messages.length - 1].role === "user" &&
      (!msgs.length ||
        msgs[msgs.length - 1].id !== messages[messages.length - 1].id)
    ) {
      const newMsgs = msgs.slice();
      newMsgs.push(messages[messages.length - 1]);
    }
  }, [messages]);

  const transformedMessages = useMemo(() => {
    const set = new Set(["system", "user"]);
    return (
      messages
        .map((item, idx) => {
          if (idx === messages.length - 1) {
            return { ...item, char: prevChar };
          }
          return msgMapRef.current.get(item.id) ?? item;
        })
        // hide system and user prompt
        .filter((msg) => !set.has(msg.role))
    );
  }, [messages]);

  const ctx: IChatMsgCtx = {
    msgs,
    setMsgs,
    prevChar,
    setPrevChar,
    clearHistory: () => {
      setMsgs([]);
      setMessages([]);
    },
    chatConfig: defaultChatConfig,
  };

  return (
    <ChatMsgCtx.Provider value={ctx}>
      <div className="space-y-4 max-w-5xl w-full">
        <ChatMessages
          messages={transformedMessages}
          isLoading={isLoading}
          reload={reload}
          stop={stop}
        />
        <ChatInput
          input={input}
          setInput={setInput}
          setMessages={setMessages}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          multiModal={process.env.NEXT_PUBLIC_MODEL === "gpt-4-vision-preview"}
        />
      </div>
    </ChatMsgCtx.Provider>
  );
}
