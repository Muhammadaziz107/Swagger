import "./register.css";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router";

function Register() {
  const elForm = useRef(null);
  const elName = useRef(null);
  const elNick = useRef(null);
  const elPassword = useRef(null);
  const elPhone = useRef(null);
  const elButton = useRef(null);

  let navigate = useNavigate();

  const handleRegister = async evt => {
    try {
      evt.preventDefault();

      const res = await fetch("https://online-excel-heroku.herokuapp.com/auth/register", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          fullName: elName.current.value.trim(),
          username: elNick.current.value.trim(),
          password: elPassword.current.value.trim(),
          phone: elPhone.current.value.trim(),
        }),
      });

      if (res.status === 200) {
        navigate("/");
      } else {
        alert("Something went wrong!!!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="register__wrapper">
        <h2 className="welcome">Sign up</h2>

        <form
          ref={elForm}
          action=""
          method="post"
          className="login__form"
          onSubmit={handleRegister}
        >
          <input
            name="name"
            ref={elName}
            className="input"
            type="text"
            required
            placeholder="Full Name"
          />
          <input
            name="nick"
            ref={elNick}
            className="input"
            type="text"
            required
            placeholder="Username"
          />
          <input
            name="password"
            ref={elPassword}
            className="input"
            type="password"
            required
            placeholder="Password"
          />
          <input
            name="phone"
            ref={elPhone}
            className="input"
            type="phone"
            required
            placeholder="Phone"
          />
          <button ref={elButton} className="register_btn" type="submit">
            Sign up
          </button>
        </form>

        <p className="text">
          Already have an accaunt.
          <NavLink className="signup_link" to="/login">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
