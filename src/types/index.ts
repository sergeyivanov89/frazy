type JSONValueType = string | number | boolean | null | undefined;

export type JSONType = {
  [key: string]: JSONValueType | JSONValueType[] | JSON;
};

export type Phrase = {
  id: number;
  like: boolean;
  letter: string;
  name: string;
  meanings: string[];
};

export type AddedPhrase = Omit<Phrase, "id">;
export type UpdatedPhrase = Partial<Phrase>;
