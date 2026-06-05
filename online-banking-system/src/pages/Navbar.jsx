import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

  let user = JSON.parse(localStorage.getItem("user"));

  //* logout functionality
  let handleLogout = () => {
    localStorage.removeItem("user");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  return (
    <nav className="bg-blue-500 h-15 w-100% flex justify-between text-white">
      <aside className="flex h-15 w-100% place-content-center gap-4 items-center pl-3">
        <i className="fa-solid fa-building-columns text-4xl"></i>
        <h1 className="text-3xl font-bold">Mysuru City Bank</h1>
      </aside>
      <aside className="h-15 w-210 flex place-content-evenly items-center text-md font-semibold">
        <NavLink
          //* isActive is a function in NavLink which is used to display some css for the active page
          className={({ isActive }) =>
            isActive
              ? "navLink border-b-2 rounded-none border-white"
              : "navLink"
          }
          to="/"
        >
          Home Page
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "navLink border-b-2 rounded-none border-white"
              : "navLink"
          }
          to="/accounts"
        >
          Accounts
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "navLink border-b-2 rounded-none border-white"
              : "navLink"
          }
          to="/transactions"
        >
          Transactions
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "navLink border-b-2 rounded-none border-white"
              : "navLink"
          }
          to="/loans"
        >
          Loans
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "navLink border-b-2 rounded-none border-white"
              : "navLink"
          }
          to="/deposits"
        >
          Deposits
        </NavLink>
        {/* Checking if the user is logged in */}
        {user ? (
          //* If logged in -> display user details
          <div className="w-70 flex justify-evenly items-center">
            <span className="font-bold text-xl">
              Hii! {user.username.toUpperCase()}
            </span>
            <button className="cancel text-sm" onClick={handleLogout}>
              Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        ) : (
          <div>
            {/* If user is not logged in display -> login and register button */}
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "navLink border-b-2 rounded-none border-white"
                  : "navLink"
              }
              to="/login"
            >
              Login
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "navLink border-b-2 rounded-none border-white"
                  : "navLink"
              }
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
