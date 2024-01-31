import store from "@/redux/store";

import type { Phrase, QuizQuestion, QuizAnswer, Score } from "@/types";

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
  likes: RequestType<Phrase[]>;
};

export type QuizState = {
  steps: {
    question: QuizQuestion;
    answers: QuizAnswer[];
  }[];
  currentStep?: number;
  status?: "pending" | "success" | "error";
};

export type ScoresState = {
  get: RequestType<Score[]>;
  add: RequestType<Score | null>;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
