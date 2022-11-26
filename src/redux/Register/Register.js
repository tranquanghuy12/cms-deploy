import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    userRegistration: (state, action) => {},
  },
});

export const { userRegistration } = registerSlice.actions;

export default registerSlice.reducer;
