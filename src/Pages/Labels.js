import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { useNotes } from "../Context/Notescontext";

function Labels() {
  const [notesState, notesDispatch] = useNotes();

  return (
    <div className="contentbar">
      <div className="section__notes">
        <div className="notes__heading">Labels</div>
        <div className="cards section__notes_cards">
          {notesState.notes.map((item) => {
            return <NoteCard data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Labels;
