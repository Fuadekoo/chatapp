import Image from "next/image";
import React from "react";

function Profile() {
  return (
    <div className="grid grid-rows-[1fr_auto] overflow-hidden">
      <div className="items-center justify-center flex flex-col gap-4 p-4">
        <Image
          src="/ai.png"
          alt="Profile"
          width={100}
          height={100}
          className=" object-cover border"
        />

        <button>change profile picture</button>
        <hr className="w-full border-t" />
      </div>
      <div className="flex flex-col justify-center p-4">
        <h1>about me</h1>
        <ul>
          <li>
            <strong>Name:</strong> John Doe
          </li>
          <li>
            <strong>Email:</strong> email@example.com
          </li>
        </ul>
        <button className="mt-4 p-4">Logout</button>
      </div>
    </div>
  );
}

export default Profile;
