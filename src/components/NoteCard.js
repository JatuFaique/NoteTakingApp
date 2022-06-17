import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNotes } from "../Context/Notescontext";
import EditeNoteModal from "./EditeNoteModal";
import "./NoteCard.css";

function NoteCard({ data, isArchived, isTrashed }) {
  const [notesState, notesDispatch] = useNotes();
  const [editNoteModal, setEditNoteModal] = useState(false);

  const handleArchive = async (data) => {
    try {
      notesDispatch({
        type: "REQUEST_ADD_TO_ARCHIVE",
      });

      const encT = localStorage.getItem("token");
      const res = await axios.post(
        `/api/notes/archives/${data._id}`,
        {
          note: data,
        },
        {
          headers: {
            authorization: encT,
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        console.log("resp = ", res.data);
        notesDispatch({
          type: "SUCCESS_ADD_TO_ARCHIVE",
          payload: res.data,
        });
      }
    } catch (err) {
      notesDispatch({
        type: "FAILED_ADD_TO_ARCHIVE",
      });
    }
  };

  const handleRestoreArchive = async (data) => {
    try {
      const encT = localStorage.getItem("token");
      const res = await axios.post(
        `/api/archives/restore/${data._id}`,
        {},
        {
          headers: {
            authorization: encT,
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        console.log("resp = ", res.data);
        notesDispatch({
          type: "RESTORE_FROM_ARCHIVE",
          payload: res.data,
        });
      }
    } catch (err) {
      notesDispatch({
        type: "FAILED_ADD_TO_ARCHIVE",
      });
    }
  };

  const handleDeleteArchive = async (data) => {
    try {
      const encT = localStorage.getItem("token");
      const res = await axios.delete(`/api/archives/delete/${data._id}`, {
        headers: {
          authorization: encT,
        },
      });
      if (res.status === 200 || res.status === 201) {
        console.log("resp = ", res.data);
        notesDispatch({
          type: "REMOVE_FROM_ARCHIVE",
          payload: res.data,
        });
      }
    } catch (err) {
      notesDispatch({
        type: "FAILED_ADD_TO_ARCHIVE",
      });
    }
  };

  const handleTrash = async (data) => {
    try {
      notesDispatch({
        type: "REQUEST_ADD_TO_TRASH",
      });

      const encT = localStorage.getItem("token");
      const res = await axios.post(
        `/api/notes/trash/${data._id}`,
        {
          note: data,
        },
        {
          headers: {
            authorization: encT,
          },
        }
      );
      console.log("hello trash");
      if (res.status === 200 || res.status === 201) {
        console.log("resp = ", res.data);
        notesDispatch({
          type: "SUCCESS_ADD_TO_TRASH",
          payload: res.data,
        });
      }
    } catch (err) {
      notesDispatch({
        type: "FAILED_ADD_TO_TRASH",
      });
    }
  };

  const handleDeleteTrash = async (data) => {
    try {
      const encT = localStorage.getItem("token");
      const res = await axios.delete(`/api/trash/delete/${data._id}`, {
        headers: {
          authorization: encT,
        },
      });
      if (res.status === 200 || res.status === 201) {
        console.log("resp = ", res.data);
        notesDispatch({
          type: "REMOVE_FROM_TRASH",
          payload: res.data,
        });
      }
    } catch (err) {
      notesDispatch({
        type: "FAILED_ADD_TO_TRASH",
      });
    }
  };

  const handleRestoreTrash = async (data) => {
    try {
      const encT = localStorage.getItem("token");
      const res = await axios.post(
        `/api/trash/restore/${data._id}`,
        {},
        {
          headers: {
            authorization: encT,
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        console.log("resp = ", res.data);
        notesDispatch({
          type: "RESTORE_FROM_TRASH",
          payload: res.data,
        });
      }
    } catch (err) {
      notesDispatch({
        type: "FAILED_ADD_TO_TRASH",
      });
    }
  };

  const getListofButtons = () => {
    if (isArchived) {
      return (
        <>
          <button onClick={() => handleRestoreArchive(data)}> Restore </button>
          <button onClick={() => handleDeleteArchive(data)}> Delete </button>
        </>
      );
    } else if (isTrashed) {
      return (
        <>
          <button onClick={() => handleDeleteTrash(data)}> Delete </button>
          <button onClick={() => handleRestoreTrash(data)}>Restore</button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={() => handleArchive(data)}> Archive </button>
          <button onClick={() => handleTrash(data)}> Delete </button>
          <i
            onClick={() => setEditNoteModal(true)}
            class="fa-solid fa-ellipsis-vertical"
          ></i>
        </>
      );
    }
  };

  const modalHandler = () => {
    setEditNoteModal(false);
  };

  return (
    <div class={`card card-vertical ${data.color} `}>
      <div class="card-content">
        <div class="card-header">
          <h4>{data.title}</h4>
          <h5>{data.date}</h5>
        </div>
        <div class="card-text">
          <p>
            <span>Priority:</span>
            {data.priority.toLowerCase()}
          </p>
          <div dangerouslySetInnerHTML={{ __html: data.noteText }}></div>
          <div className="label_cards">
            {data.tags?.map((item, index) => {
              return <span className={`title_${item}`}>#{item}</span>;
            })}

            {/* <span>A</span>
            <span>A</span> */}
          </div>
        </div>
      </div>
      <div class="btn-list">{getListofButtons()}</div>
      {editNoteModal ? (
        <>
          <div className="overlay">
            <EditeNoteModal data={data} modalHandler={modalHandler} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default NoteCard;
