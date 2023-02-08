import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  let auth = localStorage.getItem("token");
  console.log(auth);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
