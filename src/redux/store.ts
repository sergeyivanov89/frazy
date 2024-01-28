import { configureStore } from "@reduxjs/toolkit";

import { app, dictionary } from "./slices";

const store = configureStore({
  reducer: {
    app: app.reducer,
    dictionary: dictionary.reducer,
  },
});

export default store;
