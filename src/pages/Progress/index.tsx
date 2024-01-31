import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";

import ScoreList from "@/components/ScoreList";
import withNavPage from "../withNavPage";
import { getScores } from "@/redux/thunks";
import type { AppDispatch, RootState } from "@/redux/types";

const Progress = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.scores.get);

  useEffect(() => {
    dispatch(getScores());
  }, [dispatch]);

  if (status === "pending") {
    return <Spinner>Loading...</Spinner>;
  }

  if (status === "error") {
    return "Some error occurred.";
  }

  return <ScoreList items={data} placeholder="There's no items." />;
};

export default withNavPage(Progress);
