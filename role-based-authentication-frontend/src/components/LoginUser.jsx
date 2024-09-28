import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/LoginUser.css";

const LoginUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7001/api/auth/login",
        {
          username,
          password,
        }
      );

      const token = response.data.token;
      const role = response.data.role;

      localStorage.setItem("token", token);

      let roleResponse;
      if (role === "admin") {
        roleResponse = await axios.get(
          "http://localhost:7001/api/users/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role === "manager") {
        roleResponse = await axios.get(
          "http://localhost:7001/api/users/manager",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role === "user") {
        roleResponse = await axios.get(
          "http://localhost:7001/api/users/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        setErrorMessage("Invalid role. Please check your credentials.");
        return;
      }

      const userRole = roleResponse.data.message.split(" ")[1];
      navigate("/dashboard", { state: { userRole } });
    } catch (error) {
      console.log(error);
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="loginUserPage">
        <h1>Login</h1>
        <form className="loginUserPageForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}{" "}
        {/* Error message */}
      </div>
    </>
  );
};

export default LoginUser;
