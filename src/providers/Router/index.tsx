import { BrowserRouter } from "react-router-dom";
import type { FC } from "react";

import type { RouterProviderProps as Props } from "./types";

const RouterProvider: FC<Props> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

export default RouterProvider;
