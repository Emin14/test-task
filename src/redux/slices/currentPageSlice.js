import { createSlice } from "@reduxjs/toolkit";

const currentPageSlice = createSlice({
  name: "currentPage",
  initialState: 1,
  reducers: {
    changeCurrentPage(state, action) {
      return action.payload;
    },
  },
});

export const { changeCurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
