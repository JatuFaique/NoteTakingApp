import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { useNotes } from "../Context/Notescontext";

function Trash() {
  const [notesState, notesDispatch] = useNotes();

  console.log(notesState.trash);

  return (
    <div className="contentbar">
      <div className="section__notes">
        <div className="notes__heading">
          {notesState?.trash.length === 0 ? (
            <div className="trash__note">
              <p>No Trash Yet!</p>
            </div>
          ) : (
            <div className="trash__note">
              <p>🔴 All Trash Here</p>
              <h5>you can restore your notes from here!</h5>
            </div>
          )}
        </div>
        <div className="cards section__notes_cards">
          {notesState?.trash.map((item) => {
            return <NoteCard data={item} isTrashed={true} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Trash;
