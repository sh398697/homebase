import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import API_URL from "../apiConfig.js";
import "./FamilyLogin.css";

function FamilyLogin({ handleSuccessfulParentLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    fetch(`${API_URL}/parentlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        // Set the cookie with an expiration time of 24 hours
        Cookies.set("parent_token", data.token, { expires: 1 });
        console.log(data);
        console.log("login successful")
        handleSuccessfulParentLogin(data);
        // Set the coach object in the context and navigate to home
        navigate("/familyhome");

      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Invalid email or password");
      });
  };

  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default FamilyLogin;
