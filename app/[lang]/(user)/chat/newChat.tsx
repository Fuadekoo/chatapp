import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAction from "@/hooks/useAction";
import { FindUser } from "@/action/chat/chatuser";
import { Input } from "@heroui/react";

type NewChatProps = {
  onFinish: () => void;
};

function NewChat({ onFinish }: NewChatProps) {
  const [, action, isLoading] = useAction(FindUser, [
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
    formState: {},
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
      <form
        onSubmit={handleSubmit((data) => action(data.phone))}
        className="w-full max-w-xs"
      >
        <label htmlFor="">enter phone number</label>
        <Input
          type="text"
          {...register("phone")}
          placeholder="Enter user phone"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          find person
        </button>
      </form>
    </div>
  );
}

export default NewChat;
