import React, { useState, useEffect } from "react";
import "./login.css";
import Dash from "./dashboard";

const Form = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between Login and Signup forms
  const [showPasswords, setShowPasswords] = useState({
    login: false,
    signup: false,
  }); // Manage password visibility
  const [userData, setUserData] = useState([]); // Store user data from API
  const [username, setUsername] = useState(""); // Track entered username
  const [password, setPassword] = useState(""); // Track entered password
  const [authenticated, setAuthenticated] = useState(false); // Check if user is authenticated

  const API_URL = "https://api.sheetbest.com/sheets/2b8ac7bf-14b2-43ca-8a70-077ada351198/tabs/UsernamesAndPasswords";

  // Fetch user data from the sheet
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Toggle between Login and Signup forms
  const toggleForm = () => setIsSignup(!isSignup);

  // Toggle password visibility
  const togglePasswordVisibility = (type) => {
    setShowPasswords((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // Handle Login
  const handleLogin = () => {
    const user = userData.find(
      (u) =>
        u["Username "] === username.trim() &&
        u["Passwords"] === password.trim()
    );

    if (user) {
      setAuthenticated(true);
    } else {
      alert("Incorrect username or password");
    }
  };

  // Handle Signup
  const handleSignup = () => {
    const userExists = userData.some(
      (u) => u["Username "] === username.trim()
    );

    if (userExists) {
      alert("Username already exists. Please choose a different username.");
    } else {
      const newUser = {
        "Username ": username.trim(),
        Passwords: password.trim(),
        "Total Investment": "0",
        "Total Portfolio Value": "0",
        "Total P&L": "0",
        "Today's P&L": "0",
      };

      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then(() => {
          alert("User created successfully!");
          setUserData((prev) => [...prev, newUser]); // Update local state
          setIsSignup(false); // Switch to login form
        })
        .catch((error) => console.error("Error creating user:", error));
    }
  };

  // Render Dashboard if authenticated
  if (authenticated) {
    return <Dash userName = {username}/>;
  }

  return (
    <section className={`container forms ${isSignup ? "show-signup" : ""}`}>
      {/* Login Form */}
      <div className="form login">
        <div className="form-content">
          
          <header>Login</header>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="login-container">
    <img src="/logo.png" alt="Logo" className="logo" />
    {/* Existing login form code */}
</div>
            
            <div className="field input-field">
              <input
                type="text"
                placeholder="Username"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="field input-field">
              <input
                type={showPasswords.login ? "text" : "password"}
                placeholder="Password"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`bx ${showPasswords.login ? "bx-show" : "bx-hide"} eye-icon`}
                onClick={() => togglePasswordVisibility("login")}
              ></i>
            </div>
            <div className="form-link">
              <a href="#" className="forgot-pass">
                Forgot password?
              </a>
            </div>
            <div className="field button-field">
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="line"></div>
          <div className="form-link">
            <span>
              Don't have an account?{" "}
              <a href="#" className="link signup-link" onClick={toggleForm}>
                Signup
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Signup Form */}
      <div className="form signup">
        <div className="form-content">
          <header>Signup</header>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
          >
            <div className="field input-field">
              <input
                type="text"
                placeholder="Username"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="field input-field">
              <input
                type={showPasswords.signup ? "text" : "password"}
                placeholder="Create password"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="field button-field">
              <button type="submit">Signup</button>
            </div>
          </form>
          <div className="line"></div>
          <div className="form-link">
            <span>
              Already have an account?{" "}
              <a href="#" className="link login-link" onClick={toggleForm}>
                Login
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Form;
