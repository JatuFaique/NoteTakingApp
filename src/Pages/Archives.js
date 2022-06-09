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
        {notesState?.archives.length === 0 ? (
          <div className="trash__note">
            <p>No Archive Yet!</p>
          </div>
        ) : (
          <div className="trash__note">
            <p>🔃 All Archive Here</p>
            <h5>you can restore your notes from here!</h5>
          </div>
        )}
        <div className="cards section__notes_cards">
          {notesState.archives.length !== 0 ? (
            notesState.archives.map((item) => {
              return <NoteCard data={item} isArchived={true} />;
            })
          ) : (
            <>
              <p>No Notes here...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Archives;
