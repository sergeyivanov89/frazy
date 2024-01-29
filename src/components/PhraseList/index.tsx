import cn from "classnames";
import type { FC, ReactNode } from "react";

import PhraseListItem from "../PhraseListItem";
import type { Phrase } from "@/types";

export type PhraseListProps = {
  items: Phrase[];
  className?: string;
  placeholder: ReactNode;
};

const PhraseList: FC<PhraseListProps> = ({ items, className, placeholder }) => (
  <div className={cn("d-flex flex-column gap-3", className)}>
    {items.length ? (
      items.map(({ id, name }) => (
        <PhraseListItem key={id} className="fs-3 p-4" to={`/phrases/${id}`}>
          {name}
        </PhraseListItem>
      ))
    ) : (
      <div>{placeholder}</div>
    )}
  </div>
);

export default PhraseList;
