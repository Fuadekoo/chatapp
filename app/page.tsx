"use client";
import Image from "next/image";
import { useState } from "react";
import LoginPage from "./[lang]/(guest)/login/loginPage";
import SignupPage from "./[lang]/(guest)/signup/signupPage";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  return (
    <div className="bg-gray-300 h-svh max-w-svw flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg grid sm:grid-cols-1 md:grid-cols-2 w-[900px] overflow-hidden">
        <div className="flex flex-col gap-4 p-4 m-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to ChattingApp</h1>
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 rounded-l-lg font-semibold transition ${
                activeTab === "login"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 rounded-r-lg font-semibold transition ${
                activeTab === "signup"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Signup
            </button>
          </div>
          <div>{activeTab === "login" ? <LoginPage /> : <SignupPage />}</div>
        </div>
        <div className="bg-blue-100 hidden md:flex justify-center items-center">
          <Image
            src="/ai.png"
            alt="Description of image"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
