import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AccountAction from "./AccountAction";

const AccountCard = ({ acc }) => {
  //* Type of transaction
  let [type, setType] = useState("");

  return (
    //* Accounts Container
    <div className="display-flex-col gap-4">
      {/* Accounts */}
      <div className="accountCardShell">
        <div className="accountCardTop">
          <div className="accountCardGlow"></div>
          <div className="flex justify-between items-start relative">
            <div>
              {/* Name */}
              <p className="font-bold text-lg text-white">{acc.AccName}</p>
              {/* Account no */}
              <p className="text-white/50 text-xs mt-0.5 tracking-widest">
                {acc.AccountNumber}
              </p>
            </div>
            {/* Type */}
            <p className="accountCardBadge">{acc.Acctype}</p>
          </div>
        </div>

        {/* balance */}
        <div className="accountBalancePlate">
          <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1">
            Available Balance
          </p>
          <p className="font-extrabold text-3xl text-gray-900">
            ₹ {acc.InitialBalance}
          </p>
        </div>

        {/* Buttons container */}
        <div className="accountActionsRow">
          {/* Deposit */}
          <button
            onClick={() => {
              setType("deposit");
            }}
            className="accountActionBtn"
          >
            <span className="text-base">↓</span>
            <span className="text-[11px] font-medium">Deposit</span>
          </button>
          {/* Withdraw */}
          <button
            onClick={() => {
              setType("withdraw");
            }}
            className="accountActionBtn"
          >
            <span className="text-base">↑</span>
            <span className="text-[11px] font-medium">Withdraw</span>
          </button>
          {/* Transfer */}
          <button
            onClick={() => {
              setType("transfer");
            }}
            className="accountActionBtn"
          >
            <span className="text-base">⇄</span>
            <span className="text-[11px] font-medium">Transfer</span>
          </button>
          {/* Delete */}
          <button
            onClick={() => {
              setType("delete");
            }}
            className="accountActionBtnDelete"
          >
            <span className="text-base">✕</span>
            <span className="text-[11px] font-medium">Delete</span>
          </button>
        </div>
      </div>

      {/* this code conditionally renders the AccountsAction component only when type is not empty */}
      {type && (
        //* Passing the props
        <AccountAction type={type} acc={acc} onClose={() => setType("")} />
      )}
      <ToastContainer />
    </div>
  );
};

export default AccountCard;