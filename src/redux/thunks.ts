import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "@/api";
import { ALPHABET } from "@/constants";
import type { Phrase } from "./types";

export const getLetters = createAsyncThunk("getLetters", async () => {
  const urls: string[] = [];

  for (let i = 0; i < ALPHABET.length; i++) {
    urls.push(`/phrases?letter=${ALPHABET[i]}&_limit=1`);
  }

  return await Promise.all<Phrase[]>(urls.map((url) => api(url)));
});

export const addPhrase = createAsyncThunk("addPhrase", async (data: Phrase) => {
  return await api("/phrases", "post", {
    ...data,
    letter: data.name[0].toLowerCase(),
  } as never);
});
