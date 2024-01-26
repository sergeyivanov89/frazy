import store from "@/redux/store";

type RequestType<T> = {
  data: T;
  status?: "pending" | "success" | "error";
};

export type Phrase = {
  id: number;
  letter: string;
  name: string;
  meanings: string[];
};

export type DictionarySliceState = {
  letters: RequestType<string[]>;
  phrases: RequestType<Phrase[]>;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
