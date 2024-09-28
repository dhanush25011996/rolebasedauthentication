import React from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
  return (
    <>
      <div className="homePage">
        <h1>Welcome to Role Based Authentication!</h1>
        <div className="homePageButtons">
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
