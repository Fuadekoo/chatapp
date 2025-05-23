"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function Page() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    // handle login logic here
    console.log(data);
    console.log("hello fuad");
  };

  return (
    <div>
      <h1>this is a login page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="phone" {...register("phone")} />
        <input type="password" {...register("password")} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Page;
