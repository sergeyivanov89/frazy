import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLetters } from "@/redux/thunks";
import type { AppDispatch, RootState } from "@/redux/store";

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const letters = useSelector((state: RootState) => state.letters.data);

  useEffect(() => {
    dispatch(getLetters());
  }, []);

  return (
    <div className="p-3">
      {letters.map((letter) => (
        <div key={letter} className="border p-1">
          {letter}
        </div>
      ))}
    </div>
  );
};

export default MainPage;
