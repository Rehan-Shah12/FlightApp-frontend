import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Input, Button } from "antd";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log(`Email: ${email}   Password: ${password}`);
    try {
      console.log("Enter");
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });
      const { token, userId } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      navigate("/register");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <Input
          size="large"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <input
          placeholder="Enter the Email"
          type="email"
          
        /> */}
        <Input
          size="large"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <input placeholder="Enter the Password" type="password" /> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
