import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
   color: "#32e0c4",
};

export default function Nav() {
   return (
      <>
         <h1> Hacker News</h1>
         <nav className="row space-between">
            <ul className="row nav">
               <li>
                  <NavLink
                     to="/"
                     exact
                     activeStyle={activeStyle}
                     className="link nav-link"
                  >
                     Top
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/new"
                     activeStyle={activeStyle}
                     className="nav-link"
                  >
                     New
                  </NavLink>
               </li>
            </ul>
         </nav>
      </>
   );
}
