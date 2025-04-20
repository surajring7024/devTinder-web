import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    securityQuestion: [
      {
        question: "",
        answer: "",
      },
    ],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "question" || name === "answer") {
      setFormData((prevData) => ({
        ...prevData,
        securityQuestion: [
          {
            ...prevData.securityQuestion[0],
            [name]: value,
          },
        ],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSignup = async () => {
    try {
      setError("");
      const res = await axios.post(`${BASE_URL}/signup`, formData, {
        withCredentials: true,
      });
      setSuccess(res.data.ResponseData);
    } catch (err) {
      setError(err.response?.data?.ErrorMessage || "Signup failed");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="First Name"
        name="firstName"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Age"
        name="age"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Gender"
        name="gender"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <label className="label">Security Question</label>
      <input
        type="text"
        placeholder="Question"
        name="question"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Answer"
        name="answer"
        className="input input-bordered w-full"
        onChange={handleChange}
      />

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <button className="btn btn-primary w-full" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
};

export default SignUp;
