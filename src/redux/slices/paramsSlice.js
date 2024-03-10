import { createSlice } from "@reduxjs/toolkit";

const paramsSlice = createSlice({
  name: "params",
  initialState: null,
  reducers: {
    changeParams(state, action) {
      for (const key in action.payload) {
        if (action.payload[key]) {
          return action.payload;
        }
      }
    },
    clearParams() {
      return null;
    },
  },
});

export const { changeParams, clearParams } = paramsSlice.actions;
export default paramsSlice.reducer;
