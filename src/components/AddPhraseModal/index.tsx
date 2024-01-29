import { Modal, Button, Form, Input, InputGroup } from "reactstrap";
import { useState, type FC, type ChangeEvent, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import styles from "./styles.module.scss";
import type { AddedPhrase } from "@/types";

export type AddPhraseModalProps = {
  isOpen: boolean;
  toggle: (phrase: AddedPhrase | null) => void;
};

const AddPhraseModal: FC<AddPhraseModalProps> = ({ isOpen, toggle }) => {
  const [name, setName] = useState<AddedPhrase["name"]>("");
  const [meaning, setMeaning] = useState<AddedPhrase["meanings"][0]>("");
  const [meanings, setMeanings] = useState<AddedPhrase["meanings"]>([]);

  const collectPhrase = (): AddedPhrase | null => {
    if (!name || !meanings.length) {
      return null;
    }
    return {
      name,
      meanings,
      letter: name[0].toLowerCase(),
    };
  };

  const phrase = collectPhrase();

  const onToggle = () => {
    toggle(null);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (phrase) {
      toggle(phrase);
      setName("");
      setMeaning("");
      setMeanings([]);
    }
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onMeaningChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMeaning(e.target.value);
  };

  const onMeaningAdd = () => {
    setMeanings((arr) => [...arr, meaning]);
    setMeaning("");
  };

  const removeMeaning = (idx: number) => () => {
    setMeanings((arr) => arr.toSpliced(idx, 1));
  };

  return (
    <Modal isOpen={isOpen} toggle={onToggle}>
      <div className="p-4">
        <div className="position-relative fs-2 mb-4 text-center">
          Добавление в словарь
          <div
            className={cn(
              "position-absolute top-0 end-0 mt-n4 p-2",
              styles.close,
            )}
            onClick={onToggle}
            role="button"
          >
            <FontAwesomeIcon className="d-block fs-2" icon={faXmark} />
          </div>
        </div>

        <Form name="add-phrase" onSubmit={onSubmit}>
          <div className="mb-4">
            <InputGroup size="lg">
              <Input
                name="name"
                onChange={onNameChange}
                placeholder="Название"
                required
                value={name}
              />
            </InputGroup>
          </div>

          <div className="mb-4">
            <InputGroup size="lg">
              <Input
                name="meaning"
                onChange={onMeaningChange}
                placeholder="Значение"
                value={meaning}
              />
              <Button disabled={!meaning} onClick={onMeaningAdd}>
                Добавить
              </Button>
            </InputGroup>
          </div>

          <ul className="mb-4 p-0">
            {meanings.map((item, idx) => (
              <li key={idx} className="d-flex gap-2 align-items-center">
                <div onClick={removeMeaning(idx)} role="button">
                  <FontAwesomeIcon className="fs-2" icon={faXmark} />
                </div>
                <div className="fs-3">{item}</div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-end gap-3">
            <Button disabled={!phrase} size="lg" type="submit">
              Добавить
            </Button>
            <Button onClick={onToggle} size="lg">
              Отмена
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddPhraseModal;
