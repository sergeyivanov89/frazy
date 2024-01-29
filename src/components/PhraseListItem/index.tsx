import { memo, type FC, type PropsWithChildren } from "react";
import { Link, type LinkProps } from "react-router-dom";
import cn from "classnames";

import styles from "./styles.module.scss";

export type PhraseListItemProps = PropsWithChildren<LinkProps>;

const PhraseListItem: FC<PhraseListItemProps> = ({
  children,
  className,
  ...rest
}) => (
  <Link className={cn("rounded-3", styles.root, className)} {...rest}>
    {children}
  </Link>
);

export default memo(PhraseListItem);
