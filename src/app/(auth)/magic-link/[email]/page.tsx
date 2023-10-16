"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";

export default function MagicLinkLogin({
  params,
}: {
  params: { email: string };
}) {
  const searchParam = useSearchParams();
  useEffect(() => {
    axios
      .post("/api/auth/magic-link/verify", {
        email: params.email,
        token: searchParam.get("signature"),
      })
      .then((res) => {
        const response = res.data;
        console.log("The response is ", response);
        if (response.status == 200) {
          toast.success("Redirecting you the home page.", { theme: "colored" });
          signIn("credentials", {
            email: response.email,
            password: "",
            callbackUrl: "/",
            redirect: true,
          });
        } else if (response.status == 400) {
          toast.error(response.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        console.log("The error is", err);
      });
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="h-screen w-screen flex justify-center items-center">
        <h1>Please wait validating your link.</h1>
      </div>
    </>
  );
}
