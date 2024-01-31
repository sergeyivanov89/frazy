import { createSlice } from "@reduxjs/toolkit";

import {
  getLetters,
  getPhrases,
  getPhrase,
  addPhrase,
  updatePhrase,
  getLikes,
  getQuiz,
  getScores,
  addScore,
} from "./thunks";
import type { Phrase, QuizAnswer } from "@/types";
import type {
  AppState,
  DictionaryState,
  QuizState,
  ScoresState,
} from "./types";

const appState: AppState = {
  header: "",
};

const dictionaryState: DictionaryState = {
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

const quizState: QuizState = {
  steps: [],
  status: undefined,
  currentStep: undefined,
};

const scoresState: ScoresState = {
  get: {
    data: [],
    status: undefined,
  },
  add: {
    data: null,
    status: undefined,
  },
};

export const app = createSlice({
  name: "app",
  initialState: appState,
  reducers: {
    setHeader: (state, { payload }) => {
      state.header = payload;
    },
  },
});

export const dictionary = createSlice({
  name: "dictionary",

  initialState: dictionaryState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getLetters.pending, ({ letters }) => {
      letters.data = [];
      letters.status = "pending";
    });
    builder.addCase(getLetters.fulfilled, ({ letters }, { payload }) => {
      letters.data = [];
      payload.forEach((el) => {
        const letter = el[0]?.name[0];
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
        const letter = payload.name[0];
        if (phrases[0]?.name[0] === letter) {
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

export const quiz = createSlice({
  name: "quiz",

  initialState: quizState,

  reducers: {
    selectAnswer: ({ steps, currentStep }, { payload: idx }) => {
      steps[currentStep!].answers[idx].isSelected = true;
    },
    changeStep: (state, { payload: idx }) => {
      state.currentStep = idx;
    },
    toggleLike: ({ steps, currentStep }) => {
      const { question } = steps[currentStep!];
      question.like = !question.like;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getQuiz.pending, (state) => {
      Object.assign(state, quizState, { status: "pending" });
    });
    builder.addCase(getQuiz.fulfilled, (state, { payload }) => {
      const questions: Phrase[] = payload
        .toSorted(() => Math.random() - 0.5)
        .slice(0, 5);

      questions.forEach((question, questionIdx, questionArr) => {
        const answers: QuizAnswer[] = [];
        const { meanings } = question;

        answers.push({
          text: meanings[0],
          isRight: true,
          isSelected: false,
        });

        questionArr
          .reduce<Phrase["meanings"]>((acc, currVal, idx) => {
            if (idx !== questionIdx) {
              acc.push(...currVal.meanings);
            }
            return acc;
          }, [])
          .toSorted(() => Math.random() - 0.5)
          .slice(0, 2)
          .forEach((text) => {
            answers.push({
              text,
              isRight: false,
              isSelected: false,
            });
          });

        answers.sort(() => Math.random() - 0.5);

        state.steps.push({ question, answers });
      });

      state.currentStep = 0;
      state.status = "success";
    });
    builder.addCase(getQuiz.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const scores = createSlice({
  name: "scores",

  initialState: scoresState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getScores.pending, ({ get }) => {
      get.data = [];
      get.status = "pending";
    });
    builder.addCase(getScores.fulfilled, ({ get }, { payload }) => {
      get.data = payload;
      get.status = "success";
    });
    builder.addCase(getScores.rejected, ({ get }) => {
      get.status = "error";
    });

    builder.addCase(addScore.pending, ({ add }) => {
      add.data = null;
      add.status = "pending";
    });
    builder.addCase(addScore.fulfilled, ({ add }, { payload }) => {
      add.data = payload;
      add.status = "success";
    });
    builder.addCase(addScore.rejected, ({ add }) => {
      add.status = "error";
    });
  },
});

export const setHeader = app.actions.setHeader;
export const selectAnswer = quiz.actions.selectAnswer;
export const changeStep = quiz.actions.changeStep;
export const toggleLike = quiz.actions.toggleLike;
