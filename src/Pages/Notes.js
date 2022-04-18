import axios from "axios";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";

function Notes() {
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [note, setNote] = useState([]);
  const [userNotes, setUserNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [notesUpdated, setNotesUpdates] = useState(false);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var dateTime = date;
  useEffect(() => {
    setNote({
      title: title,
      noteText: noteText,
      date: dateTime,
      tags: tags,
    });
  }, [noteText, title, tags]);

  const handleOnFormSubmit = (e) => {
    e.preventDefault();

    // const getNote = { title, noteText };
    // setNote({
    //   title: title,
    //   noteText: noteText,
    // });

    handlePost(note);
  };

  useEffect(() => {
    handleGet();
  }, [notesUpdated]);

  const handleGet = async () => {
    try {
      const res = await axios.get("/api/notes", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      setUserNotes(res.data.notes);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePost = async (note) => {
    try {
      const encT = localStorage.getItem("token");
      console.log(encT);
      const res = await axios.post(
        "/api/notes",
        { note },
        {
          headers: {
            authorization: encT,
          },
        }
      );
      console.log(res.data);
      setUserNotes(res.data.notes);
      return res.data.notes;
      //console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const bgcolor = "#bcbcbc";

  const handleTags = (e) => {
    console.log("hi", e.target.name);
    if (e.target.checked) {
      setTags((tags) => {
        return [...tags, e.target.name];
      });
    } else {
      setTags((tags) => {
        return tags.filter((item) => item !== e.target.name);
      });
    }
  };

  return (
    <div className="section__notes">
      <div className="notes__heading">
        <h1 className="p-1">Note</h1>
        <h3 className="p-1">Create your notes here!</h3>
      </div>
      <div className="section__notes__input">
        <form
          className="notes__input"
          onSubmit={(e) => {
            handleOnFormSubmit(e);
          }}
        >
          <input
            type="text"
            placeholder="Enter title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <textarea
            rows="5"
            cols="60"
            name="description"
            onChange={(e) => {
              setNoteText(e.target.value);
            }}
          ></textarea>
          <label>Home</label>
          <input type="checkbox" name="Home" onChange={handleTags}></input>
          <label>office</label>
          <input type="checkbox" name="Office" onChange={handleTags}></input>
          <label>School</label>
          <input type="checkbox" name="School" onChange={handleTags}></input>
          <button className="btn_submit btn-prim" type="submit">
            {" "}
            Create
          </button>
        </form>
      </div>
      <div className="section__notes_cards">
        {userNotes.map((note) => {
          return <NoteCard data={note} setNotesUpdates={setNotesUpdates} />;
        })}
      </div>
    </div>
  );
}

export default Notes;
