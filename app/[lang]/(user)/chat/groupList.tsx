"use client";
import React from "react";
import useAction from "@/hooks/useAction";
import { getGroupList } from "@/action/chat/chatgroup";
import Loading from "@/components/loading";

type groupListProps = {
  onSelectChat?: (chatId: string, type: "group") => void;
};

function GroupList({ onSelectChat }: groupListProps) {
  const [search, setSearch] = React.useState("");
  const [data, , loading] = useAction(getGroupList, [true, () => {}], search);

  return (
    <div className="overflow-hidden">
      {/* Search Box */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search or start new group"
        className="w-full p-2 rounded-4xl border mb-4"
      />
      {/* Group List */}
      <div className="overflow-y-auto">
        {loading || data === undefined ? (
          <div className="p-3 mt-10 text-center">
            <Loading />
          </div>
        ) : (
          data.map((group) => (
            <div
              key={group.id}
              onClick={() => onSelectChat && onSelectChat(group.id, "group")}
              className="p-3 border-b flex justify-between items-center cursor-pointer hover:bg-gray-200 rounded"
            >
              <div>
                <p className="font-semibold">{group.name}</p>
                <p className="text-sm text-gray-500">
                  {group.image || "No recent messages"}
                </p>
              </div>
              <span className="text-xs text-gray-400">{group.description}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GroupList;
