import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../css/Dashboard.css";

const Dashboard = () => {
  const location = useLocation();
  const userRole = location.state?.userRole;
  const handleCheckRoute = async (route) => {
    const response = await axios.get(
      `http://localhost:7001/api/users${route}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { message } = response.data;
    if (message) {
      const splittedMessage = message.split(" ")[1];
      alert(`You have access to ${splittedMessage} route.`);
    }
  };
  const handleLogout = async () => {
    const response = await axios.post("http://localhost:7001/api/auth/logout");
    if (response.status === 200) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };
  return (
    <>
      <div className="dashboardPage">
        <h1>Welcome {userRole}</h1>
        {userRole === "admin" && (
          <div>
            <button onClick={() => handleCheckRoute("/manager")}>
              Check Manager Route
            </button>
            <button onClick={() => handleCheckRoute("/user")}>
              Check User Route
            </button>
          </div>
        )}
        {userRole === "manager" && (
          <div>
            <button onClick={() => handleCheckRoute("/user")}>
              Check User Route
            </button>
          </div>
        )}
        {userRole === "user" && <p>You do not have any routes to check.</p>}
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
