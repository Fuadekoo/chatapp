"use client";
import React from "react";
import UserList from "./userList";
import GroupList from "./groupList";

type ChatListProps = {
  onSelectChat?: (chatId: string) => void;
};

function ChatList({ onSelectChat }: ChatListProps) {
  const [activeTab, setActiveTab] = React.useState<"user" | "group">("user");
  const handleTabChange = (tab: "user" | "group") => {
    setActiveTab(tab);
  };
  return (
    <div className="w-full h-screen bg-gray-100 border-r p-2 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">Chats</h1>
        <button className="p-2 bg-blue-500 text-white rounded hover:bg-pink-500">
          New Chat
        </button>
      </div>
      {/* Tabs */}
      <div className="flex mb-4">
        <button
          className={`flex-1 p-2 rounded-l-md ${
            activeTab === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("user")}
        >
          Users
        </button>
        <button
          className={`flex-1 p-2 rounded-r-md ${
            activeTab === "group" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("group")}
        >
          Groups
        </button>
      </div>
      {/* List */}
      <div className="overflow-y-auto">
        {activeTab === "user" ? (
          <UserList onSelectChat={onSelectChat} />
        ) : (
          <GroupList onSelectChat={onSelectChat} />
        )}
      </div>
    </div>
  );
}

export default ChatList;
