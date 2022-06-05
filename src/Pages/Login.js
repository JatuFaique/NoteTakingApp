import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "../Context/Authcontext";

function Login() {
  const { handleLoginData } = useAuth();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState("");
  const handleData = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginHandler = (e) => {
    console.log("hell");
    const { email, password } = login;
    e.preventDefault();
    if (email !== "" && password !== "") {
      handleLoginData(email, password);
    } else {
      setIsError("Please fill all the field");
    }
    setIsError("");
  };

  const test = {
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
  };

  const useDemoValues = () => {
    setLogin({
      ...login,
      email: test.email,
      password: test.password,
    });
  };

  return (
    <div class="login__container logincomponent">
      <div class="wrapper">
        <div class="left__wrap">
          <main class="auth-container">
            <div class="auth-box p-1">
              <p>Please Sign in</p>
              <form class="userForm">
                <section class="input-box">
                  <div class="input-field">
                    <input
                      name="email"
                      value={login.email}
                      id="email-field"
                      type="text"
                      pattern=".*\S.*"
                      onChange={handleData}
                      required
                    />
                    <label for="email-field" class="placeholder">
                      Enter Email
                    </label>
                  </div>
                </section>
                <section>
                  <div class="input-field">
                    <input
                      id="email-field"
                      name="password"
                      type="text"
                      pattern=".*\S.*"
                      value={login.password}
                      required
                      onChange={handleData}
                    />
                    <label for="password-field" class="placeholder">
                      Password
                    </label>
                  </div>
                </section>
                <button class="btn-prim" type="submit" onClick={useDemoValues}>
                  User Demo Cred
                </button>
                <button class="btn-prim" type="submit" onClick={loginHandler}>
                  Sign In
                </button>
              </form>
              <button class="btn-secd" onClick="{signUpToggle}">
                Create a New Account
              </button>
            </div>
          </main>
        </div>
        <div class="right__wrap">
          <h1>Get Your Important Stuff Done!</h1>
          <img
            src="https://i.ibb.co/LRYrWYz/undraw-Taking-notes-re-bnaf.png"
            alt="undraw-Taking-notes-re-bnaf"
          />
          <h3>Get Your Important Stuff Done!</h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
