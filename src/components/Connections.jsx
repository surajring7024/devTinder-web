import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import ConnectionShimmer from "./shimmer/ConnectionShimmer";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });

    dispatch(addConnection(res.data));
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  {
    !connections ? (
      <div className="flex flex-col items-center justify-center bg-base-100 shadow-lg p-6 rounded-xl max-w-md mx-auto mt-10">
        <span className="text-4xl mb-4">🤝</span>
        <h1 className="text-2xl font-semibold text-center mb-2">
          You don't have any connections yet!
        </h1>
        <p className="text-gray-600 text-center">
          Start engaging with people to build your network.
        </p>
      </div>
    ) : connections.length === 0 ? (
      <ConnectionShimmer />
    ) : null;
  }

  return (
    <div className="flex justify-center w-full">
      <ul className="list bg-base-200 rounded-box shadow-md w-full max-w-xs sm:max-w-md md:max-w-lg">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Connections
        </li>

        {connections?.ResponseData?.map((connection) => (
          <li
            key={connection._id}
            className="list-row flex items-center space-x-4 p-4 border-b last:border-none"
          >
            <div className="w-10 h-10 flex-shrink-0">
              <img
                className="w-full h-full object-cover rounded-full"
                src={connection.photourl}
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold">
                {connection.firstName + " " + connection.lastName}
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {connection.about}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
