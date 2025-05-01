import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { removeAllFeed } from "../utils/feedSlice";
import { removeAllRequests } from "../utils/requestsSlice";
import { removeConnection } from "../utils/connectionSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user?.ResponseData);
  const requests = useSelector((store) => store.requests?.ResponseData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      dispatch(removeAllFeed());
      dispatch(removeAllRequests());
      dispatch(removeConnection());
      return navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/login");
      } else {
        console.error("Failed to fetch user:", err);
      }
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex gap-2">
          <div className="indicator">
            {requests && (
              <span className="indicator-item badge badge-secondary">
                {requests?.length}
              </span>
            )}
            <button className="btn">
              <Link to="/requests">inbox</Link>
            </button>
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">
              Welcome, {user?.firstName || "Guest"}
            </a>
          </div>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="img" src={user?.photourl || ""} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
