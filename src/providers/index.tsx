import type { FC } from "react";

import RouterProvider from "./Router";
import type { RootProviderProps as Props } from "./types";

const RootProvider: FC<Props> = ({ children }) => {
  return <RouterProvider>{children}</RouterProvider>;
};

export default RootProvider;
