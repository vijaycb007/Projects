import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  //* Check if user's credentials are present in local Storage
  let user = JSON.parse(localStorage.getItem("user"));
  //* If present display the website
  //! If not present, only navigate the user to login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
