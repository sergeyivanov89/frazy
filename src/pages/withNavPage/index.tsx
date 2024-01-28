import { useEffect, type ComponentType } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setHeader } from "@/redux/slices";
import { navigationConfig } from "@/shared/routerConfig";
import type { AppDispatch } from "@/redux/types";

// eslint-disable-next-line react/display-name
const withNavPage = (Page: ComponentType) => (props: object) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const header = navigationConfig.find(({ path }) => path === pathname)?.text;

  useEffect(() => {
    dispatch(setHeader(header));
  }, [dispatch, header]);

  return <Page {...props} />;
};

export default withNavPage;
