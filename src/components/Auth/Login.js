import "../../styles/Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log(`Identifier: ${identifier}   Password: ${password}`);
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        identifier,
        password,
      });
      const { token, userId, message } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      toast.success(message);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Invalid Credentials");
    }
  };

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
          <div className="submit-wrapper-div">
            <button type="submit" className="submit-button">
              LOGIN
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
