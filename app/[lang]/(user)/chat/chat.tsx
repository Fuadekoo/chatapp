"use client";
import Image from "next/image";
import ChatWriteCard from "./chatWriteCard";
import React from "react";
import useAction from "@/hooks/useAction";
import { getGroupChat } from "@/action/chat/chat";
import { getUserChat } from "@/action/chat/chat";

type ChatProps = {
  chatId: string;
  type: "user" | "group";
};

function Chat({ chatId, type }: ChatProps) {
  // Conditionally fetch data
  if (type == "user") {
    const [userData, , userLoading] = useAction(
      getUserChat,
      [true, () => {}],
      chatId
    );

    let messages = userData;
    let loading = userLoading;
  } else {
    const [groupData, , groupLoading] = useAction(
      getGroupChat,
      [true, () => {}],
      chatId
    );
    let messages = groupData;
    let loading = groupLoading;
  }

  // Pick the correct messages
  // const messages = type === "user" ? userData : groupData;
  // const loading = type === "user" ? userLoading : groupLoading;

  // Move hooks and variables outside of conditional
  const [userData, , userLoading] = useAction(
    getUserChat,
    [true, () => {}],
    type === "user" ? chatId : "undefined"
  );
  const [groupData, , groupLoading] = useAction(
    getGroupChat,
    [true, () => {}],
    type === "group" ? chatId : "undefined"
  );

  const messages = type === "user" ? userData : groupData;
  const loading = type === "user" ? userLoading : groupLoading;

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-blue-50">
        <div className="flex items-center gap-3">
          <button className="md:hidden text-blue-500 text-xl font-bold px-2">
            &lt;
          </button>
          <Image
            src="/ai.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full object-cover border"
          />
          <div>
            <div className="font-semibold text-gray-800">
              {type === "user" ? "Chat Partner" : "Group"}
            </div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-blue-500 text-xl">⋮</button>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : messages && messages.length > 0 ? (
          messages.map((msg: any) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.fromUserId === chatId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                  msg.fromUserId === chatId
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                <div>{msg.msg}</div>
                <div className="text-xs text-gray-300 mt-1 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">No messages yet.</div>
        )}
      </div>
      {/* Input */}
      <div className="border-t bg-white px-4 py-3">
        <ChatWriteCard />
      </div>
    </div>
  );
}

export default Chat;
