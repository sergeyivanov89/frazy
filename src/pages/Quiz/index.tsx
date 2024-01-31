import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Spinner } from "reactstrap";

import Phrase from "@/components/Phrase";
import withNavPage from "../withNavPage";
import { getQuiz } from "@/redux/thunks";
import { selectAnswer as select, changeStep } from "@/redux/slices";
import type { AppDispatch, RootState } from "@/redux/types";

const Quiz = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { steps, status, currentStep } = useSelector(
    (state: RootState) => state.quiz,
  );

  useEffect(() => {
    dispatch(getQuiz());
  }, [dispatch]);

  if (status === "pending") {
    return <Spinner>Loading...</Spinner>;
  }

  if (status === "error") {
    return "Some error occurred.";
  }

  if (!steps.length) {
    return null;
  }

  const onPrevClick = () => {
    dispatch(changeStep(currentStep! - 1));
  };

  const onNextClick = () => {
    dispatch(changeStep(currentStep! + 1));
  };

  const selectAnswer = (idx: number) => {
    dispatch(select(idx));
  };

  const step = steps[currentStep!];
  const { question, answers } = step;
  const isAnswerSelected = answers.some(({ isSelected }) => isSelected);
  const isLastStep = currentStep === steps.length - 1;

  return (
    <>
      <Phrase {...question} className="mb-4" />

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
          <Button
            disabled={!isAnswerSelected || isLastStep}
            onClick={onNextClick}
            outline
          >
            Далее
          </Button>
        </ButtonGroup>

        <Button size="lg">Начать заново</Button>
      </div>
    </>
  );
};

export default withNavPage(Quiz);
