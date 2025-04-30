import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const ProfileCard = ({ user }) => {
  const { _id, firstName, lastName, photourl, about, skills } = user || {};
  const dispatch = useDispatch();

  const sendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card w-96 bg-base-300 shadow-xl m-2 p-2 relative transition-transform duration-500">
      <figure>
        <img src={photourl} alt="name" className="w-full h-72 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center text-2xl font-bold">
          {firstName + " " + lastName}
        </h2>
        <p className="card-title justify-center text-sm font-bold">{about}</p>
        <div className="flex flex-wrap gap-2 justify-center my-2">
          {skills?.map((skill, index) => (
            <div key={index} className="badge badge-primary badge-outline">
              {skill}
            </div>
          ))}
        </div>
        <div className="card-actions justify-between mt-4">
          <button
            className="btn btn-outline btn-error w-1/3"
            onClick={() => sendRequest("ignored", _id)}
          >
            ❌ Ignore
          </button>
          <button
            className="btn btn-success w-1/3"
            onClick={() => sendRequest("intrested", _id)}
          >
            💖 Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
