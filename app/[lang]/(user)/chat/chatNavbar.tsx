"use client";
import Image from "next/image";
import React from "react";

function ChatNavbar() {
  return (
    <div className="sticky top-0 flex items-end justify-between p-4 bg-sky-200 overflow-hidden">
      <div>telegram</div>
      <Image
        src="/ai.png"
        alt="Profile"
        width={32}
        height={32}
        className="rounded-full object-cover"
      />
    </div>
  );
}

export default ChatNavbar;
