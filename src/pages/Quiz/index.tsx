import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Spinner } from "reactstrap";

import Phrase from "@/components/Phrase";
import withNavPage from "../withNavPage";
import { getQuiz, addScore, updatePhrase } from "@/redux/thunks";
import { selectAnswer as select, changeStep, toggleLike } from "@/redux/slices";
import type { AppDispatch, RootState } from "@/redux/types";

const Quiz = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { steps, status, currentStep } = useSelector(
    (state: RootState) => state.quiz,
  );
  const addScoreStatus = useSelector(
    (state: RootState) => state.scores.add.status,
  );
  const updatePhraseStatus = useSelector(
    (state: RootState) => state.dictionary.update.status,
  );
  const [showFinalScreen, setShowFinalScreen] = useState(false);

  useEffect(() => {
    dispatch(getQuiz());
  }, [dispatch]);

  if (status === "pending" || addScoreStatus === "pending") {
    return <Spinner>Loading...</Spinner>;
  }

  if (status === "error") {
    return "Some error occurred while getting quiz.";
  }

  if (addScoreStatus === "error") {
    return "Some error occurred while adding score.";
  }

  if (!steps.length) {
    return null;
  }

  const step = steps[currentStep!];
  const { question, answers } = step;
  const isAnswerSelected = answers.some(({ isSelected }) => isSelected);
  const isLastStep = currentStep === steps.length - 1;

  const onPrevClick = () => {
    dispatch(changeStep(currentStep! - 1));
  };

  const onNextClick = () => {
    if (isLastStep) {
      const time = new Date().getTime();
      const correctAnswerCount = steps.reduce(
        (acc, { answers }) =>
          acc +
          +answers.some(({ isSelected, isRight }) => isSelected && isRight),
        0,
      );
      const percentage = (100 * correctAnswerCount) / steps.length;

      dispatch(addScore({ time, percentage }));
      setShowFinalScreen(true);
    } else {
      dispatch(changeStep(currentStep! + 1));
    }
  };

  const onNextQuizClick = () => {
    setShowFinalScreen(false);
    dispatch(getQuiz());
  };

  const selectAnswer = (idx: number) => {
    dispatch(select(idx));
  };

  const onLikeToggle = () => {
    if (updatePhraseStatus === "pending") {
      return;
    }
    dispatch(updatePhrase({ ...question, like: !question!.like }));
    dispatch(toggleLike());
  };

  if (showFinalScreen) {
    return (
      <>
        <div className="mb-4 fs-3">
          Поздравляем! Вы ответили на все вопросы.
        </div>
        <Button onClick={onNextQuizClick} size="lg">
          Следующая викторина
        </Button>
      </>
    );
  }

  return (
    <>
      <Phrase
        {...question}
        className="mb-4"
        onLikeToggle={onLikeToggle}
        showMeanings={false}
      />

      <div className="d-flex flex-column gap-2 mb-5">
        {answers.map(({ text, isRight, isSelected }, idx) => {
          let color = "light";
          if (isAnswerSelected) {
            if (isRight) color = "success";
            else if (isSelected) color = "danger";
          }

          return (
            <Button
              key={idx}
              color={color}
              disabled={isAnswerSelected}
              onClick={() => selectAnswer(idx)}
              size="lg"
            >
              {text}
            </Button>
          );
        })}
      </div>

      <div className="d-flex justify-content-between">
        <ButtonGroup size="lg">
          <Button disabled={currentStep === 0} onClick={onPrevClick} outline>
            Назад
          </Button>
          <Button disabled={!isAnswerSelected} onClick={onNextClick} outline>
            Далее
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};

export default withNavPage(Quiz);
