import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  console.log("Token", token);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
