import "../../styles/Register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
        name,
        phone,
        email,
        password,
      });
      const {message } = res.data;
      toast.success(message);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    
    if (error?.response?.data?.error) {
      toast.error(error?.response?.data?.error);
    } else {
      
      toast.error("Register Error");
    }
  }
  };
  const handleRegisterNavigation = () => {
    navigate("/login")
  }


  return (
    <div className="Register">
      <div className="content">
        <h1 className="heading">REGISTER</h1>
        <form onSubmit={handleRegisterSubmit}>
          <Input
            size="large"
            placeholder="Enter Full Name"
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <Input
            size="large"
            placeholder="Enter Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            className="input"
          />
          <Input
            size="large"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type='email'
          />
          <Input
            size="large"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"

          />
          <sub onClick={handleRegisterNavigation} className='sub-text'>Already a User?</sub>
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
