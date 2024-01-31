import { configureStore } from "@reduxjs/toolkit";

import { app, dictionary, quiz } from "./slices";

const store = configureStore({
  reducer: {
    app: app.reducer,
    dictionary: dictionary.reducer,
    quiz: quiz.reducer,
  },
});

export default store;
