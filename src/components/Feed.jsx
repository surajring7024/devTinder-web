import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import ProfileCard from "./ProfileCard";
import Shimmer from "./shimmer/Shimmer";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  // Function to get the feed data from the backend
  const getFeed = async () => {
    try {
      if (Array.isArray(feed) && feed.length > 0) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.ResponseData));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="flex justify-center items-center h-64">
        <Shimmer />
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-base-200 rounded-xl shadow-md mx-auto max-w-xl my-10">
        <span className="text-5xl mb-4">🎉</span>
        <h2 className="text-2xl font-semibold text-white mb-2">
          No More Profiles
        </h2>
        <p className="text-gray-400 text-center px-4">
          You’ve reached the end for now. Come back later for more profiles to
          explore!
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      {/* Loop through the feed */}
      {feed.map((profile) => (
        <div
          key={profile._id}
          className="absolute w-96 transition-transform duration-500"
        >
          <div className="stack">
            <div className="card bg-base-100 text-center">
              <ProfileCard
                key={profile._id}
                user={profile}
                className="card-body"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
