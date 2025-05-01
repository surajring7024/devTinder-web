import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
    removeAllFeed: () => null,
  },
});

export const { addFeed, removeUserFromFeed, removeAllFeed } = feedSlice.actions;

export default feedSlice.reducer;
