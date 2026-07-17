import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../../utils/api";

const ACCOUNT_TYPES = [
  { value: "Savings", icon: "💰" },
  { value: "Current", icon: "💳" },
  { value: "Credit", icon: "🏦" },
];

const CreateAccount = () => {
  let navigate = useNavigate();

  //* To handle the form
  let [formData, setFormData] = useState({
    AccName: "",
    Acctype: "Savings",
    InitialBalance: "",
  });

  let [accountNo, setAccountNo] = useState(null);

  //* To handle the changes in the form like user entering the data
  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //* To handle account type selection from the icon buttons (replaces the <select> onChange)
  let handleTypeSelect = (value) => {
    setFormData({ ...formData, Acctype: value });
  };

  //* Reset the form
  let handleReset = (e) => {
    setFormData({ AccName: "", Acctype: "Savings", InitialBalance: "" })
  }

  //* Handle the form submit
  let handleSubmit = async (e) => {
    //* Stop the page from refreshing when the form is submitted
    e.preventDefault();
    try {
      let accNo;
      let isTaken = true;
      while (isTaken) {
        //* Randomly generate a 12-digit account number
        accNo = Math.floor(100000000000 + Math.random() * 900000000000);
        try {
          //* Check if this account number is already being used
          let check = await api.get(`/accounts/${accNo}`);
          isTaken = !!check.data.data;
        } catch (err) {
          if (err.response?.status === 404) {
            //* Number not found means it's free to use
            isTaken = false;
          } else {
            throw err;
          }
        }
      }
      //* Save the new account with the unique account number
      await api.post(`/accounts`, {
        ...formData,
        AccountNumber: Number(accNo),
        InitialBalance: parseFloat(formData.InitialBalance),
      });
      toast.success(`Account Created! A/C No: ${accNo}`);
      //* Clear the form back to its starting state
      setFormData({ AccName: "", Acctype: "Savings", InitialBalance: "" });
      setTimeout(() => {
        navigate("/accounts");
      }, 3000);
      //* Show error if occurs
    } catch (err) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <section className="formOuter flex-col">
      {/* Display the toast message */}
      <ToastContainer />
      {/* Main container (form-preview) */}
      <div className="createAccountShell">
        {/* Left - form */}
        <form onSubmit={handleSubmit} className="createAccountFormPanel">
          <div className="pb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Account
            </h2>
            <p className="text-gray-400 text-sm">Open a new bank account in seconds</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="AccName" className="authLabel">
                Enter Account Holder Name
              </label>
              <input
                type="text"
                id="AccName"
                placeholder="Enter Name"
                name="AccName"
                value={formData.AccName}
                className="authInput"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="authLabel">Select Account Type</label>
              <div className="createAccountTypeGrid">
                {ACCOUNT_TYPES.map((type) => (
                  <button
                    type="button"
                    key={type.value}
                    onClick={() => handleTypeSelect(type.value)}
                    className={
                      formData.Acctype === type.value
                        ? "createAccountTypeBtnActive"
                        : "createAccountTypeBtn"
                    }
                  >
                    <p className="createAccountTypeIcon">{type.icon}</p>
                    <p
                      className={
                        formData.Acctype === type.value
                          ? "createAccountTypeLabelActive"
                          : "createAccountTypeLabel"
                      }
                    >
                      {type.value}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="InitialBalance" className="authLabel">
                Initial Balance
              </label>
              <input
                type="number"
                placeholder="Initial Balance"
                id="InitialBalance"
                name="InitialBalance"
                value={formData.InitialBalance}
                className="authInput"
                onChange={handleChange}
                min={0}
              />
            </div>
          </div>

          <div className="authBtnRow">
            <button type="submit" className="authSubmitBtn">
              Create Account
            </button>
            <button type="reset" onClick={handleReset} className="authResetBtn">
              Reset
            </button>
          </div>
        </form>

        {/* Right - live preview */}
        <div className="createAccountPreviewPanel">
          <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-3">Preview</p>
          <div className="createAccountPreviewCard">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-sm">{formData.AccName || "Account Holder"}</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 border border-white/20">
                {formData.Acctype}
              </span>
            </div>
            <p className="text-lg font-bold">₹ {formData.InitialBalance || "0"}</p>
            <p className="text-[10px] text-white/50 mt-1">Available Balance</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateAccount;