import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import AccountsCard from "../Components/Accounts/AccountsCard";
import api from "../utils/api";

const Accounts = () => {
  let [accounts, setAccounts] = useState([]);

  //* Get the current route information (URL path, search params, hash, etc.)
  let location = useLocation();

  //* Fetch accounts from backend whenever route changes
  useEffect(() => {
    api.get(`/accounts`).then((res) => {
      setAccounts(res.data);
    });
  }, [location.pathname]);
  return (
    <section>
      {/*//* Only render the "Create Account" button and accounts list when the current route is NOT "/accounts/createAccount" */}
      {location.pathname !== "/accounts/createAccount" && (
        <>
          <aside className="h-15 display-flex justify-end p-5">
            <button>
              <NavLink to="/accounts/createAccount" className="primaryButton">
                Create Account
              </NavLink>
            </button>
          </aside>
          <div className="flex flex-wrap gap-6 p-6">
            {/* Check if accounts present in the database/backend */}
            {/* If not present */}
            {accounts.length === 0 ? (
              <p className="text-2xl font-semibold text-blue-500">
                No Account present, Create Account to View Accounts
              </p>
            ) : (
              //* If present
              accounts.map((acc) => {
                return (
                  //* Create a card for each account created
                  <div
                    key={acc.id}
                    className="h-65 w-90 rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:scale-105 transition-transform duration-300"
                  >
                    <AccountsCard acc={acc} />
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
      {/* Display the accounts in Accounts page */}
      <Outlet />
    </section>
  );
};

export default Accounts;
