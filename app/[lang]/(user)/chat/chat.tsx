import Image from "next/image";
import ChatWriteCard from "./chatWriteCard";
import React from "react";

function Chat() {
  // Example messages (replace with your messages state/props)
  const messages = [
    { id: 1, fromMe: false, text: "Hello! 👋", time: "08:53 AM" },
    { id: 2, fromMe: true, text: "Hi! How are you?", time: "08:54 AM" },
    { id: 3, fromMe: false, text: "I'm good, thanks!", time: "08:55 AM" },
  ];

  return (
    <div className="h-screen grid grid-rows-2 bg-white rounded-lg shadow-md overflow-hidden">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-blue-50 overflow-hidden">
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
              <div className="font-semibold text-gray-800">Chat Partner</div>
              <div className="text-xs text-gray-500">Online</div>
            </div>
          </div>
          <div>
            <button className="text-gray-400 hover:text-blue-500 text-xl">
              ⋮
            </button>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                  msg.fromMe
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                <div>{msg.text}</div>
                <div className="text-xs text-gray-300 mt-1 text-right">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Input */}
      <div className="flex-1/4">
        <ChatWriteCard />
      </div>
    </div>
  );
}

export default Chat;
