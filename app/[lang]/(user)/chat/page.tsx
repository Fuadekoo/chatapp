"use client";
import React, { useState } from "react";
import ChatList from "./chatList";
import Chat from "./chat";
import ChatNavbar from "./chatNavbar";
import Profile from "./profile";
import Drawer from "@/components/drawer";

function Page() {
  const [selectedChat, setSelectedChat] = useState<string>();
  const [selectedType, setSelectedType] = useState<"user" | "group">("user");
  const [openProfileDrawer, setOpenProfileDrawer] = useState(false);

  const handleSelectChat = (chatId: string, type: "user" | "group") => {
    setSelectedChat(chatId);
    setSelectedType(type);
  };

  return (
    <div className="overflow-hidden h-screen">
      <nav className="overflow-hidden flex-shrink-0">
        <ChatNavbar onProfileClick={() => setOpenProfileDrawer(true)} />
      </nav>
      {/* ...rest of your layout... */}
      <Drawer
        open={openProfileDrawer}
        onClose={() => setOpenProfileDrawer(false)}
      >
        <Profile />
      </Drawer>
      <main className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 h-full">
          <div
            className={`${
              selectedChat ? "hidden" : "block"
            } md:block h-full overflow-y-auto`}
          >
            <ChatList onSelectChat={handleSelectChat} />
          </div>
          <div
            className={`${
              selectedChat ? "block" : "hidden"
            } md:block h-full overflow-y-auto`}
          >
            {/* Show back button on mobile */}
            {/* <div className="md:hidden mb-2">
              <button
                className="text-blue-500 underline"
                onClick={() => setSelectedChat(null)}
              >
                &larr; Back to chats
              </button>
            </div> */}
            <Chat chatId={selectedChat} type={selectedType} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
