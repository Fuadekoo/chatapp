"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAction from "@/hooks/useAction";
import { authenticate } from "@/action/common/authentication";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import Loading from "@/components/loading";
import { addToast } from "@heroui/toast";

function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const [response, action, loading] = useAction(authenticate, [
    ,
    (response) => {
      if (response) {
        addToast({
          title: "Login",
          description: response,
          
        });
      } else {
        addToast({
          title: "Login",
          description: "Login successful!",
        });
      }
    },
  ]);
  console.log("Response from action:", response);

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-green-500">Welcome to ChattingApp</h1>
        <form onSubmit={handleSubmit(action)}>
          <Input type="phone" {...register("phone")} />
          {errors.phone && (
            <p style={{ color: "red" }}>{errors.phone.message}</p>
          )}
          <br />
          <Input type="password" {...register("password")} />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
          <br />
          <Button
            isDisabled={loading}
            color="secondary"
            variant="flat"
            type="submit"
          >
            {loading ? <Loading size={40} /> : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
