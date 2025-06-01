import Image from "next/image";
import React from "react";
import useAction from "@/hooks/useAction";
import { logout } from "@/action/common/authentication";
import { getLoginUserId } from "@/action/user/loginuser";
import { Button } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { Form } from "react-hook-form";

function Profile() {
  const [response, action, isLoading] = useAction(logout, [
    ,
    (response) => {
      if (response) {
        addToast({
          title: "Logout",
          description: response.message,
        });
      } else {
        addToast({
          title: "Logout",
          description: "Logout successful!",
        });
      }
    },
  ]);

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
        <Form onSubmit={action} className="flex flex-col gap-2">
          <Button type="submit" disabled={isLoading}>
            Logout
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Profile;
