import { lazy } from "react";

import type { NavigationConfig, RouterConfig } from "./types";

const Main = lazy(() => import("@/pages/Main"));
const Phrase = lazy(() => import("@/pages/Phrase"));
const Phrases = lazy(() => import("@/pages/Phrases"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export const navigationConfig: NavigationConfig = [
  {
    path: "/",
    text: "Словарь",
  },
];

export const routerConfig: RouterConfig = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/phrases/:phaseId",
    element: <Phrase />,
  },
  {
    path: "/letters/:letter",
    element: <Phrases />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
