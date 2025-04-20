import React, { useState } from "react";
import Login from "./Login";
import Signup from "./SignUp";
import ForgotPassword from "./ForgetPassword";

const AuthTabs = () => {
  const [tab, setTab] = useState("login");

  return (
    <div className="flex justify-center mt-6 mb-4">
      <div className="w-full max-w-md p-6 shadow-lg rounded-xl bg-base-200">
        <div role="tablist" className="tabs tabs-boxed justify-center mb-6">
          <a
            role="tab"
            className={`tab ${tab === "login" && "tab-active"}`}
            onClick={() => setTab("login")}
          >
            Login
          </a>
          <a
            role="tab"
            className={`tab ${tab === "signup" && "tab-active"}`}
            onClick={() => setTab("signup")}
          >
            Signup
          </a>
          <a
            role="tab"
            className={`tab ${tab === "forgot" && "tab-active"}`}
            onClick={() => setTab("forgot")}
          >
            Forgot Password
          </a>
        </div>

        {tab === "login" && <Login />}
        {tab === "signup" && <Signup />}
        {tab === "forgot" && <ForgotPassword />}
      </div>
    </div>
  );
};

export default AuthTabs;
