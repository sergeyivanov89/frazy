import type { ReactElement } from "react";
import type { RouteProps } from "react-router-dom";

type NavItemConfig = {
  path: string;
  text: string;
  icon: ReactElement;
};

export type NavigationConfig = NavItemConfig[];
export type RouterConfig = RouteProps[];
