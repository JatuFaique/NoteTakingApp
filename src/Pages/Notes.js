import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./Notes.css";
import { useNotes } from "../Context/Notescontext";
import NoteCard from "../components/NoteCard";
import { useFilter } from "../Context/Filtercontext";
import { sortByPriority } from "../utils/sortByPriority";
import JoditEditor from "jodit-react";
import { sortByRecent } from "../utils/sortByRecent";

function Notes() {
  const reference = useRef(null);
  const [notesState, notesDispatch] = useNotes();
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [color, setColor] = useState("white");
  const [priority, setPriority] = useState("HIGH");
  const [tags, setTags] = useState([]);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var dateTime = date;

  const config = {
    readonly: false,
  };

  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    let note = {
      createdTime: new Date().getTime(),
      title,
      noteText,
      date: dateTime,
      tags,
      color,
      priority,
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

  const handlePriority = (e) => {
    console.log("pp", e.target.value);
    setPriority(e.target.value);
  };

  const [filterState, filterDispatch] = useFilter();
  const sortedByPriority = sortByPriority(
    notesState.notes,
    filterState.filterByPriority
  );

  const sortedByRecent = sortByRecent(
    sortedByPriority,
    filterState.filterByRecent
  );

  const getAllNotes = async () => {
    try {
      const encT = localStorage.getItem("token");
      console.log(encT);
      const res = await axios.get("/api/notes", {
        headers: {
          authorization: encT,
        },
      });
      if (res.status === 200 || res.status === 201) {
        console.log("resp = ", res.data);
        notesDispatch({
          type: "SUCCESS_ADD_TO_NOTES",
          payload: res.data.notes,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className="contentbar">
      <div className="section__notes">
        <div className="notes__heading">
          <label>
            <h2>
              The Office <em>Notes</em>
            </h2>
          </label>
          {/* <h3 className="p-1">Create your notes here!</h3> */}
        </div>
        <div
          className="section__notes__input"
          style={{
            padding: "1.2rem",
            boxShadow: "0px 4px 25px -4px rgb(196 196 196)",
          }}
        >
          <form
            className="notes__input"
            onSubmit={(e) => {
              handleOnFormSubmit(e);
            }}
          >
            <input
              required
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <JoditEditor
              ref={reference}
              value={noteText}
              config={config}
              tabIndex={1}
              onBlur={(value) => setNoteText(value)}
            />
            {/* <textarea
              rows="5"
              cols="60"
              name="description"
              value={noteText}
              onChange={(e) => {
                setNoteText(e.target.value);
              }}
            ></textarea> */}
            <div className="tags">
              <label>
                <input
                  type="checkbox"
                  name="Home"
                  onChange={handleTags}
                ></input>
                🎓Home
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Office"
                  onChange={handleTags}
                ></input>
                👔Office
              </label>
              <label>
                <input
                  type="checkbox"
                  name="School"
                  onChange={handleTags}
                ></input>
                📏School
              </label>
              <span>
                <select onChange={(e) => handlePriority(e)} value={priority}>
                  <option name="priority" value="HIGH">
                    HIGH
                  </option>
                  <option name="priority" value="MEDIUM">
                    MEDIUM
                  </option>
                  <option name="priority" value="LOW">
                    LOW
                  </option>
                </select>
              </span>
            </div>

            <div className="colors">
              <label className="color_blue">
                <span>Blue</span>
                <input
                  type="radio"
                  id="color"
                  name="color"
                  value="color_blue"
                  onChange={handlecolor}
                ></input>
              </label>

              <label className="color_red">
                <span>Red</span>
                <input
                  type="radio"
                  id="color"
                  name="color"
                  value="color_red"
                  onChange={handlecolor}
                ></input>
              </label>

              <label className="color_green">
                <span>Green</span>
                <input
                  type="radio"
                  id="color"
                  name="color"
                  value="color_green"
                  onChange={handlecolor}
                ></input>
              </label>
            </div>

            <button className="btn_submit btn-prim" type="submit">
              {" "}
              Create
            </button>
          </form>
        </div>
        <div className="cards">
          <p>Filter</p>
          <span>
            <select
              onChange={(e) => {
                filterDispatch({
                  type: "FILTER_BY_HIGHTOLOW",
                  payload: e.target.value,
                });
              }}
              value={filterState.filterByPriority}
            >
              <option name="priority" value="HIGH_TO_LOW">
                HIGH to Low
              </option>
              <option name="priority" value="LOW_TO_HIGH">
                Low to High
              </option>
            </select>
            <select
              onChange={(e) => {
                filterDispatch({
                  type: "FILTER_BY_RECENT",
                  payload: e.target.value,
                });
              }}
              value={filterState.filterByRecent}
            >
              <option name="priority" value="RECENT_FIRST">
                RECENT_FIRST
              </option>
              <option name="priority" value="OLDEST_FIRST">
                OLDEST_FIRST
              </option>
            </select>
          </span>
        </div>
        <div className="cards">
          {sortedByRecent?.map((note) => {
            return <NoteCard data={note} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Notes;
