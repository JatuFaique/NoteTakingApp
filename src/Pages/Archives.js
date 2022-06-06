import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { useNotes } from "../Context/Notescontext";

function Archives() {
  const [notesState, notesDispatch] = useNotes();

  return (
    <div className="contentbar">
      <div className="section__notes">
        <div className="notes__heading">Archives</div>
        <div className="cards section__notes_cards">
          {notesState.archives.map((item) => {
            return <NoteCard data={item} isArchived={true} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Archives;
