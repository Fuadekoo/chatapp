"use client";
import React, { useState } from "react";
import ChatList from "./chatList";
import Chat from "./chat";
import ChatNavbar from "./chatNavbar";

function Page() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  return (
    <div>
      <nav>
        <ChatNavbar />
      </nav>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4">
          <div className={`${selectedChat ? "hidden" : "block"} md:block`}>
            <ChatList onSelectChat={setSelectedChat} />
          </div>
          <div className={`${selectedChat ? "block" : "hidden"} md:block`}>
            {/* Show back button on mobile */}
            <div className="md:hidden mb-2">
              <button
                className="text-blue-500 underline"
                onClick={() => setSelectedChat(null)}
              >
                &larr; Back to chats
              </button>
            </div>
            <Chat chatId={selectedChat} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
