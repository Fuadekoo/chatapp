"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAction from "@/hooks/useAction";
import { authenticate } from "@/action/common/authentication";
import Image from "next/image";

function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const [data, action, loading] = useAction(authenticate, [
    ,
    (data) => console.log(data),
  ]);

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    // handle login logic here
    console.log("Form submitted", data);
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-green-500">Welcome to ChattingApp</h1>
        <form onSubmit={handleSubmit(action)}>
          <input type="phone" {...register("phone")} />
          {errors.phone && (
            <p style={{ color: "red" }}>{errors.phone.message}</p>
          )}
          <br />
          <input type="password" {...register("password")} />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
