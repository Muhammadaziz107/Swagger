import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

import Login from "./Pages/Login/login";
import Home from "./Pages/Home/home";
import Register from "./Pages/Register/register";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://online-excel-heroku.herokuapp.com/auth/list", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // setData(res);

      if (res.status == 200) {
        const request = await res.json();
        const data = request.data.data;
        setData(data);
      }
    };

    fetchData();
  });

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>username</th>
            <th>password</th>
            <th>fullName</th>
            <th>phone</th>
            <th>picture</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map(e => (
              <tr key={e.id}>
                <td>{e.username}</td>
                <td>{e.password}</td>
                <td>{e.fullName}</td>
                <td>{e.phone}</td>
                <td>{e.picture}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
