import type { FC } from "react";

import RouterProvider from "./Router";
import ReduxProvider from "./Redux";
import type { RootProviderProps as Props } from "./types";

const RootProvider: FC<Props> = ({ children }) => {
  return (
    <RouterProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </RouterProvider>
  );
};

export default RootProvider;
