import React from "react";
import "./styles/App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register.js";
import Homepage from "./components/Homepage.js";
import PrivateRoutes from "./utils/PrivateRoute.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Homepage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
