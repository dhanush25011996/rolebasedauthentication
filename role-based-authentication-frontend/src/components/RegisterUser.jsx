import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/RegisterUser.css";

const RegisterUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Select Role");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7001/api/auth/register", {
        username: username,
        password: password,
        role: role.toLowerCase(),
      });
      console.log(response.data);
      alert("Registration successful");
      setUsername("");
      setPassword("");
      setRole("Selecy Role");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="registerUserPage">
        <h1>Register</h1>
        <form className="registerUserPageForm">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select onChange={(e) => setRole(e.target.value)} value={role}>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
          <button onClick={handleSubmit}>Register</button>
          <div className="alreadyRegistered">
            <p>Already Registered?</p>
            <Link className="alreadyRegisteredLink" to={"/login"}>Login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterUser;
