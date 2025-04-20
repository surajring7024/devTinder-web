import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import ProfileCard from "./ProfileCard";
import Shimmer from "./Shimmer";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to get the feed data from the backend
  const getFeed = async () => {
    try {
      // Fetch feed data if it's not already loaded
      if (Array.isArray(feed) && feed.length > 0) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.ResponseData));
      setCurrentIndex(0); // Start from the first card
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Handle swipe action (left or right)
  const handleSwipe = (dir) => {
    console.log("Swiped", dir);
    // Move to the next profile when swiped
    setCurrentIndex((prev) => prev + 1);
  };

  // If feed is not available or empty, return loading message
  if (!feed || feed.length === 0) {
    return (
      <div className="text-center text-xl">
        <Shimmer></Shimmer>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      {/* Loop through the feed */}
      {feed.map((profile, index) => (
        <div
          key={profile._id}
          className="absolute w-96 transition-transform duration-500"
          style={{
            // Ensure cards are stacked behind each other based on index
            zIndex: feed.length - index, // Top card has the highest zIndex
            opacity: currentIndex === index ? 1 : 0.7, // Dim the cards behind the top card
            transform: `translateY(${index * 10}px)`, // Offset cards to create the stack effect
            pointerEvents: currentIndex === index ? "auto" : "none", // Only allow interaction on top card
          }}
        >
          {/* Only the top card should be interactive */}
          {index === currentIndex && (
            <ProfileCard
              key={profile._id}
              user={profile}
              onSwipe={handleSwipe}
            />
          )}
        </div>
      ))}

      {/* Show a message when no more profiles */}
      {currentIndex >= feed.length && (
        <div className="absolute text-2xl text-white">No more profiles</div>
      )}
    </div>
  );
};

export default Feed;
