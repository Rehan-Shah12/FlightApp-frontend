import React from "react";
import "../../styles/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };
  return (
    <header className="header-container">
      <div className="name">Contegris Virtual Airways</div>
      <div>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
