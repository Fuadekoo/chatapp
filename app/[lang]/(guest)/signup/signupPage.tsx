import React, { useState } from "react";
import useAction from "@/hooks/useAction";
import { newUser } from "@/action/user/newuser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "@/lib/zodSchema";
import { z } from "zod";
import { Input } from "@heroui/react";
import Loading from "@/components/loading";
import { addToast, Button, Progress } from "@heroui/react";
function SignupPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    reset,
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  const [response, action, isLoading] = useAction(newUser, [
    ,
    (response) => {
      addToast({
        title: "Signup",
        description: response.message,
      });
    }
    
  ]);
  console.log("Response from action:", response);
  // Reset form after successful signup
  // if (response?.message) {
  //   reset();
  //   // redirect tologin components after successful signup
  //   setStep(1);
  // }

  // Handle next step with validation
  const handleNext = async () => {
    // Validate only fields in step 1
    const valid = await trigger(["name", "phone"]);
    if (valid) setStep(2);
  };

  // Handle previous step (optional)
  const handleBack = () => setStep(1);

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-3">
        <Progress value={(step / totalSteps) * 100} color="success" />
        {/* <h1 className="text-green-500">Welcome to ChattingApp</h1> */}
        <form
          onSubmit={handleSubmit(action)}
          className="flex flex-col gap-2"
          autoComplete="off"
        >
          {step === 1 && (
            <>
              <Input type="text" {...register("name")} placeholder="Name" />
              {errors.name && (
                <p style={{ color: "red" }}>{errors.name?.message}</p>
              )}
              <Input type="phone" {...register("phone")} placeholder="Phone" />
              {errors.phone && (
                <p style={{ color: "red" }}>{errors.phone?.message}</p>
              )}
              <Button
                type="button"
                color="secondary"
                variant="bordered"
                className="mt-2"
                onClick={handleNext}
              >
                Next
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Input type="email" {...register("email")} placeholder="Email" />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email?.message}</p>
              )}
              <Input
                type="password"
                {...register("password")}
                placeholder="Password"
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password?.message}</p>
              )}
              <Input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p style={{ color: "red" }}>
                  {errors.confirmPassword?.message}
                </p>
              )}
              <div className="flex gap-2">
                <Button
                  type="button"
                  color="default"
                  variant="flat"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  isDisabled={isLoading}
                  color="secondary"
                  variant="flat"
                  type="submit"
                >
                  {isLoading ? <Loading size={20} /> : "Signup"}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
