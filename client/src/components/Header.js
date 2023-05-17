import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {



  return (
    <div>
      <div className="header-container">
        <ul className="header-menu">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/account">My Account</NavLink>
          </li>
          <li>
            <NavLink to="/teams">Teams</NavLink>
          </li>
          <li>
            <NavLink to="/messages">Messages</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
