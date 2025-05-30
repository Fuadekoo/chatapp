import React, { useState } from "react";

type NewGroupProps = {
  onFinish: () => void;
  createdById: string; // Pass the current user id as prop
};

function NewGroup({ onFinish, createdById }: NewGroupProps) {
  const [groupName, setGroupName] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call your API to create the group here
    const groupData = {
      groupName,
      isPublic: isPublic ? 1 : 0, // tinyint(1)
      createdById,
      // createdAt and updatedAt can be set in your backend
    };
    // await createGroup(groupData);
    onFinish();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <h2 className="text-xl font-bold mb-4">Create New Group</h2>
      <form onSubmit={handleCreate} className="w-full max-w-xs">
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="mr-2"
          />
          Public Group
        </label>
        {/* Hidden field for createdById */}
        <input type="hidden" value={createdById} name="createdById" />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}

export default NewGroup;
