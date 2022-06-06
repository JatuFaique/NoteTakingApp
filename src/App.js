import React from "react";
import MockMan from "mockman-js";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Notes from "./Pages/Notes";
import "./styles/styles.css";
import Archives from "./Pages/Archives";
import Trash from "./Pages/Trash";
import Labels from "./Pages/Labels";

export default function App() {
  return (
    <div className="main__container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={[<Navbar />, <HomePage />]}></Route>
        <Route path="/notes" element={[<Navbar />, <Notes />]} />
        <Route path="/labels" element={[<Navbar />, <Labels />]} />
        <Route path="/archives" element={[<Navbar />, <Archives />]} />
        <Route path="/trash" element={[<Navbar />, <Trash />]} />
      </Routes>

      {/* <HomePage /> */}
      {/* <Notes /> */}
    </div>
  );
}
