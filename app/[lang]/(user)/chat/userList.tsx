import React from "react";
const sampleChats = [
  { id: 1, name: "Messi", lastMessage: "Super", time: "08:53 AM" },
  { id: 2, name: "Srikanth", lastMessage: "Hi Srikanth", time: "10:30 PM" },
  { id: 3, name: "Raju", lastMessage: "", time: "" },
  { id: 4, name: "Varun", lastMessage: "", time: "" },
  {
    id: 5,
    name: "Suresh",
    lastMessage: "Let's meet tomorrow",
    time: "09:15 AM",
  },
  { id: 6, name: "Anjali", lastMessage: "How are you?", time: "11:00 AM" },
  { id: 7, name: "Rahul", lastMessage: "", time: "" },
  { id: 8, name: "Priya", lastMessage: "See you soon!", time: "07:45 PM" },
  { id: 9, name: "Kiran", lastMessage: "", time: "" },
  { id: 10, name: "Nisha", lastMessage: "", time: "" },
  { id: 11, name: "Vikram", lastMessage: "Good morning!", time: "08:00 AM" },
  { id: 12, name: "Sita", lastMessage: "", time: "" },
  {
    id: 13,
    name: "Gopal",
    lastMessage: "See you at the party",
    time: "06:30 PM",
  },
  { id: 14, name: "Lakshmi", lastMessage: "", time: "" },
  { id: 15, name: "Rajesh", lastMessage: "", time: "" },
];
function UserList() {
  return (
    <div className="overflow-hidden">
      {/* Search Box */}
      <input
        type="text"
        placeholder="Search or start new chat"
        className="w-full p-2 rounded-4xl border mb-4"
      />

      {/* User List */}
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

export default UserList;
