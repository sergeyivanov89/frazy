import { configureStore } from "@reduxjs/toolkit";

import { app, dictionary, quiz, scores } from "./slices";

const store = configureStore({
  reducer: {
    app: app.reducer,
    dictionary: dictionary.reducer,
    quiz: quiz.reducer,
    scores: scores.reducer,
  },
});

export default store;
