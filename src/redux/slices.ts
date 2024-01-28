import { createSlice } from "@reduxjs/toolkit";

import { getLetters, getPhrases, addPhrase } from "./thunks";
import type { AppState, DictionaryState } from "./types";

const appSliceState: AppState = {
  header: "",
};

const dictionarySliceState: DictionaryState = {
  letters: {
    data: [],
  },
  phrases: {
    data: [],
  },
};

export const app = createSlice({
  name: "app",
  initialState: appSliceState,
  reducers: {
    setHeader: (state, { payload }) => {
      state.header = payload;
    },
  },
});

export const setHeader = app.actions.setHeader;

export const dictionary = createSlice({
  name: "dictionary",

  initialState: dictionarySliceState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getLetters.pending, ({ letters }) => {
      letters.data = [];
      letters.status = "pending";
    });

    builder.addCase(getLetters.fulfilled, ({ letters }, { payload }) => {
      letters.data = [];
      payload.forEach((el) => {
        const letter = el[0]?.letter;
        if (letter) {
          letters.data.push(letter);
        }
      });
      letters.status = "success";
    });

    builder.addCase(getLetters.rejected, ({ letters }) => {
      letters.data = [];
      letters.status = "error";
    });

    builder.addCase(getPhrases.pending, ({ phrases }) => {
      phrases.data = [];
      phrases.status = "pending";
    });

    builder.addCase(getPhrases.fulfilled, ({ phrases }, { payload }) => {
      phrases.data = payload;
      phrases.status = "success";
    });

    builder.addCase(addPhrase.fulfilled, ({ letters }, { payload }) => {
      const { letter } = payload;
      if (!letters.data.includes(letter)) {
        letters.data.push(letter);
        letters.data.sort();
      }
    });
  },
});

console.log(dictionary);
