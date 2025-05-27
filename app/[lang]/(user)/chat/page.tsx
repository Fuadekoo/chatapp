"use client";
import React, { useState } from "react";
import ChatList from "./chatList";
import Chat from "./chat";
import ChatNavbar from "./chatNavbar";
import Profile from "./profile";
import Drawer from "@/components/drawer";

function Page() {
  const [selectedChat, setSelectedChat] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<"user" | "group">("user");
  const [openProfileDrawer, setOpenProfileDrawer] = useState(false);

  // Correct ChatListProps type
  type ChatListProps = {
    onSelectChat?: (chatId: string, type: "user" | "group") => void;
  };

  // Handler receives both chatId and type
  const handleSelectChat = (chatId: string, type: "user" | "group") => {
    setSelectedChat(chatId);
    setSelectedType(type);
  };

  return (
    <div className="overflow-hidden h-screen">
      <nav className="overflow-hidden flex-shrink-0">
        <ChatNavbar onProfileClick={() => setOpenProfileDrawer(true)} />
      </nav>
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
            {/* Pass the handler to ChatList */}
            <ChatList onSelectChat={handleSelectChat} />
          </div>
          <div
            className={`${
              selectedChat ? "block" : "hidden"
            } md:block h-full overflow-y-auto`}
          >
            {selectedChat && (
              <Chat
                chatId={selectedChat}
                type={selectedType}
                // currentUserId={"yourCurrentUserId"} // Replace with actual user id
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
