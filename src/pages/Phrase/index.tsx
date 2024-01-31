import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";

import PhraseUI from "@/components/Phrase";
import { getPhrase, updatePhrase } from "@/redux/thunks";
import type { RootState, AppDispatch } from "@/redux/types";

const Phrase = () => {
  const params = useParams();
  const { phraseId } = params;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector(
    (state: RootState) => state.dictionary.phrase,
  );
  const updateStatus = useSelector(
    (state: RootState) => state.dictionary.update.status,
  );

  useEffect(() => {
    dispatch(getPhrase(phraseId!));
  }, [dispatch, phraseId]);

  if (status === "pending") {
    return <Spinner>Loading...</Spinner>;
  }

  if (status === "error") {
    return "Some error occurred.";
  }

  if (!data) {
    return null;
  }

  const onLikeToggle = () => {
    if (updateStatus === "pending") {
      return;
    }
    dispatch(updatePhrase({ ...data, like: !data!.like }));
  };

  return <PhraseUI {...data} onLikeToggle={onLikeToggle} />;
};

export default Phrase;
