import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import type { FC } from "react";

import { updatePhrase } from "@/redux/thunks";
import styles from "./styles.module.scss";
import type { Phrase } from "@/types";
import type { AppDispatch, RootState } from "@/redux/types";

export type PhraseProps = Partial<Phrase> & {
  className?: string;
  showMeanings?: boolean;
};

const Phrase: FC<PhraseProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const updateStatus = useSelector(
    (state: RootState) => state.dictionary.update.status,
  );
  const { className, ...data } = props;

  const onLikeToggle = () => {
    if (updateStatus === "pending") {
      return;
    }
    dispatch(updatePhrase({ ...data, like: !data!.like }));
  };

  const { like, name, meanings } = data;

  return (
    <div className={cn("grid shadow rounded p-5", styles.root, className)}>
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
      {meanings && (
        <ul className={cn("g-col-12 p-0 m-0 fs-4", styles.meanings)}>
          {meanings.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Phrase;
