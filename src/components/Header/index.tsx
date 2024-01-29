import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import AddPhraseModal from "../AddPhraseModal";
import { addPhrase } from "@/redux/thunks";
import styles from "./styles.module.scss";
import type { AddedPhrase } from "@/types";
import type { RootState, AppDispatch } from "@/redux/types";

const Header = () => {
  const title = useSelector((state: RootState) => state.app.header);
  const dispath = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onButtonClick = () => {
    setIsModalOpen((value) => !value);
  };

  const toggleModal = (phrase: AddedPhrase | null) => {
    setIsModalOpen((value) => !value);
    if (phrase) {
      dispath(addPhrase(phrase));
    }
  };

  return (
    <header className="bg-dark d-flex justify-content-center align-items-center py-2 px-5 text-light fs-1 text-center">
      <div className={cn("flex-grow-1", styles.title)}>{title}</div>
      <div
        className={cn(
          "d-flex justify-content-center align-items-center fs-1",
          styles.button,
        )}
        onClick={onButtonClick}
        role="button"
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <AddPhraseModal isOpen={isModalOpen} toggle={toggleModal} />
    </header>
  );
};

export default Header;
