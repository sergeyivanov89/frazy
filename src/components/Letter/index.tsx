import { memo } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import type { FC, PropsWithChildren } from "react";
import type { LinkProps } from "react-router-dom";

import styles from "./styles.module.scss";

export type LetterProps = PropsWithChildren<LinkProps>;

const Letter: FC<LetterProps> = ({ children, className, ...rest }) => {
  return (
    <Link
      className={cn(
        styles.root,
        "d-flex justify-content-center text-decoration-none",
        className,
      )}
      {...rest}
    >
      <div className="align-self-center fs-1 text-uppercase">{children}</div>
    </Link>
  );
};

export default memo(Letter);
