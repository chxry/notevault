import React, { useState, useContext, ReactNode } from "react";
import { useHistory } from "react-router-dom";

import "../scss/navbar.scss";
import { UserContext } from "../context";
import { redirect } from "../util";

const NavItem = ({ to, children }: { to: string; children: ReactNode }) => {
  const history = useHistory();
  return <li onClick={() => history.push(to)}>{children}</li>;
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user] = useContext(UserContext);

  return (
    <nav>
      <NavItem to="/">
        <h1>NoteVault</h1>
      </NavItem>
      <ul className={menuOpen ? "active" : ""}>
        <NavItem to="/about">About</NavItem>
        {user.authenticated === null ? (
          <p>Loading</p>
        ) : user.authenticated ? (
          <li onClick={() => redirect("/api/auth/logout")}>Logout</li>
        ) : (
          <NavItem to="/login">Login</NavItem>
        )}
      </ul>
      <button
        className={menuOpen ? "hamburger active" : "hamburger"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
};

export default Navbar;
