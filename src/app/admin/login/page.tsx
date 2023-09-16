"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

export default function AdminLogin() {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = await signIn("credentials", {
      email: authState.email,
      password: authState.password,
      redirect: false,
    });

    if (data?.status == 200) {
      router.replace("/admin/dashboard");
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Toast />
      <div className="w-[500px] shadow-md rounded-lg p-5">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p>Welcome back</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <label className="block">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full outline-red-300 p-2 h-10 rounded-md border"
              onChange={(e) =>
                setAuthState({ ...authState, email: e.target.value })
              }
            />
          </div>
          <div className="mt-5">
            <label className="block">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full outline-red-300 p-2 h-10 rounded-md border"
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
            />
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="w-full bg-red-400 rounded-lg p-2 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
