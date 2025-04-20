import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/forgetPassword`,
        {
          email,
          securityQuestion: {
            question,
            answer,
          },

          newPassword,
          verifyNewPassword,
        },
        { withCredentials: true }
      );
      setMessage(res.data.ResponseData);
    } catch (err) {
      setError(err.response?.data?.ErrorMessage || "Failed to reset password");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Security Question"
        className="input input-bordered w-full"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Security Answer"
        className="input input-bordered w-full"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        className="input input-bordered w-full"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Verify New Password"
        className="input input-bordered w-full"
        value={verifyNewPassword}
        onChange={(e) => setVerifyNewPassword(e.target.value)}
      />
      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <button className="btn btn-primary w-full" onClick={handleReset}>
        Reset Password
      </button>
    </div>
  );
};

export default ForgotPassword;
