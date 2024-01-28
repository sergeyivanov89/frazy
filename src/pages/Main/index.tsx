import { useEffect } from "react";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import Letter from "@/components/Letter";
import { getLetters } from "@/redux/thunks";
import withNavPage from "@/pages/withNavPage";
import type { AppDispatch, RootState } from "@/redux/types";

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: letters, status } = useSelector(
    (state: RootState) => state.dictionary.letters,
  );

  useEffect(() => {
    dispatch(getLetters());
  }, [dispatch]);

  if (status === "pending") {
    return <Spinner>Loading...</Spinner>;
  }

  if (status === "error") {
    return "Some error occurred.";
  }

  return (
    <div className="grid">
      {letters.map((letter) => (
        <Letter key={letter} className="g-col-3" to={`/letters/${letter}`}>
          {letter}
        </Letter>
      ))}
    </div>
  );
};

export default withNavPage(MainPage);
