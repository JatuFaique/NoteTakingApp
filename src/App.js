import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import Notes from "./Pages/Notes";
import "./styles/styles.css";

export default function App() {
  return (
    <div>
      <Navbar />
      {/* <HomePage /> */}
      <Notes />
    </div>
  );
}
