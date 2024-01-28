import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";

import PhraseList from "@/components/PhraseList";
import { getPhrases } from "@/redux/thunks";
import { setHeader } from "@/redux/slices";
import type { AppDispatch, RootState } from "@/redux/types";

const Phrases = () => {
  const { letter } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector(
    (state: RootState) => state.dictionary.phrases,
  );

  useEffect(() => {
    dispatch(
      getPhrases({
        letter: letter!,
        _sort: "name",
      }),
    );
    dispatch(setHeader((letter as string).toUpperCase()));
  }, [dispatch, letter]);

  if (status === "pending") {
    return <Spinner>Loading...</Spinner>;
  }

  if (status === "error") {
    return "Some error occurred.";
  }

  return <PhraseList items={data} />;
};

export default Phrases;
