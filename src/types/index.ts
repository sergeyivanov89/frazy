type JSONValueType = string | number | boolean | null | undefined;

export type JSONType = {
  [key: string]: JSONValueType | JSONValueType[] | JSON;
};

export type Phrase = {
  id: number;
  letter: string;
  name: string;
  meanings: string[];
};
