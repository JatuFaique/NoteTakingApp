import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "../Context/Authcontext";
import axios from "axios";

function Login() {
  const [authState, authDispatch] = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);
  const [isError, setIsError] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const signUpToggle = () => {
    setShowSignUp(!showSignUp);
    console.log(showSignUp);
  };

  const handleSingupData = async (firstname, lastname, email, password) => {
    const getValues = { firstname, lastname, email, password };
    try {
      authDispatch({
        type: "REQUEST_SIGNUP",
      });
      const res = await axios.post("/api/auth/signup", getValues);
      if (res.status == 200 || res.status == 201) {
        localStorage.setItem("token", res.data.encodedToken);
        const token = localStorage.getItem("token");
        // console.log(res.data);
        const email = res.data.createdUser.email;
        const userInfo = { email, token };
        authDispatch({
          type: "SIGNUP_SUCCESS",
          payload: userInfo,
        });
        console.log("uiui", userInfo);
        // navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginData = async (email, password) => {
    const getLoginValues = { email, password };
    console.log(getLoginValues.email, getLoginValues.password);
    try {
      const res = await axios.post("/api/auth/login", {
        email: getLoginValues.email,
        password: getLoginValues.password,
      });
      console.log("ii", res.data);
      if (res.status == 200 || res.status == 201) {
        localStorage.setItem("token", res.data.encodedToken);
        const token = localStorage.getItem("token");
        const userInfo = { email, token };
        authDispatch({
          type: "SUCCESS_LOGIN",
          payload: userInfo,
        });
        // navigate("/notes");
      }
    } catch (error) {
      // console.log(error.response);
      setIsError(error.response.data.errors);
    }
  };

  const handleData = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const loginHandler = (e) => {
    e.preventDefault();

    const { email, password } = loginData;
    handleLoginData(email, password);
  };

  const signUpHandler = (e) => {
    e.preventDefault();

    const { firstname, lastname, email, password } = loginData;
    handleSingupData(firstname, lastname, email, password);
  };

  const test = {
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
  };

  const useDemoValues = (e) => {
    e.preventDefault();
    setLoginData({
      ...loginData,
      email: test.email,
      password: test.password,
    });
  };

  return (
    <div class="login__container logincomponent">
      <div class="wrapper">
        <div class="left__wrap">
          {showSignUp ? (
            <>
              <main class="auth-container">
                <div class="auth-box p-1">
                  <p>{String(isError)}</p>
                  <p>Please Sign in</p>

                  <form class="userForm">
                    <section class="input-box">
                      <div class="input-field">
                        <input
                          name="firstname"
                          value={loginData.firstname}
                          id="email-field"
                          type="text"
                          pattern=".*\S.*"
                          onChange={handleData}
                          required
                        />
                        <label for="email-field" class="placeholder">
                          Enter firstname
                        </label>
                      </div>
                    </section>
                    <section class="input-box">
                      <div class="input-field">
                        <input
                          name="lastname"
                          value={loginData.lastname}
                          id="email-field"
                          type="text"
                          pattern=".*\S.*"
                          onChange={handleData}
                          required
                        />
                        <label for="email-field" class="placeholder">
                          Enter lastname
                        </label>
                      </div>
                    </section>
                    <section class="input-box">
                      <div class="input-field">
                        <input
                          name="email"
                          value={loginData.email}
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
                          value={loginData.password}
                          required
                          onChange={handleData}
                        />
                        <label for="password-field" class="placeholder">
                          Password
                        </label>
                      </div>
                    </section>

                    <button
                      class="btn-prim"
                      type="submit"
                      onClick={signUpHandler}
                    >
                      Sign Up
                    </button>
                  </form>
                  <button class="btn-secd" onClick={signUpToggle}>
                    Already Have Account
                  </button>
                </div>
              </main>
            </>
          ) : (
            <>
              <main class="auth-container">
                <div class="auth-box p-1">
                  <p>{String(isError)}</p>
                  <p>Please Sign in</p>

                  <form class="userForm">
                    <section class="input-box">
                      <div class="input-field">
                        <input
                          name="email"
                          value={loginData.email}
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
                          value={loginData.password}
                          required
                          onChange={handleData}
                        />
                        <label for="password-field" class="placeholder">
                          Password
                        </label>
                      </div>
                    </section>

                    <button
                      class="btn-prim"
                      type="submit"
                      onClick={loginHandler}
                    >
                      Sign In
                    </button>
                  </form>
                  <button class="btn-secd" onClick={signUpToggle}>
                    Create a New Account
                  </button>
                  <span>
                    <button
                      class="btn-prim"
                      type="submit"
                      onClick={useDemoValues}
                    >
                      User Demo Cred
                    </button>
                  </span>
                </div>
              </main>
            </>
          )}
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
