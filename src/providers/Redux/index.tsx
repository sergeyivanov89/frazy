import { Provider } from "react-redux";
import type { FC } from "react";

import store from "@/redux/store";
import type { ReduxProviderProps as Props } from "./types";

const ReduxProvider: FC<Props> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxProvider;
