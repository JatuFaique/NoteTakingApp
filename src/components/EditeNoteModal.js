import axios from "axios";
import JoditEditor from "jodit-react";
import React from "react";
import { useRef, useState } from "react";
import { useNotes } from "../Context/Notescontext";

function EditeNoteModal({ data, modalHandler }) {
  const [notesState, notesDispatch] = useNotes();
  const [title, setTitle] = useState(data.title);
  const [noteText, setNoteText] = useState("");
  const [tags, setTags] = useState(data.tags);
  const reference = useRef(null);
  const config = {
    readonly: false,
  };

  const handleEditPost = async (note) => {
    try {
      notesDispatch({
        type: "REQUEST_ADD_TO_NOTES",
      });

      const encT = localStorage.getItem("token");
      console.log(encT);
      const res = await axios.post(
        `/api/notes/${data._id}`,
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
      console.log(err);
      notesDispatch({
        type: "FAILED_ADD_TO_NOTES",
      });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    let note = {
      title,
      noteText,
    };
    handleEditPost(note);
    modalHandler();
  };

  return (
    <section class="mod dis-flex-col s-75">
      <div class="sec-header p-3">
        <div class="mod-title">Edit</div>
        <i onClick={modalHandler} class="fas fa-times"></i>
      </div>
      <div class="sec-body p-3">
        <form
          className="notes__input"
          onSubmit={(e) => {
            handleEditSubmit(e);
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
            value={data.noteText}
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
          <div className="label_cards">
            {tags?.map((item, index) => {
              return (
                <span
                  onClick={() => {
                    setTags((prevValue) =>
                      prevValue.filter((tag) => tag !== item)
                    );
                  }}
                  className={`title_${item}`}
                >
                  {item} X
                </span>
              );
            })}
          </div>
          <div class="sec-footer p-3">
            <button class="btn-secd" type="submit">
              Save
            </button>
            <button onClick={modalHandler} class="btn-secd s-outline gr">
              Close
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditeNoteModal;
