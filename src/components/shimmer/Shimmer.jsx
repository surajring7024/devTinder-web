import React from "react";

const Shimmer = () => {
  return (
    <div className="card w-96 bg-base-300 shadow-xl m-2 p-2 relative animate-pulse">
      <div className="h-72 bg-gray-700 rounded-lg w-full"></div>
      <div className="card-body">
        <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto my-2"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto my-2"></div>

        <div className="flex flex-wrap gap-2 justify-center my-2">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="badge bg-gray-600 w-16 h-6 rounded"></div>
          ))}
        </div>

        <div className="card-actions justify-between mt-4">
          <div className="btn btn-outline btn-error w-1/3 opacity-60 pointer-events-none">
            &nbsp;
          </div>
          <div className="btn btn-success w-1/3 opacity-60 pointer-events-none">
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
