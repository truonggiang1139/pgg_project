import React from "react";
import logo from "../../../assets/Rectangle 4.svg";
import ForgotForm from "../components/ForgotForm";
export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center ">
      <img src={logo} alt="" className="mt-16 w-16 " />
      <h2 className=" text-4xl font-bold">HR Management System</h2>
      <h2 className="mt-28 text-3xl font-bold ">Forgot password</h2>
      <ForgotForm />
      <footer className="sticky top-full p-8 text-xs">Copyright © 2022. All Rights Reserved</footer>
    </div>
  );
}
