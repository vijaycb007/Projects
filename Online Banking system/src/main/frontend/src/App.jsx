import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Accounts from "./pages/Accounts";
import Transaction from "./pages/Transaction";
import Loans from "./pages/Loans";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./PageNotFound";
import CreateAccount from "./Components/Accounts/CreateAccount";
import PrivateRoute from "./utils/PrivateRoute";
import Homepage from "./pages/Homepage";
import Deposit from "./pages/Deposits";
import RD from "./Components/Deposits/RD";
import FD from "./Components/Deposits/FD";

const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/accounts",
          element: (
            //* PrivateRoute is used to restrict the user if not loggedin
            <PrivateRoute>
              <Accounts />
            </PrivateRoute>
          ),
          children: [
            {
              path: "/accounts/createAccount",
              element: <CreateAccount />,
            },
          ],
        },
        {
          path: "/loans",
          element: (
            <PrivateRoute>
              <Loans />
            </PrivateRoute>
          ),
        },
        {
          path: "/transactions",
          element: (
            <PrivateRoute>
              <Transaction />
            </PrivateRoute>
          ),
        },
        {
          path: "/deposits",
          element: (
            <PrivateRoute>
              <Deposit />
            </PrivateRoute>
          )
        },
        {
          path: "/rd",
          element: <RD />
        },
        {
          path: "/fd",
          element: <FD />
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
