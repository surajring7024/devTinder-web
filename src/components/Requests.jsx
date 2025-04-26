import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieve", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.ResponseData.length == 0)
    return <h1>Your dont have any request pending</h1>;

  return (
    <div className="flex justify-center w-full">
      <ul className="list bg-base-200 rounded-box shadow-md w-1/3">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Requests</li>

        {requests?.ResponseData?.map((request) => (
          <li key={request._id} className="list-row">
            <div>
              <img
                className="size-10 rounded-box"
                src={request.fromUserId.photourl}
              />
            </div>
            <div>
              <div>
                {request.fromUserId.firstName +
                  " " +
                  request.fromUserId.lastName}
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {request.fromUserId.about}
              </div>
            </div>
            <button
              className="btn btn-square btn-ghost border-green-600 text-green-600 hover:bg-green-100"
              onClick={() => reviewRequest("accepted", request._id)}
            >
              <svg
                className="size-[1.5em]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>

            <button
              className="btn btn-square btn-ghost text-white border border-red-600 hover:border-red-500 hover:bg-red-600 "
              onClick={() => reviewRequest("rejected", request._id)}
            >
              <svg
                className="size-[1.5em]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requests;
