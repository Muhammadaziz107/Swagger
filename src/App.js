import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

import Login from "./Pages/Login/login";
import Home from "./Pages/Home/home";
import Register from "./Pages/Register/register";
import Users from "./Components/Users/users";
import Students from "./Components/Students/students";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/api/users" element={<Users />} />
        <Route path="/api/students" element={<Students />} />
      </Routes>
    </div>
  );
}

export default App;
