import React, { createContext, useContext, useReducer } from "react";

import notesReducer, { initialState } from "../reducers/notesReducer";
export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  return (
    <NotesContext.Provider value={useReducer(notesReducer, initialState)}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
