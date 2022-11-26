import { createSlice } from "@reduxjs/toolkit";

let mode = "light";
if (localStorage.getItem("MODE")) {
  mode = localStorage.getItem("MODE");
}

const initialState = {
  mode: mode,
};

export const changeModeSlice = createSlice({
  name: "Mode",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { changeMode } = changeModeSlice.actions;

export default changeModeSlice.reducer;
