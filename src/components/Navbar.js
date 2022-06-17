import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authcontext";
import { useNotes } from "../Context/Notescontext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [authState, authDispatch] = useAuth();
  const [notesState, notesDispatch] = useNotes();

  return (
    <div class="navbar">
      <nav class="site-nav">
        <div class="nav-main-heading"></div>
        <ul class="list list-stacked nav-comp-section">
          <li className="component-links list-heading">
            Hello user
            {authState.login ? (
              <i
                onClick={() => {
                  authDispatch({
                    type: "LOGOUT",
                  });
                  notesDispatch({
                    type: "CLEAR_NOTES",
                  });
                  navigate("/");
                }}
                class="btn fa-solid fa-right-from-bracket"
              ></i>
            ) : (
              <></>
            )}
          </li>
          <li className="component-links ">
            <NavLink
              className={({ isActive }) => (isActive ? "addAct" : "")}
              to="/notes"
            >
              <div class="nav-main-heading ">
                <span>
                  <i class="fa-solid fa-bullseye"></i>
                </span>
                Notes
              </div>
            </NavLink>
          </li>

          <li class="component-links">
            <NavLink
              to="/trash"
              className={({ isActive }) => (isActive ? "addAct" : "")}
            >
              <div class="nav-main-heading">
                <span>
                  <i class="fa-solid fa-bullseye"></i>
                </span>
                Trash
              </div>
            </NavLink>
          </li>
          <li class="component-links">
            <NavLink
              to="/labels"
              className={({ isActive }) => (isActive ? "addAct" : "")}
            >
              <div class="nav-main-heading">
                <span>
                  <i class="fa-solid fa-bullseye"></i>
                </span>
                Labels
              </div>
            </NavLink>
          </li>
          <li class="component-links">
            <NavLink
              to="/archives"
              className={({ isActive }) => (isActive ? "addAct" : "")}
            >
              <div class="nav-main-heading">
                <span>
                  <i class="fa-solid fa-bullseye"></i>
                </span>
                Archived
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
