import { createSlice } from "@reduxjs/toolkit";

import { getLetters, addPhrase } from "./thunks";
import type { DictionarySliceState } from "./types";

const dictionarySliceState: DictionarySliceState = {
  letters: {
    data: [],
  },
  phrases: {
    data: [],
  },
};

export const dictionary = createSlice({
  name: "dictionary",

  initialState: dictionarySliceState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getLetters.pending, ({ letters }) => {
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

    builder.addCase(addPhrase.fulfilled, ({ letters }, { payload }) => {
      const { letter } = payload;
      if (!letters.data.includes(letter)) {
        letters.data.push(letter);
        letters.data.sort();
      }
    });
  },
});
