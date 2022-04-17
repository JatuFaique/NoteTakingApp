import React, { useState } from "react";

function Notes() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    console.log("hi");
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
          <input type="text" placeholder="Enter title"></input>
          <textarea rows="5" cols="60" name="description"></textarea>
          <button className="btn_submit btn-prim" type="submit">
            {" "}
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default Notes;
