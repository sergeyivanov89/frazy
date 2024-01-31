import cn from "classnames";
import { format } from "date-fns";
import type { FC, ReactNode } from "react";

import type { Score } from "@/types";

export type ScoreListProps = {
  items: Score[];
  className?: string;
  placeholder: ReactNode;
};

const ScoreList: FC<ScoreListProps> = ({ items, className, placeholder }) => (
  <div className={cn("d-flex flex-column gap-3", className)}>
    {items.length ? (
      items.map(({ id, time, percentage }) => (
        <div
          key={id}
          className={cn(
            "d-flex shadow rounded justify-content-between align-items-center px-4 py-2",
            percentage < 40 && "bg-danger text-bg-danger",
            percentage >= 40 && percentage < 80 && "bg-warning text-bg-warning",
            percentage >= 80 && "bg-success text-bg-success",
          )}
        >
          <div className="fs-5">{format(time, "dd.MM.yyyy HH:mm")}</div>
          <div className="fs-1">{percentage} %</div>
        </div>
      ))
    ) : (
      <div>{placeholder}</div>
    )}
  </div>
);

export default ScoreList;
