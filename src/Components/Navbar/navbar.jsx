import React from "react";
import "./navbar.css";
import { NavLink, useParams } from "react-router-dom";
import Logo from "../../Assets/Images/logo.png";
import Users from "../../Assets/Images/users.png";
import Students from "../../Assets/Images/students.png";
import settings from "../../Assets/Images/settings.png";
import { useState, useEffect } from "react";

function Navbar() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://online-excel-heroku.herokuapp.com/auth/get/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status == 200) {
        const request = await res.json();
        const data = request.data.data;
        setData(data);
      }
    };

    fetchData();
  });

  return (
    <div className="navbar">
      <div className="navbar_wrapper">
        <div className="profile_info_box">
          <img
            className="profile_img"
            src={Logo}
            alt="site logo"
            width="150"
            height="150"
          />

          <p className="profile_username">@username</p>
          <p className="profile_fullname">John Doe</p>
        </div>

        <nav className="navbar__nav">
          <ul className="navbar__nav__list">
            <span className="line"></span>

            <li className="navbar__nav__list__item">
              <NavLink to="/api/users" className="navbar__nav__list__item__link">
                <img src={Users} alt="users img" width="20" height="20" />
                <p className="navbar__nav__list__item__link__text">Users</p>
              </NavLink>
            </li>
            <span className="line"></span>

            <li className="navbar__nav__list__item">
              <NavLink to="/api/students" className="navbar__nav__list__item__link">
                <img src={Students} alt="users img" width="20" height="20" />
                <p className="navbar__nav__list__item__link__text">Students</p>
              </NavLink>
            </li>
            <span className="line"></span>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
