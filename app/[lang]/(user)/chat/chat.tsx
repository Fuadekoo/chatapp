import Image from "next/image";
import ChatWriteCard from "./chatWriteCard";
import React from "react";

function Chat() {
  // Example messages (replace with your messages state/props)
  const messages = [
    { id: 1, fromMe: false, text: "Hello! 👋", time: "08:53 AM" },
    { id: 2, fromMe: true, text: "Hi! How are you?", time: "08:54 AM" },
    { id: 3, fromMe: false, text: "I'm good, thanks!", time: "08:55 AM" },
    { id: 4, fromMe: true, text: "What about you?", time: "08:56 AM" },
    {
      id: 5,
      fromMe: false,
      text: "Doing well! Just working on some projects.",
      time: "08:57 AM",
    },
    {
      id: 6,
      fromMe: true,
      text: "Sounds great! Let me know if you need help.",
      time: "08:58 AM",
    },
    { id: 7, fromMe: false, text: "Will do! Thanks!", time: "08:59 AM" },
    { id: 8, fromMe: true, text: "Anytime! 😊", time: "09:00 AM" },
    { id: 9, fromMe: false, text: "Catch you later!", time: "09:01 AM" },
    { id: 10, fromMe: true, text: "Bye! Take care.", time: "09:02 AM" },
    { id: 11, fromMe: false, text: "You too! Bye!", time: "09:03 AM" },
    { id: 12, fromMe: true, text: "See you soon!", time: "09:04 AM" },
  ];

  return (
    <div className="grid grid-rows-[1fr_auto] bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-2 items-center justify-between px-4 py-3 border-b bg-blue-50 overflow-hidden">
          <div className="flex gap-3 overflow-hidden">
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
          <div className="flex-1 items-end gap-2 overflow-hidden">
            <button className="text-gray-400 hover:text-blue-500 text-xl">
              ⋮
            </button>
          </div>
        </div>
        {/* Messages */}
        <div className=" grid overflow-y-auto h-[calc(100vh-200px)] p-4">
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
      <div className="overflow-hidden p-0">
        <ChatWriteCard />
      </div>
    </div>
  );
}

export default Chat;
