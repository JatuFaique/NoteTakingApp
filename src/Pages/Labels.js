import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { useNotes } from "../Context/Notescontext";

function Labels() {
  const [notesState, notesDispatch] = useNotes();

  const HomeNotes = notesState.notes?.filter((note) => {
    return note.tags.includes("Home");
  });
  const OfficeNotes = notesState.notes?.filter((note) => {
    return note.tags.includes("Office");
  });
  const SchoolNotes = notesState.notes?.filter((note) => {
    return note.tags.includes("School");
  });

  return (
    <div className="contentbar">
      <div className="section__notes">
        <div className="cards label_cards" style={{ fontSize: "0.6rem" }}>
          <span className="title_Home" style={{ fontSize: "1.2rem" }}>
            #Home
          </span>
          <div className="cards section__notes_cards">
            {HomeNotes.length !== 0 ? (
              HomeNotes?.map((item) => {
                return <NoteCard data={item} />;
              })
            ) : (
              <>
                <h1>No Notes here...</h1>
              </>
            )}
          </div>
        </div>
        <div className="cards label_cards" style={{ fontSize: "0.6rem" }}>
          <span className="title_Office" style={{ fontSize: "1.2rem" }}>
            #Office
          </span>
          <div className="cards section__notes_cards">
            {OfficeNotes.length !== 0 ? (
              OfficeNotes?.map((item) => {
                return <NoteCard data={item} />;
              })
            ) : (
              <>
                <h1>No Notes here...</h1>
              </>
            )}
          </div>
        </div>
        <div className="cards label_cards" style={{ fontSize: "0.6rem" }}>
          <span className="title_School" style={{ fontSize: "1.2rem" }}>
            #School
          </span>
          <div className="cards section__notes_cards">
            {SchoolNotes.length !== 0 ? (
              SchoolNotes?.map((item) => {
                return <NoteCard data={item} />;
              })
            ) : (
              <>
                <h1>No Notes here...</h1>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Labels;
