import React from "react";
import Navbar from "../Navbar/navbar";
import "./users.css";
import { useState, useEffect } from "react";

function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://online-excel-heroku.herokuapp.com/auth/list", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          const request = await res.json();
          const data = request.data.data;
          setData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {}, [data]);
  return (
    <div className="users">
      <div className="users__wrapper">
        <div className="fixed_navbar">
          <Navbar />
        </div>

        <div className="allUsers">
          <h3 className="allUsers-info">All Users Info</h3>
          <table>
            <tr>
              <th>Username</th>
              <th>User Fullname</th>
              <th>User Password</th>
              <th>User Phone</th>
            </tr>
            {data &&
              data.map(e => (
                <tr key={e.id}>
                  <td>{e.username}</td>
                  <td>{e.fullName}</td>
                  <td>{e.password}</td>
                  <td>{e.phone}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
