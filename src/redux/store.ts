import { configureStore } from "@reduxjs/toolkit";

import { dictionary } from "./slices";

const store = configureStore({
  reducer: {
    dictionary: dictionary.reducer,
  },
});

export default store;
