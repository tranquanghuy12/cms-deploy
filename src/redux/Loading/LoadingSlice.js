import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const loadingSlice = createSlice({
  name: "Loading",
  initialState,
  reducers: {
    getLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { getLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
