import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAction from "@/hooks/useAction";
import { FindUser } from "@/action/chat/chatuser";

type NewChatProps = {
  onFinish: () => void;
};

function NewChat({ onFinish }: NewChatProps) {
  const [findUser, action, isLoading] = useAction(FindUser, [
    ,
    (data) => {
      if (data) {
        onFinish();
      }
    },
  ]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        phone: z
          .string()
          .min(1, "Phone number is required")
          .max(15, "Phone number is too long"),
      })
    ),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <h2 className="text-xl font-bold mb-4">Start New Chat</h2>
      <form onSubmit={handleSubmit(action)} className="w-full max-w-xs">
        <input
          type="text"
          {...register("phone")}
          placeholder="Enter user phone"
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          find person
        </button>
      </form>
    </div>
  );
}

export default NewChat;
