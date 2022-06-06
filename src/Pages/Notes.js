import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNotes } from "../Context/Notescontext";
import NoteCard from "../components/NoteCard";

function Notes() {
  const [notesState, notesDispatch] = useNotes();
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [color, setColor] = useState("white");
  const [tags, setTags] = useState([]);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var dateTime = date;

  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    let note = {
      title,
      noteText,
      date: dateTime,
      tags,
      color,
    };

    console.log("hi", note);
    handlePost(note);
    //reset all fields

    setNoteText("");
    setTitle("");
  };

  // useEffect(() => {
  //   handleGet();
  // }, [notesUpdated]);

  const handlePost = async (note) => {
    try {
      notesDispatch({
        type: "REQUEST_ADD_TO_NOTES",
      });

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
      if (res.status === 200 || res.status === 201) {
        console.log("resp = ", res.data);
        notesDispatch({
          type: "SUCCESS_ADD_TO_NOTES",
          payload: res.data.notes,
        });
      }
      // console.log(res.data);
      // setUserNotes(res.data.notes);
      // return res.data.notes;
      // //console.log(res.data);
    } catch (err) {
      cartDispatch({
        type: "FAILED_ADD_TO_NOTES",
      });
    }
  };

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

  const handlecolor = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="contentbar">
      <div className="section__notes">
        <div className="homePage__intro">
          Get Started with notes app
          <h3 className="">
            Your notes taking app, has features such as Archive, Labels
          </h3>
        </div>
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
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <textarea
              rows="5"
              cols="60"
              name="description"
              value={noteText}
              onChange={(e) => {
                setNoteText(e.target.value);
              }}
            ></textarea>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <label>Home</label>
              <input type="checkbox" name="Home" onChange={handleTags}></input>
              <label>office</label>
              <input
                type="checkbox"
                name="Office"
                onChange={handleTags}
              ></input>
              <label>School</label>
              <input
                type="checkbox"
                name="School"
                onChange={handleTags}
              ></input>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <label>Blue</label>
              <input
                type="radio"
                id="color"
                name="color"
                value="blue"
                onChange={handlecolor}
              ></input>
              <label>Red</label>
              <input
                type="radio"
                id="color"
                name="color"
                value="red"
                onChange={handlecolor}
              ></input>
              <label>Green</label>
              <input
                type="radio"
                id="color"
                name="color"
                value="green"
                onChange={handlecolor}
              ></input>
            </div>

            <button className="btn_submit btn-prim" type="submit">
              {" "}
              Create
            </button>
          </form>
        </div>
        <div className="cards">
          {notesState.notes.map((note) => {
            return <NoteCard data={note} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Notes;
