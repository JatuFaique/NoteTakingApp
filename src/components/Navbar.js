import React from "react";

function Navbar() {
  return (
    <div>
      <nav className="site-nav">
        <div className="nav-main-heading">Components</div>
        <ul className="nav-comp-section">
          <li className="component-links">
            <div className="nav-main-heading">Notes</div>
          </li>
          <li className="component-links">
            <div className="nav-main-heading">Trash</div>
          </li>
          <li className="component-links">
            <div className="nav-main-heading">Labels</div>
          </li>
          <li className="component-links">
            <div className="nav-main-heading">Archived</div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
