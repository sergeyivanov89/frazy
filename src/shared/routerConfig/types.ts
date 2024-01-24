import type { RouteProps } from "react-router-dom";

type NavItemConfig = {
  path: string;
  text: string;
};

export type NavigationConfig = NavItemConfig[];
export type RouterConfig = RouteProps[];
