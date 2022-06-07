import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AuthProvider } from "./Context/Authcontext";
import { BrowserRouter as Router } from "react-router-dom";
import { NotesProvider } from "./Context/Notescontext";
import { FilterProvider } from "./Context/Filtercontext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NotesProvider>
        <FilterProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </FilterProvider>
      </NotesProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
