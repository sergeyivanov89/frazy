type JSONValueType = string | number | boolean | null | undefined;

export type JSONType = {
  [key: string]: JSONValueType | JSONValueType[] | JSON;
};

export type Phrase = {
  id: number;
  like: boolean;
  name: string;
  meanings: string[];
};

export type QuizQuestion = Partial<Phrase>;

export type QuizAnswer = {
  text: string;
  isRight: boolean;
  isSelected: boolean;
};

export type AddedPhrase = Omit<Phrase, "id">;
export type UpdatedPhrase = Partial<Phrase>;
