import axios from "axios";
import React from "react";

function NoteCard({ data, setNotesUpdates }) {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/notes/${data._id}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      console.log(res.data);
      setNotesUpdates(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="note__card p-0-5"
      style={{
        backgroundColor: "#ffffff",
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
      <div class="text-sm text-grey ">Tags: Home , Office , Self</div>
      <div>
        <i class="fa-solid fa-trash delete-icon" onClick={handleDelete}>
          X
        </i>
      </div>
    </div>
  );
}

export default NoteCard;
