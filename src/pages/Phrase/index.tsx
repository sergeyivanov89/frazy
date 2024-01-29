import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "reactstrap";
import cn from "classnames";

import { getPhrase, updatePhrase } from "@/redux/thunks";
import styles from "./styles.module.scss";
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

  const onLikeToggle = () => {
    if (updateStatus === "pending") {
      return;
    }
    dispatch(updatePhrase({ ...data, like: !data!.like }));
  };

  if (status === "pending") {
    return <Spinner>Loading...</Spinner>;
  }

  if (status === "error") {
    return "Some error occurred.";
  }

  if (!data) {
    return null;
  }

  const { like, name, meanings } = data;

  return (
    <div className={cn("grid shadow rounded p-5", styles.root)}>
      <div className="g-col-10 fs-1">{name}</div>
      <div className="g-col-2">
        <div
          className="d-flex justify-content-end"
          onClick={onLikeToggle}
          role="button"
        >
          <FontAwesomeIcon
            className={cn("fs-1", styles.icon)}
            icon={like ? faHeartSolid : faHeartRegular}
          />
        </div>
      </div>
      <div
        className={cn(
          "g-col-12 w-100 d-flex align-items-center justify-content-center",
          styles.image,
        )}
      >
        <div>Скоро здесь появится изображение</div>
      </div>
      <ul className={cn("g-col-12 p-0 m-0 fs-4", styles.meanings)}>
        {meanings.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Phrase;
