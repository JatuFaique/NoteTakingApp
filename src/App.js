import React from "react";
import MockMan from "mockman-js";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Notes from "./Pages/Notes";
import "./styles/styles.css";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/notes" element={<Notes />} />
        {/* <Route path="/mockman" element={<MockMan />} /> */}
      </Routes>

      {/* <HomePage /> */}
      {/* <Notes /> */}
    </div>
  );
}
