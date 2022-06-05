import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div class="navbar">
      <nav class="site-nav">
        <div class="nav-main-heading">Components</div>
        <ul class="list list-stacked nav-comp-section">
          <li class="component-links list-heading">
            <div class="nav-main-heading ">Notes</div>
          </li>
          <li class="component-links">
            <div class="nav-main-heading">Trash</div>
          </li>
          <li class="component-links">
            <div class="nav-main-heading">Labels</div>
          </li>
          <li class="component-links">
            <div class="nav-main-heading">Archived</div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
