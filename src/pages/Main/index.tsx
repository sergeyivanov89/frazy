import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Letter from "@/components/Letter";
import { getLetters } from "@/redux/thunks";
import type { AppDispatch, RootState } from "@/redux/types";

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const letters = useSelector(
    (state: RootState) => state.dictionary.letters.data,
  );

  useEffect(() => {
    dispatch(getLetters());
  }, [dispatch]);

  return (
    <div className="d-flex flex-wrap">
      {letters.map((letter) => (
        <Letter key={letter} to={`/phrases/letter/${letter}`}>
          {letter}
        </Letter>
      ))}
    </div>
  );
};

export default MainPage;
