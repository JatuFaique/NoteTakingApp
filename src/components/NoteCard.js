import axios from "axios";
import React from "react";
import "./NoteCard.css";

function NoteCard({ data, setNotesUpdates, notesUpdated, isArchived }) {
  const handleDelete = async () => {
    if (isArchived) {
      try {
        const res = await axios.delete(`/api/archives/delete/${data._id}`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        //   console.log(res.data);
        setNotesUpdates(!notesUpdated);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.delete(`/api/notes/${data._id}`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        //   console.log(res.data);
        setNotesUpdates(!notesUpdated);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleArchive = async () => {
    if (isArchived) {
      try {
        const res = await axios.post(
          `/api/archives/restore/${data._id}`,
          {
            data,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(res.data);
        setNotesUpdates(!notesUpdated);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post(
          `/api/notes/archives/${data._id}`,
          {
            data,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(res.data);
        setNotesUpdates(!notesUpdated);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div class="card card-vertical">
      <div class="card-content">
        <div class="card-header">
          <h4>{data.title}</h4>
          <h5>{data.date}</h5>
        </div>
        <div class="card-text">
          <p>{data.noteText}</p>
          <div>
            <span>A</span>
            <span>A</span>
            <span>A</span>
          </div>
        </div>
      </div>
      <div class="btn-list">
        <button>Archive</button>
        <button>Trash</button>
      </div>
    </div>
  );
}

export default NoteCard;
