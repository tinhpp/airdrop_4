import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: '',
  path: '',
};

export const noteSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setCurrentNote: (state, action) => {
      state = action.payload;
      return state;
    },
    reset: (state, action) => {
      return initialState;
    }
  },
});

export const { setCurrentNote, reset } = noteSlice.actions;
export default noteSlice.reducer;
