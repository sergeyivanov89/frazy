import { createSlice } from "@reduxjs/toolkit";

import {
  getLetters,
  getPhrases,
  getPhrase,
  addPhrase,
  updatePhrase,
  getLikes,
} from "./thunks";
import type { AppState, DictionaryState } from "./types";
import likes from "@/pages/Likes";

const appSliceState: AppState = {
  header: "",
};

const dictionarySliceState: DictionaryState = {
  letters: {
    data: [],
    status: undefined,
  },
  phrases: {
    data: [],
    status: undefined,
  },
  phrase: {
    data: null,
    status: undefined,
  },
  update: {
    data: null,
    status: undefined,
  },
  likes: {
    data: [],
    status: undefined,
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
    builder.addCase(getPhrases.rejected, ({ phrases }) => {
      phrases.status = "error";
    });

    builder.addCase(
      addPhrase.fulfilled,
      (
        { letters: { data: letters }, phrases: { data: phrases } },
        { payload },
      ) => {
        const { letter } = payload;
        if (phrases[0].letter === letter) {
          phrases.push(payload);
          phrases.sort((a, b) => (a.name > b.name ? 1 : -1));
        }
        if (!letters.includes(letter)) {
          letters.push(letter);
          letters.sort();
        }
      },
    );

    builder.addCase(getPhrase.pending, ({ phrase }) => {
      phrase.data = null;
      phrase.status = "pending";
    });
    builder.addCase(getPhrase.fulfilled, ({ phrase }, { payload }) => {
      phrase.data = payload;
      phrase.status = "success";
    });
    builder.addCase(getPhrase.rejected, ({ phrase }) => {
      phrase.status = "error";
    });

    builder.addCase(updatePhrase.pending, ({ update }) => {
      update.data = null;
      update.status = "pending";
    });
    builder.addCase(
      updatePhrase.fulfilled,
      ({ phrase, update }, { payload }) => {
        phrase.data = payload;
        update.data = payload;
        update.status = "success";
      },
    );
    builder.addCase(updatePhrase.rejected, ({ update }) => {
      update.status = "error";
    });

    builder.addCase(getLikes.pending, ({ likes }) => {
      likes.data = [];
      likes.status = "pending";
    });
    builder.addCase(getLikes.fulfilled, ({ likes }, { payload }) => {
      likes.data = payload;
      likes.status = "success";
    });
    builder.addCase(getLikes.rejected, ({ likes }) => {
      likes.status = "error";
    });
  },
});
