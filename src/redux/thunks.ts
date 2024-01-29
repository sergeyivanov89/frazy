import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "@/api";
import { ALPHABET } from "@/constants";
import type { JSONType, Phrase, AddedPhrase } from "@/types";

export const getLetters = createAsyncThunk("getLetters", async () => {
  const urls: string[] = [];

  for (let i = 0; i < ALPHABET.length; i++) {
    urls.push(`/phrases?letter=${ALPHABET[i]}&_limit=1`);
  }

  return await Promise.all<Phrase[]>(urls.map((url) => api(url)));
});

export const getPhrases = createAsyncThunk(
  "getPhrases",
  async (data: JSONType) => {
    const paramsStr = new URLSearchParams(data as never).toString();
    return await api(`/phrases?${paramsStr}`);
  },
);

export const addPhrase = createAsyncThunk(
  "addPhrase",
  async (data: AddedPhrase) => await api("/phrases", "post", data as never),
);
