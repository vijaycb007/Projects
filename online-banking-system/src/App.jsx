import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import Accounts from "./pages/Accounts";
import Transaction from "./pages/Transaction";
import Loans from "./pages/Loans";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Deposits from "./pages/Deposits";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./PageNotFound";
import CreateAccount from "./Components/Accounts/CreateAccount";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
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
              <Deposits />
            </PrivateRoute>
          ),
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
