import React from "react";
import Navbar from "../Navbar/navbar";
import "./users.css";
import { useState, useEffect, useRef } from "react";

function Users() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const elModalBtn = useRef(null);
  const elDiv = useRef(null);

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
  const handleShowMoreInfo = async evt => {
    try {
      const res = await fetch(
        `https://online-excel-heroku.herokuapp.com/auth/get/${evt.target.dataset.id}`,
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
        setUser([data]);
      }
      elDiv.current.classList.add("modal--active");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [user]);

  // ==========+delete user+===========

  const deleteUser = async evt => {
    try {
      const res = await fetch(
        `https://online-excel-heroku.herokuapp.com/auth/delete/${evt.target.dataset.id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseModal = evt => {
    elDiv.current.classList.remove("modal--active");
  };

  return (
    <>
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
                  <th>No</th>
                  <th>User Fullname</th>
                  <th>User Phone</th>
                  <th>More info</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map(e => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.fullName}</td>
                      <td>{e.phone}</td>
                      <td className="button-td">
                        <button
                          ref={elModalBtn}
                          className="open-modal"
                          onClick={handleShowMoreInfo}
                          data-id={e.id}
                        >
                          more
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* ===+modal+=== */}

      <div className="user_modal" ref={elDiv} onClick={handleCloseModal}>
        <div className="user_modal__wrapper">
          <div className="user_modal__heading-box">
            <h3>All informations</h3>
          </div>

          {user &&
            user.map(e => (
              <div className="user_modal__body" key={e.id}>
                <h2>ID: {e.id}</h2>
                <h2>Name: {e.fullName}</h2>
                <h2>Username: @{e.username}</h2>
                <h2>
                  Password: <p className="password-user">{e.password}</p>
                </h2>
                <h2>Phone: {e.phone}</h2>
                <div className="btn-box">
                  <button
                    type="button"
                    className="user-delete-btn"
                    data-id={e.id}
                    onClick={deleteUser}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Users;
