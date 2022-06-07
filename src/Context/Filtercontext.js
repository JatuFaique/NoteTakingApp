import React, { createContext, useContext, useReducer } from "react";

// import notesReducer, { initialState } from "../reducers/notesReducer";
import filterReducer, { initialState } from "../reducers/filterReducer";

// export const NotesContext = createContext();
export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  return (
    <FilterContext.Provider value={useReducer(filterReducer, initialState)}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
