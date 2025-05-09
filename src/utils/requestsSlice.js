import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      return {
        ...state,
        ResponseData: state.ResponseData.filter(
          (r) => r._id !== action.payload
        ),
      };
    },
    removeAllRequests: () => null,
  },
});

export const { addRequests, removeRequest, removeAllRequests } =
  requestsSlice.actions;
export default requestsSlice.reducer;
