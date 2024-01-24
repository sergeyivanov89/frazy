import { Nav, Navbar, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

import { navigationConfig } from "@/shared/routerConfig";

import type { FC } from "react";

export type NavbarCustomProps = {
  className?: string;
};

const NavbarCustom: FC<NavbarCustomProps> = ({ className }) => (
  <Navbar color="dark" className={className}>
    <Nav className="gap-3">
      {navigationConfig.map(({ path, text }) => (
        <NavItem key={path}>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-white" : "text-secondary"
            }
            to={path}
          >
            {text}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  </Navbar>
);

export default NavbarCustom;
