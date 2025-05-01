import axios from "axios";
import { BASE_URL } from "./constants";
import { addRequests } from "./requestsSlice";

export const fetchRequests = async (dispatch) => {
  try {
    const res = await axios.get(BASE_URL + "/user/requests/recieve", {
      withCredentials: true,
    });
    dispatch(addRequests(res.data));
  } catch (err) {
    console.error("Failed to fetch requests:", err);
  }
};
