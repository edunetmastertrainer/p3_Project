import React from "react";
import "./CSS/Admin.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddSong from "../Components/Addsong/AddSong";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addsong" element={<AddSong />} />
      </Routes>
    </div>
  );
};

export default Admin;
