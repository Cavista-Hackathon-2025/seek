"use client"
import React from "react";
import { useChatStore } from "@/store/chat.store";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import ChatQuestions from "@/components/chat/ChatQuestions";
import Banner from "@/components/shared/banner";

const Chat = () => {
    const { userMessage, setUserMessage, chatLog, isContentReplaced, setIsContentReplaced, loading, sendMessage } = useChatStore();

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event);
    }
  };

  return (
    <div>
        {!isContentReplaced ? (
          <div className="justify-between flex flex-col lg:min-h-[80vh] xl:min-h-[85vh] max-w-[80vw] overflow-hidden">
            <div className="mx-auto w-fit left-0 right-0 -top-32 absolute">
                <Banner text="Happy Late Night Segun" />
            </div>
            <div className="mt-48 overflow-hidden">
            <ChatQuestions
              isContentReplaced={isContentReplaced}
              setIsContentReplaced={setIsContentReplaced}
              sendMessage={sendMessage}
            />
            </div>
            <div>

            <ChatInput
              userMessage={userMessage}
              handleMessage={handleMessage}
              handleEnter={handleEnter}
              sendMessage={sendMessage}
            />
            <p className="text-[14px] font-normal  mb-2 w-fit mx-auto">Seekai can make mistakes. Check important info.</p>
            </div>
          </div>
        ) : (
          <div className="md:p-8 flex flex-col justify-between ">
            <ChatMessages chatLog={chatLog} loading={loading} />
            <ChatInput
              userMessage={userMessage}
              handleMessage={handleMessage}
              handleEnter={handleEnter}
              sendMessage={sendMessage}
            />
            <p className="text-[14px] font-normal  mb-2 w-fit mx-auto">Seekai can make mistakes. Check important info.</p>
          </div>
        )} 
    </div>
  );
};

export default Chat;