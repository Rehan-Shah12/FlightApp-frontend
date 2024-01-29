import "../../styles/Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {setUser} from "../../store/slices/flightSlice.js"

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        identifier,
        password,
      });
      const { token, userId, user, message } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      dispatch(setUser(user));

      toast.success(message);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Invalid Credentials");
    }
  };

  const handleRegisterNavigation = () => {
    navigate("/register")
  }
  return (
    <div className="Login">
      <div className="content">
        <h1 className="heading">LOGIN</h1>
        <form onSubmit={handleLoginSubmit}>
          <Input
            size="large"
            placeholder="Enter Email or Phone Number"
            onChange={(e) => setIdentifier(e.target.value)}
            className="input"
          />
          <Input
            size="large"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
          />
          <sub onClick={handleRegisterNavigation} className='sub-text'>Not Registered Yet?</sub>
          <div className="submit-wrapper-div">
            <button type="submit" className="submit-button">
              LOGIN
            </button>
          </div>
          <div className="guest-wrapper-div">
            <button onClick={()=> navigate('/')} className="guest-button">
              LOGIN as Guest
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
