"use client";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

export default function Toast() {
  const params = useSearchParams();

  useEffect(() => {
    if (params?.get("error") && params.get("error") != "") {
      toast.error(params.get("error"), { theme: "colored" });
    }
  }, [params]);
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
