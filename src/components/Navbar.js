import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="site-nav">
        <div className="nav-main-heading">Components</div>
        <ul className="nav-comp-section">
          <li className="component-links">
            <div
              className="nav-main-heading"
              onClick={() => {
                navigate("/notes");
              }}
            >
              Notes
            </div>
          </li>
          <li className="component-links">
            <div className="nav-main-heading">Trash</div>
          </li>
          <li className="component-links">
            <div className="nav-main-heading">Labels</div>
          </li>
          <li className="component-links">
            <div
              className="nav-main-heading"
              onClick={() => {
                navigate("/archives");
              }}
            >
              Archived
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
