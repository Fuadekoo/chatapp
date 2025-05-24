import React from "react";
import { Camera } from "lucide-react";
// import {folderDown} from "lucide-react";

function ChatWriteCard() {
  return (
    <div className="grid grid-cols-[1fr_50px] gap-2 m-2 bg-gray-100 rounded-lg">
      <div className="border border-r-2 border-gray-300 grid grid-cols-[50px_1fr] items-center gap-2">  
        <div>
          <button className="bg-gray-300 rounded-lg p-2">
            <Camera size={20} />
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Type your message..."
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>

      <div>
        <button className="bg-blue-500 text-white rounded-lg p-2">Send</button>
      </div>
    </div>
  );
}

export default ChatWriteCard;
