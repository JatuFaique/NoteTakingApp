import React, { useState } from "react";
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
  return (
    <div className="section__login">
      <main class="auth-container">
        <div class="auth-box">
          <div class="text-m text-center">Please Sign In</div>
          <div>Enter Test UserName : adarshbalika@gmail.com</div>
          <div>Enter Test Password : adarshBalika123</div>
          <section class="input-box disp-flex">
            <div class="input-field">
              <input
                name="email"
                id="email-field"
                type="email"
                onChange={handleData}
              />
              <label for="email-field" class="placeholder"></label>
            </div>
          </section>
          <section>
            <div class="input-field">
              <input
                name="password"
                id="password-field"
                type="password"
                onChange={handleData}
              />
              <label for="password-field"></label>
            </div>
          </section>
          <button
            class="btn-prim"
            onClick={(e) => {
              loginHandler(e);
            }}
          >
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
