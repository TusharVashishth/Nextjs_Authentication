"use client";
import React from "react";
import { signOut } from "next-auth/react";

export default function SignoutButton() {
  return (
    <div>
      <button
        className="p-3 bg-purple-300 text-black rounded-md"
        onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
      >
        Sign Out
      </button>
    </div>
  );
}
