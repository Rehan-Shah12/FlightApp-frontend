import React from "react";
import "../../styles/Header.css";
import { useNavigate } from "react-router-dom";
import { setUser, setFilteredFlights, setAllFlights, setActiveFlight } from "../../store/slices/flightSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.flight.user);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    // Remove items from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Dispatch actions to reset Redux state
    dispatch(setUser(null));
    dispatch(setFilteredFlights(null));
    dispatch(setAllFlights(null));
    dispatch(setActiveFlight(null));

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <header className="header-container">
      <div className="name" onClick={() => navigate('/')}>Contegris Virtual Airways</div>
      <div>
        {userId && token && user ? (
          <><span className="username">{user?.name}</span>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button></>
          
        ) : (
          
          <button onClick={() => navigate("/login")} className="login-button">
            Login
          </button>
          
        )}
      </div>
    </header>
  );
};

export default Header;
