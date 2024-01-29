import { lazy } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBrain,
  faTrophy,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import type { NavigationConfig, RouterConfig } from "./types";

const Main = lazy(() => import("@/pages/Main"));
const Phrase = lazy(() => import("@/pages/Phrase"));
const Phrases = lazy(() => import("@/pages/Phrases"));
const Likes = lazy(() => import("@/pages/Likes"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export const navigationConfig: NavigationConfig = [
  {
    path: "/",
    text: "Словарь",
    icon: <FontAwesomeIcon icon={faBook} />,
  },
  {
    path: "/train",
    text: "Викторина",
    icon: <FontAwesomeIcon icon={faBrain} />,
  },
  {
    path: "/achievements",
    text: "Достижения",
    icon: <FontAwesomeIcon icon={faTrophy} />,
  },
  {
    path: "/likes",
    text: "Любимые",
    icon: <FontAwesomeIcon icon={faHeart} />,
  },
];

export const routerConfig: RouterConfig = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/phrases/:phraseId",
    element: <Phrase />,
  },
  {
    path: "/letters/:letter",
    element: <Phrases />,
  },
  {
    path: "/likes",
    element: <Likes />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
