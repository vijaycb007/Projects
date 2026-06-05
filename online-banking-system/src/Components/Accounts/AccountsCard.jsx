import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AccountsAction from "./AccountAction";

const AccountCard = ({ acc }) => {
  //* Type of transaction
  let [type, setType] = useState("");

  return (
    //* Accounts Container
    <div className="display-flex-col gap-4">
      {/* Accounts */}
      <aside className=" w-full bg-blue-500 px-5 py-2 text-white">
        <div className="flex place-content-between items-center">
          {/* Name */}
          <p className="font-bold text-lg">{acc.AccName}</p>
          {/* Type */}
          <p className="border-2 py-1 px-2 rounded-full bg-blue-400 text-sm">
            {acc.Acctype}
          </p>
        </div>
        {/* Account no */}
        <p className="font-semibold">Account No: {acc.id}</p>
        {/* balance */}
        <p className="font-bold text-4xl">₹ {acc.InitialBalanace}</p>
        <p>Avaliable Balance</p>
      </aside>
      {/* Buttons container */}
      <div className="h-25 flex flex-wrap justify-evenly items-center">
        {/* Deposit */}
        <button
          onClick={() => {
            setType("deposit");
          }}
          className="accountsCardButton"
        >
          Deposit
        </button>
        {/* Withdraw */}
        <button
          onClick={() => {
            setType("withdraw");
          }}
          className="accountsCardButton"
        >
          Withdraw
        </button>
        {/* Transfer */}
        <button
          onClick={() => {
            setType("transfer");
          }}
          className="accountsCardButton"
        >
          Transfer
        </button>
        {/* Delete */}
        <button
          onClick={() => {
            setType("delete");
          }}
          className="accountsCardButton bg-red-500 text-white border-red-500 hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      {/* this code conditionally renders the AccountsAction component only when type is not empty */}
      {type && (
        //* Passing the props
        <AccountsAction type={type} acc={acc} onClose={() => setType("")} />
      )}
      <ToastContainer />
    </div>
  );
};

export default AccountCard;
