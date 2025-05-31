"use client";
import Image from "next/image";
import ChatWriteCard from "./chatWriteCard";
import React, { useEffect, useRef, useState } from "react";
import { getLoginUserId } from "@/action/user/loginuser";
import useAction from "@/hooks/useAction";
import { getGroupChat } from "@/action/chat/chat";
import { getUserChat } from "@/action/chat/chat";
import { io, Socket } from "socket.io-client";

type ChatMessage = {
  id: string;
  fromUserId: string;
  toUserId: string;
  msg: string;
  createdAt: Date;
  self?: boolean;
};

type GroupChatMessage = {
  id: string;
  groupId: string;
  senderId: string;
  msg: string;
  createdAt: Date;
  self?: boolean;
};

type ChatProps = {
  chatId: string;
  type: "user" | "group";
};

function Chat({ chatId, type }: ChatProps) {
  const [currentUser] = useAction(getLoginUserId, [true, () => {}]);
  const currentUserId = currentUser?.id;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<(ChatMessage | GroupChatMessage)[]>(
    []
  );

  // Always call both hooks, don't call them conditionally!
  const [userData, , userLoading] = useAction(
    getUserChat,
    [true, () => {}],
    chatId
  );
  const [groupData, , groupLoading] = useAction(
    getGroupChat,
    [true, () => {}],
    chatId
  );

  // Initialize socket connection
  useEffect(() => {
    if (!currentUserId) return;

    const newSocket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000",
      {
        auth: { id: currentUserId },
      }
    );

    setSocket(newSocket);

    // Handle incoming direct messages
    const handleMsg = (newMsg: ChatMessage) => {
      if (
        type === "user" &&
        ((newMsg.fromUserId === chatId && newMsg.toUserId === currentUserId) ||
          (newMsg.fromUserId === currentUserId && newMsg.toUserId === chatId))
      ) {
        setMessages((prev) => [
          ...prev,
          { ...newMsg, self: newMsg.fromUserId === currentUserId },
        ]);
      }
    };

    // Handle incoming group messages
    const handleGroupMsg = (newMsg: GroupChatMessage) => {
      if (type === "group" && newMsg.groupId === chatId) {
        setMessages((prev) => [
          ...prev,
          { ...newMsg, self: newMsg.senderId === currentUserId },
        ]);
      }
    };

    newSocket.on("msg", handleMsg);
    newSocket.on("group:msg", handleGroupMsg);

    return () => {
      newSocket.off("msg", handleMsg);
      newSocket.off("group:msg", handleGroupMsg);
      newSocket.disconnect();
    };
  }, [currentUserId, chatId, type]);

  // Set initial messages when data loads
  useEffect(() => {
    if (type === "user" && userData) {
      setMessages(
        (userData as ChatMessage[]).map((msg) => ({
          ...msg,
          self: msg.fromUserId === currentUserId,
        }))
      );
    } else if (type === "group" && groupData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setMessages(
        (groupData as any[]).map((msg) => ({
          id: msg.id,
          groupId: msg.groupChat?.id,
          senderId: msg.sender?.id,
          msg: msg.msg,
          createdAt: msg.createdAt,
          self: msg.sender?.id === currentUserId,
        }))
      );
    }
  }, [userData, groupData, type, currentUserId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Optimistically add message to UI and emit to server
  const handleSendMessage = (message: string) => {
    if (!socket || !message.trim() || !currentUserId) return;

    const now = new Date();
    if (type === "user") {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).slice(2), // temp id
          fromUserId: currentUserId,
          toUserId: chatId,
          msg: message,
          createdAt: now,
          self: true,
        },
      ]);
      socket.emit("msg", {
        id: chatId,
        msg: message,
        fromUserId: currentUserId,
      });
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).slice(2),
          groupId: chatId,
          senderId: currentUserId,
          msg: message,
          createdAt: now,
          self: true,
        },
      ]);
      socket.emit("group:msg", {
        groupId: chatId,
        msg: message,
        senderId: currentUserId,
      });
    }
  };

  const loading = type === "user" ? userLoading : groupLoading;

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-blue-50 overflow-hidden">
        <div className="flex items-center gap-3 overflow-hidden">
          <button className="md:hidden text-blue-500 text-xl font-bold px-2 overflow-hidden">
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
              {/* {type === "user" ? currentUserName : "Group"} */}
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
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                  msg.self
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                {type === "group" && !msg.self && (
                  <div className="text-xs font-semibold">
                    {(msg as GroupChatMessage).senderId === currentUserId
                      ? "You"
                      : `User ${(msg as GroupChatMessage).senderId}`}
                  </div>
                )}
                <div>{msg.msg}</div>
                <div
                  className={`text-xs mt-1 ${
                    msg.self ? "text-blue-100" : "text-gray-500"
                  } text-right`}
                >
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
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-white px-4 py-3 overflow-hidden">
        <ChatWriteCard onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default Chat;
