"use client";
import React from "react";

const sampleChats = [
  { id: 1, name: "Messi", lastMessage: "Super", time: "08:53 AM" },
  { id: 2, name: "Srikanth", lastMessage: "Hi Srikanth", time: "10:30 PM" },
  { id: 3, name: "Raju", lastMessage: "", time: "" },
  { id: 4, name: "Varun", lastMessage: "", time: "" },
];

function ChatList() {
  return (
    <div className="w-full h-screen bg-gray-100 border-r p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">Chats</h1>
        <button className="p-2 bg-blue-500 text-white rounded">New Chat</button>
      </div>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search or start new chat"
        className="w-full p-2 rounded-4xl border mb-4"
      />

      {/* Chat List */}
      <div className="overflow-y-auto">
        {sampleChats.map((chat) => (
          <div
            key={chat.id}
            className="p-3 border-b flex justify-between items-center cursor-pointer hover:bg-gray-200 rounded"
          >
            <div>
              <p className="font-semibold">{chat.name}</p>
              <p className="text-sm text-gray-500">
                {chat.lastMessage || "No recent messages"}
              </p>
            </div>
            <span className="text-xs text-gray-400">{chat.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
