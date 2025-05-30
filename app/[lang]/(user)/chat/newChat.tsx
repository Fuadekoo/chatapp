import React, { useState } from "react";

type NewChatProps = {
  onFinish: () => void;
};

function NewChat({ onFinish }: NewChatProps) {
  const [phone, setPhone] = useState("");

  const handleFindUser = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call your API to find user by phone and start chat
    // await startChatWithUser(phone);
    onFinish();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <h2 className="text-xl font-bold mb-4">Start New Chat</h2>
      <form onSubmit={handleFindUser} className="w-full max-w-xs">
        <input
          type="text"
          placeholder="Enter user phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Start Chat
        </button>
      </form>
    </div>
  );
}

export default NewChat;
