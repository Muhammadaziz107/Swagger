import "./login.css";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router";

const Login = () => {
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
          <input ref={elUserName} className="input" type="text" placeholder="Username" />
          <input
            ref={elPassword}
            className="input"
            type="password"
            placeholder="Password"
          />
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
