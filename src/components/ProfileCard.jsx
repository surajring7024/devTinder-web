import React from "react";

const ProfileCard = ({ user, onSwipe }) => {
  const { firstName, lastName, photourl, about, skills } = user || {};

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
            onClick={() => onSwipe("left")}
          >
            ❌ Ignore
          </button>
          <button
            className="btn btn-success w-1/3"
            onClick={() => onSwipe("right")}
          >
            💖 Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
