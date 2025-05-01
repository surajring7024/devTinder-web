import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user?.ResponseData);

  const [showForgot, setShowForgot] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const securityQuestion = user?.securityQuestion?.[0]?.question || "";

  const handlePasswordReset = async () => {
    try {
      if (!answer || !newPassword || !verifyPassword) {
        setError("Please fill in all fields");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/forgetPassword`,
        {
          email: user.email,
          securityQuestion: {
            question: securityQuestion,
            answer: answer,
          },
          newPassword,
          verifyNewPassword: verifyPassword,
        },
        { withCredentials: true }
      );

      setMessage(response.data.ResponseData);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.ErrorMessage || "Something went wrong");
      setMessage("");
    }
  };

  return (
    user && (
      <>
        <div className="w-full max-w-4xl h-suto mx-auto my-5 bg-base-200 shadow-lg rounded-xl p-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-6">👤 User Profile</h2>
          </div>
          <div className="w-full max-w-6xl mx-auto bg-base-200 rounded-xl shadow-xl p-10 my-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <img
                  src={user?.photourl}
                  alt="Profile"
                  className="w-48 h-48 rounded-full border-4 border-primary shadow-lg"
                />
                <h2 className="text-2xl font-bold mt-4 text-primary">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {user?.email}
                </p>
              </div>

              {/* Details & About */}
              <div className="lg:col-span-2 bg-white dark:bg-base-100 p-8 rounded-xl shadow-inner border border-gray-200 dark:border-base-300 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <p className="text-lg">
                    <span className="font-semibold text-primary">🎂 Age:</span>{" "}
                    {user?.age}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-primary">
                      ⚧ Gender:
                    </span>{" "}
                    {user?.gender}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-1">
                    📝 About
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {user?.about}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    🚀 Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {user?.skills && user.skills.length > 0 ? (
                      user.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium shadow-md hover:scale-105 transition-transform duration-200"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm italic text-gray-500">
                        No skills added
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="mt-6">
              <button
                className="btn btn-warning"
                onClick={() =>
                  setShowForgot(!showForgot) + setShowEditProfile(false)
                }
              >
                Forgot Password?
              </button>
            </div>
            <div className="mt-6">
              <button
                className="btn btn-warning mr-10"
                onClick={() =>
                  setShowEditProfile(!showEditProfile) + setShowForgot(false)
                }
              >
                Edit Profile
              </button>
            </div>
          </div>
          {showEditProfile && <EditProfile user={user} />}
          {showForgot && (
            <div className="mt-6 bg-base-100 p-6 rounded-box shadow w-full max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-6 text-center">
                🔐 Reset Password
              </h3>

              <div className="form-control mb-3 w-full">
                <label className="label mb-1 text-left">
                  Security Question
                </label>
                <input
                  className="input input-bordered bg-gray-100 cursor-not-allowed w-full"
                  value={securityQuestion}
                  readOnly
                  disabled
                />
              </div>

              <div className="form-control mb-3 w-full">
                <label className="label mb-1 text-left">Answer</label>
                <input
                  className="input input-bordered w-full"
                  placeholder="Answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

              <div className="form-control mb-3 w-full">
                <label className="label mb-1 text-left">New Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  value={newPassword}
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="form-control mb-3 w-full">
                <label className="label mb-1 text-left">Verify Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  value={verifyPassword}
                  placeholder="Verify New Password"
                  onChange={(e) => setVerifyPassword(e.target.value)}
                />
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="alert alert-error shadow-md mt-2 transition-all duration-300 ease-out">
                  <span className="font-medium">{error}</span>
                  <button
                    onClick={() => setError("")}
                    className="btn btn-sm btn-ghost ml-auto text-white"
                  >
                    ✕
                  </button>
                </div>
              )}

              {message && (
                <div className="alert alert-success shadow-md mt-2 transition-all duration-300 ease-out">
                  <span className="font-medium">{message}</span>
                  <button
                    onClick={() => setMessage("")}
                    className="btn btn-sm btn-ghost ml-auto text-white"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  className="btn btn-primary mt-6 w-full sm:w-1/3"
                  onClick={handlePasswordReset}
                >
                  Reset Password
                </button>
              </div>
            </div>
          )}
        </div>
        {error && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <span>Profile sent successfully.</span>
            </div>
          </div>
        )}
      </>
    )
  );
};

export default Profile;
