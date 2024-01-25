import { createAsyncThunk } from "@reduxjs/toolkit";

import { ALPHABET } from "@/constants";
import type { Phrase } from "./types";

export const getLetters = createAsyncThunk("getLetters", async () => {
  const urls: string[] = [];

  for (let i = 0; i < ALPHABET.length; i++) {
    urls.push(`http://localhost:8000/phrases?letter=${ALPHABET[i]}&_limit=1`);
  }

  return await Promise.all(
    urls.map((url) => fetch(url).then<Phrase[]>((res) => res.json())),
  );
});

export const getPhrases = createAsyncThunk("getPhrases", async (count) => {
  console.log(count);
  const response = await fetch("@/../data/db.json");
  return await response.json();
});
