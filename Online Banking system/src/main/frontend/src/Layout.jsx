import React from "react";
import Navbar from "./pages/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* On every page display navbar and the dedicated component */}
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
