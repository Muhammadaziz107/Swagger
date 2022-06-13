import "./login.css";
import { NavLink, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const elMessage = useRef(null);

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

  // ======

  const elUserName = useRef(null);
  const elPassword = useRef(null);

  const navigate = useNavigate();

  const handleLogin = async evt => {
    try {
      evt.preventDefault();

      const res = await fetch("https://online-excel-heroku.herokuapp.com/auth/token", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: elUserName.current.value.trim(),
          password: elPassword.current.value.trim(),
        }),
      });

      if (res.status === 200) {
        const { data } = await res.json();

        const token = data.data.accessToken;
        window.localStorage.setItem("token", JSON.stringify(token));
        navigate("/");
      } else {
        elMessage.current.textContent = "Something went wrong!!!";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <h2 className="welcome">Sign in</h2>

        <form action="" method="post" className="login__form" onSubmit={handleLogin}>
          <input
            required
            ref={elUserName}
            className="input"
            type="text"
            placeholder="Username"
          />
          <input
            ref={elPassword}
            className="input"
            type="password"
            required
            placeholder="Password"
          />

          <h3 ref={elMessage}></h3>
          <button className="login_btn" type="submit">
            Sign in
          </button>
        </form>

        <p className="text">
          Don't have an accaunt.
          <NavLink className="signup_link" to="/register">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
