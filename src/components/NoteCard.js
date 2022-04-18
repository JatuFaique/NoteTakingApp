import axios from "axios";
import React from "react";

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
    <div
      className="note__card p-0-5"
      style={{
        backgroundColor: data.color,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <div>
        <div class="text-m ">{data.title}</div>
        <div class="text-sm">{data.noteText}</div>
      </div>
      <div class="text-sm text-grey ">
        {data.tags.map((tag) => {
          return <span>{tag} ,</span>;
        })}
      </div>
      <button className="btn-secd" onClick={handleArchive}>
        {isArchived ? "Restore" : "Archive"}
      </button>
      <div>
        <i class="fa-solid fa-trash delete-icon" onClick={handleDelete}>
          X
        </i>
      </div>
    </div>
  );
}

export default NoteCard;
