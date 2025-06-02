"use client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { updateUserSchema } from "@/lib/zodSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAction from "@/hooks/useAction";
import { logout } from "@/action/common/authentication";
import { getLoginUserId } from "@/action/user/loginuser";
import { updateUserProfile } from "@/action/user/profile";
import { Button, Input } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { Form } from "react-hook-form";
import Loading from "@/components/loading";

function Profile() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    mode: "onTouched",
  });
  const [userData, fetchUserData, isLoadingUser] = useAction(getLoginUserId, [
    true,
    () => {},
  ]);
  const [updateResponse, updateAction, isUpdating] = useAction(
    updateUserProfile,
    [
      ,
      (updateResponse) => {
        if (updateResponse) {
          addToast({
            title: "Profile Update",
            description: updateResponse.message,
          });
        }
      },
    ]
  );
  const [logoutResponse, logoutAction, isLoggingOut] = useAction(logout, [
    ,
    (logoutResponse) => {
      if (logoutResponse) {
        addToast({
          title: "Logout",
          description: logoutResponse.message,
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
        {/* <Form>
          <Input type="file" {...register("photo")} className="w-full" />
          <Input
            type="text"
            {...register("name")}
            placeholder="Name"
            className="w-full"
          />
          {errors.name && (
            <p className="text-red-500">{errors.name?.message}</p>
          )}
          <Input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
          <Input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="w-full"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
          <Button>change profile</Button>
          <hr className="w-full border-t" />
        </Form> */}
      </div>
      <div className="flex flex-col justify-center p-4">
        <h1>about me</h1>
        <ul>
          <li>
            <strong>Name:</strong> {userData?.name}
          </li>
          <li>
            <strong>Phone:</strong> {userData?.phone}
          </li>
        </ul>
        {/* <form onSubmit={logoutAction} className="flex flex-col gap-2">
          <Button type="submit" disabled={isLoggingOut}>
            {isLoggingOut ? <Loading size={40} /> : "Logout"}
          </Button>
        </form> */}
      </div>
    </div>
  );
}

export default Profile;
