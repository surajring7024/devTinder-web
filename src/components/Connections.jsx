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

  if (!connections) return <ConnectionShimmer />;
  if (connections.length === 0)
    return (
      <h1 className="text-2xl text-center">You dont have any connection!</h1>
    );

  return (
    <div className="flex justify-center w-full">
      <ul className="list bg-base-200 rounded-box shadow-md w-1/3">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Connections
        </li>

        {connections?.ResponseData?.map((connection) => (
          <li key={connection._id} className="list-row">
            <div>
              <img className="size-10 rounded-box" src={connection.photourl} />
            </div>
            <div>
              <div>{connection.firstName + " " + connection.lastName}</div>
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
