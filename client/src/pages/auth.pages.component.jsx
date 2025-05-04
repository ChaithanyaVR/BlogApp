import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar.component";
import { DataContext } from "../context/DataProvider";


const PrivateRoute = () => {
  const { isAuthenticated } = useContext(DataContext);
  const token = sessionStorage.getItem("accessToken");

  return isAuthenticated && token ? (
    <>
        <Navbar/>
    </>
  ) : (
    <>
    <Navbar/>
    <Navigate to="account" replace />
    </>
  );
};

export default PrivateRoute;
