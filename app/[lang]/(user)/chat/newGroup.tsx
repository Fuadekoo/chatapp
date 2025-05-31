import React, { useState } from "react";
import useAction from "@/hooks/useAction";
import { createGroup } from "@/action/chat/chatgroup";
import { useForm } from "react-hook-form";
import { createGroupSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type NewGroupProps = {
  onFinish: () => void;
};

function NewGroup({ onFinish }: NewGroupProps) {
  const [groupCreate, action, isloadingcreate] = useAction(createGroup, [
    ,
    () => {
      onFinish();
    },
  ]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createGroupSchema),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <h2 className="text-xl font-bold mb-4">Create New Group</h2>
      <form
        onSubmit={handleSubmit((data) => action(data.groupName, data.isPublic))}
        className="w-full max-w-xs"
      >
        <input
          type="text"
          {...register("groupName")}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />
        <label className="flex items-center mb-4">
          <input type="checkbox" {...register("isPublic")} className="mr-2" />
          Public Group
        </label>
        <button
          type="submit"
          disabled={isloadingcreate}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}

export default NewGroup;
