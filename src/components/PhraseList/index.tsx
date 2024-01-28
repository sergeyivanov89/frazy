import cn from "classnames";
import type { FC } from "react";

import PhraseListItem from "../PhraseListItem";
import type { Phrase } from "@/types";

export type PhraseListProps = {
  items: Phrase[];
  className?: string;
};

const PhraseList: FC<PhraseListProps> = ({ items, className }) => (
  <div className={cn("d-flex flex-column gap-3", className)}>
    {items.map(({ id, name }) => (
      <PhraseListItem key={id} className="fs-3 p-4" to={`/phrase/${id}`}>
        {name}
      </PhraseListItem>
    ))}
  </div>
);

export default PhraseList;
