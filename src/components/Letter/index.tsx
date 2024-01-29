import { memo } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import type { FC, PropsWithChildren } from "react";
import type { LinkProps } from "react-router-dom";

import styles from "./styles.module.scss";

export type LetterProps = PropsWithChildren<LinkProps>;

const Letter: FC<LetterProps> = ({ children, className, ...rest }) => (
  <Link
    className={cn("position-relative rounded-3", styles.root, className)}
    {...rest}
  >
    <div className="position-absolute w-100 h-100 top-0 end-0 d-flex justify-content-center fs-1 text-uppercase">
      <div className="align-self-center">{children}</div>
    </div>
  </Link>
);

export default memo(Letter);
