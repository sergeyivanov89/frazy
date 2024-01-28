import { cloneElement, type FC } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";

import { navigationConfig } from "@/shared/routerConfig";
import styles from "./styles.module.scss";

export type NavbarProps = {
  className?: string;
};

const Navbar: FC<NavbarProps> = ({ className }) => (
  <nav className={className}>
    <ul className="d-flex flex-nowrap p-0 m-0">
      {navigationConfig.map(({ path, icon }) => (
        <li key={path} className={cn("flex-grow-1", styles.item)}>
          <NavLink
            className={({ isActive }) =>
              cn(
                "d-flex justify-content-center fs-1 py-4",
                isActive ? "text-white" : "text-secondary",
              )
            }
            to={path}
          >
            {cloneElement(icon)}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
