import { useContext, useEffect, useState } from "react";
import { ChatMsgCtx } from "../../context";
import { Button } from "../button";
import { Input } from "../input";
import { ChatHandler } from "./chat.interface";

export default function ChatInput(
  props: Pick<
    ChatHandler,
    | "isLoading"
    | "input"
    | "setInput"
    | "setMessages"
    | "onFileUpload"
    | "onFileError"
    | "handleSubmit"
  > & {
    multiModal?: boolean;
  },
) {
  const { input, setInput, setMessages, handleSubmit } = props;
  const [chatInput, setChatInput] = useState("");

  const { msgs, clearHistory, setPrevChar, addUserInstruction, chatConfig } =
    useContext(ChatMsgCtx);

  const {
    model,
    characters,
    getUserPrompt,
    characterInfoMap,
    chatTopicSystemPrompt,
  } = chatConfig;
  const onSubmit = (
    e: React.FormEvent<HTMLFormElement> = new CustomEvent("form") as any,
  ) => {
    handleSubmit(e, { data: { model } });
  };

  useEffect(() => {
    onSubmit();
  }, [input]);

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
      }}
      className="rounded-xl bg-white p-4 shadow-xl space-y-4"
    >
      <div className="flex">
        {characters.map((char) => (
          <Button
            className={`mr-2`}
            key={char}
            onClick={() => {
              setPrevChar(char);
              setMessages([
                {
                  id: (Math.random() * 10000).toString(),
                  role: "system",
                  content: [
                    characterInfoMap[char].description,
                    chatTopicSystemPrompt,
                  ].join("\n"),
                },
                ...msgs,
              ]);
              setInput(getUserPrompt(char, characterInfoMap));
            }}
          >
            {characterInfoMap[char].name}({characterInfoMap[char].job})
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={clearHistory}
          className="ml-auto"
        >
          Clear chat history
        </Button>
      </div>
      <div className="flex w-full items-start justify-between gap-4 ">
        <Input
          autoFocus
          name="message"
          placeholder="Type a message"
          className="flex-1"
          value={chatInput}
          onChange={(ev) => setChatInput(ev.target.value)}
        />
        <Button
          disabled={props.isLoading}
          onClick={() => {
            addUserInstruction(chatInput);
            setChatInput("");
          }}
        >
          Send message
        </Button>
      </div>
    </form>
  );
}
