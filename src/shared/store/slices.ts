import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";

import initialState from "./initialState";

export const getPhrases = createAsyncThunk("getPhrases", async (count) => {
  console.log(count);
  const response = await fetch("@/../data/db.json");
  return await response.json();
});

const phrases = createSlice({
  name: "phrases",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getPhrases.fulfilled,
      (state, action) => (state.phrases = action.payload),
    );
  },
});

const store = configureStore({
  reducer: phrases.reducer,
});

export default store;
