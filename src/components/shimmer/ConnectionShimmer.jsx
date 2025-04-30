import React from "react";

const ConnectionShimmer = () => {
  return (
    <div className="flex justify-center w-full">
      <ul className="list bg-base-200 rounded-box shadow-md w-1/3">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Connections
        </li>

        <li className="list-row">
          <div>
            <img className="size-10 rounded-box border border-black" />
          </div>
          <div>
            <div></div>
            <div className="text-xs uppercase font-semibold opacity-60"></div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ConnectionShimmer;
