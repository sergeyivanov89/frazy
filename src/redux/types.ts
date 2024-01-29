import store from "@/redux/store";

import { Phrase } from "@/types";

type RequestType<T> = {
  data: T;
  status?: "pending" | "success" | "error";
};

export type AppState = {
  header: string;
};

export type DictionaryState = {
  letters: RequestType<string[]>;
  phrases: RequestType<Phrase[]>;
  phrase: RequestType<Phrase | null>;
  update: RequestType<Phrase | null>;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
