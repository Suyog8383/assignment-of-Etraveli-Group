import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedMovie: [],
  isFetching: false,
};

export const homeReducer = createSlice({
  name: "movies",
  initialState,
  reducers: {
    AddMovie: (state, action) => {
      state.selectedMovie = { ...action.payload };
      state.isFetching = true;
    },
  },
});

export const { AddMovie } = homeReducer.actions;
export default homeReducer.reducer;
