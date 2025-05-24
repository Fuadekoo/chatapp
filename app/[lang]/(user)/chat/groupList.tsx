import React from "react";
const sampleGroups = [
  { id: 1, name: "Group 1", lastMessage: "Welcome!", time: "08:53 AM" },
  { id: 2, name: "Group 2", lastMessage: "Meeting at 5", time: "10:30 PM" },
  { id: 3, name: "Group 3", lastMessage: "", time: "" },
  { id: 4, name: "Group 4", lastMessage: "See you!", time: "09:15 AM" },
  { id: 5, name: "Group 5", lastMessage: "", time: "" },
  { id: 6, name: "Group 6", lastMessage: "Let's catch up", time: "11:00 AM" },
  { id: 7, name: "Group 7", lastMessage: "", time: "" },
  {
    id: 8,
    name: "Group 8",
    lastMessage: "Party at my place",
    time: "07:45 PM",
  },
  { id: 9, name: "Group 9", lastMessage: "", time: "" },
  { id: 10, name: "Group 10", lastMessage: "", time: "" },
];

function GroupList() {
  return (
    <div className="overflow-hidden">
      {/* Search Box */}
      <input
        type="text"
        placeholder="Search or start new group"
        className="w-full p-2 rounded-4xl border mb-4"
      />
      {/* Group List */}
      <div className="overflow-y-auto">
        {sampleGroups.map((group) => (
          <div
            key={group.id}
            className="p-3 border-b flex justify-between items-center cursor-pointer hover:bg-gray-200 rounded"
          >
            <div>
              <p className="font-semibold">{group.name}</p>
              <p className="text-sm text-gray-500">
                {group.lastMessage || "No recent messages"}
              </p>
            </div>
            <span className="text-xs text-gray-400">{group.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupList;
