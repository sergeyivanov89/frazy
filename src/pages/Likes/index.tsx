import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";

import PhraseList from "@/components/PhraseList";
import withNavPage from "../withNavPage";
import { getLikes } from "@/redux/thunks";
import type { AppDispatch, RootState } from "@/redux/types";

const Likes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector(
    (state: RootState) => state.dictionary.likes,
  );

  useEffect(() => {
    dispatch(getLikes());
  }, [dispatch]);

  if (status === "pending") {
    return <Spinner>Loading...</Spinner>;
  }

  if (status === "error") {
    return "Some error occurred.";
  }

  return <PhraseList items={data} placeholder="There's no liked phrases." />;
};

export default withNavPage(Likes);
