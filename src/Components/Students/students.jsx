import React from "react";
import Navbar from "../Navbar/navbar";
import "./students.css";
import { useState, useEffect } from "react";

function Students() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `https://online-excel-heroku.herokuapp.com/student/list`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          const request = await res.json();
          const data = request.data.data;
          setData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudents();
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
            <thead>
              <tr>
                <th>Full Name</th>
                <th>University Name</th>
                <th>Graduation Year</th>
                <th>More info</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map(e => (
                  <tr key={e.id}>
                    <td>{e.fullName}</td>
                    <td>{e.universityName}</td>
                    <td>{e.graduationYear}</td>
                    <button className="open-student-modal">more</button>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;
