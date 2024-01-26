import { lazy } from "react";

import type { NavigationConfig, RouterConfig } from "./types";

const Main = lazy(() => import("@/pages/Main"));
const RandomPhrase = lazy(() => import("@/pages/RandomPhrase"));
const Phrase = lazy(() => import("@/pages/Phrase"));

export const navigationConfig: NavigationConfig = [
  {
    path: "/",
    text: "Словарь",
  },
  {
    path: "/random-phrase",
    text: "Случайный",
  },
];

export const routerConfig: RouterConfig = [
  {
    path: "/",
    element: <Main />,
    index: true,
  },
  {
    path: "/random-phrase",
    element: <RandomPhrase />,
  },
  {
    path: "/phrases/:phaseId",
    element: <Phrase />,
  },
  {
    path: "/phrases/letter/:letter",
    element: null,
  },
];
