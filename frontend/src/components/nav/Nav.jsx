import React from "react";
import "./nav.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Nav = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>

      {cookies.access_token ? (
        <>
          <Link to="/create">Create</Link>
          <Link to="/saved">Saved</Link>
          <div
            className="nav-button"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </div>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Nav;
