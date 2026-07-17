import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  let navigate = useNavigate();

  let user = JSON.parse(localStorage.getItem("user"));

  //* logout functionality
  let handleLogout = () => {
    let logout = window.confirm("Are you sure?")
    if (!logout) return;
    toast.error("Logging You Out!");
    setTimeout(() => {
      localStorage.removeItem("user");
      navigate("/");
    }, 2500);
  };

  return (
    <nav className="navbar-gradient h-15 w-100% flex justify-between text-white">
      {/* Logo Contanier */}
      <aside className="flex h-15 w-100% place-content-center gap-4 items-center pl-3">
        <i className="fa-solid fa-building-columns text-4xl"></i>
        <h1 className="text-3xl font-bold">Mysuru City Bank</h1>
      </aside>
      {/* Navbar Links */}
      <aside className="h-15 w-210 flex place-content-evenly items-center text-md font-semibold">
        <NavLink
          className={({ isActive }) => (isActive ? "nav-pill-active" : "nav-pill")}
          to="/"
        >
          Home Page
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "nav-pill-active" : "nav-pill")}
          to="/accounts"
        >
          Accounts
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "nav-pill-active" : "nav-pill")}
          to="/transactions"
        >
          Transactions
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "nav-pill-active" : "nav-pill")}
          to="/loans"
        >
          Loans
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "nav-pill-active" : "nav-pill")}
          to="/deposits"
        >
          Deposits
        </NavLink>

        {/* Checking if the user is logged in */}
        {/* If logged in display user and logout button */}
        {user ? (
          <div className="w-70 flex justify-evenly items-center">
            <span className="font-semibold text-sm flex items-center gap-2">
              <span className="nav-avatar">
                {user.username.charAt(0).toUpperCase()}
              </span>
              {user.username}
            </span>
            <button className="nav-logout" onClick={handleLogout}>
              Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        ) : (
          // else login and register button
          <div className="flex gap-2">
            <NavLink
              className={({ isActive }) => (isActive ? "nav-pill-active" : "nav-pill")}
              to="/login"
            >
              Login
            </NavLink>

            <NavLink
              className={({ isActive }) => (isActive ? "nav-pill-active" : "nav-pill")}
              to="/register"
            >
              Register
            </NavLink>
          </div>
        )}
      </aside>
    </nav>
  );
};

export default Navbar;