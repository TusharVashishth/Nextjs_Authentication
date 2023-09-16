import {
  CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import SignoutButton from "@/components/signoutButton";
import { getServerSession } from "next-auth";

import React from "react";

export default async function AdminDashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div className="flex justify-center items-center px-10 pt-10 flex-col">
      <h1>Hello Admin How are you </h1>
      <h1 className="text-sm font-bold">
        {session && JSON.stringify(session)}
      </h1>

      <SignoutButton type="Admin" />
    </div>
  );
}
