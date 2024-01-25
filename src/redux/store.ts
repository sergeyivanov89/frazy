import { configureStore } from "@reduxjs/toolkit";

import { lettersSlice, phrasesSlice } from "./slices";

const store = configureStore({
  reducer: {
    letters: lettersSlice.reducer,
    phrases: phrasesSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
