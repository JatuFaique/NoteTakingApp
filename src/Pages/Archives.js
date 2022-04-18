import React from "react";
import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";
import NoteCard from "../components/NoteCard";

function Archives() {
  const [userArchives, setUserArchives] = useState([]);
  const [notesUpdated, setNotesUpdates] = useState(false);

  const getArchives = async () => {
    try {
      const res = await axios.get("/api/archives", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      setUserArchives(res.data.archives);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getArchives();
  }, []);

  useEffect(() => {
    getArchives();
  }, [notesUpdated]);

  return (
    <div className="section__notes">
      <div className="notes__heading">Archives</div>
      <div className="section__notes_cards">
        {userArchives.map((item) => {
          return (
            <NoteCard
              data={item}
              isArchived={true}
              setNotesUpdates={setNotesUpdates}
              notesUpdated={notesUpdated}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Archives;
