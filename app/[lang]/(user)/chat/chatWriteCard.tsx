import React from "react";

function ChatWriteCard() {
  return (
    <div className="grid grid-cols-[50px_1fr_50px] gap-2 m-2 bg-gray-100 rounded-lg">
     <div><button className="bg-blue-500 text-white rounded-lg p-2">Send</button></div>
     <div><input type="text" placeholder="Type your message..." className="border border-gray-300 rounded-lg p-2 w-full" /></div>
     <div><button className="bg-gray-300 rounded-lg p-2">Attach</button></div>
    </div>
  );
}

export default ChatWriteCard;
