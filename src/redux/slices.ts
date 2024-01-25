import { createSlice } from "@reduxjs/toolkit";

import { getLetters, getPhrases } from "./thunks";

type GenericState<T> = {
  data: T;
  status?: "pending" | "success" | "error";
};

const lettersInitialState: GenericState<string[]> = {
  data: [],
};

export const lettersSlice = createSlice({
  name: "letters",
  initialState: lettersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLetters.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getLetters.fulfilled, (state, { payload }) => {
      payload.forEach((el) => {
        const letter = el[0]?.letter;
        if (letter) {
          state.data.push(letter);
        }
      });
      state.status = "success";
    });
    builder.addCase(getLetters.rejected, (state) => {
      state.data = [];
      state.status = "error";
    });
  },
});

export const phrasesSlice = createSlice({
  name: "phrases",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getPhrases.fulfilled,
      (state, action) => (state = action.payload),
    );
  },
});
