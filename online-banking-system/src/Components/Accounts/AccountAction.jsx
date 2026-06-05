import React, { useState } from "react";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import api from "../../utils/api";

const AccountsAction = ({ type, acc, onClose }) => {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    accountNo: "",
    reciverName: "",
  });

  //* Handle the form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //* Deposit functionality
  const handleDeposit = async () => {
    //* increase the balance of user
    let updatedBalance = Number(acc.InitialBalanace) + Number(form.amount);
    //* Update the balance
    await api.patch(`/accounts/${acc.id}`, {
      InitialBalanace: updatedBalance,
    });
    //* Create a transaction
    await api.post(`/transactions`, {
      accountId: acc.id,
      accountName: acc.AccName,
      amount: form.amount,
      description: form.description,
      type: "Deposit",
      date: new Date().toLocaleString(),
    });
    toast.success("Amount Deposited Successfully");
    setTimeout(() => window.location.reload(), 3000);
  };

  //* Withdraw functionality
  const handleWithdraw = async () => {
    //* decrease the balance
    let updatedBalance = Number(acc.InitialBalanace) - Number(form.amount);
    //* update the balance of the user
    await api.patch(`/accounts/${acc.id}`, {
      InitialBalanace: updatedBalance,
    });
    //* Create a transaction
    await api.post(`/transactions`, {
      accountId: acc.id,
      accountName: acc.AccName,
      amount: form.amount,
      description: form.description,
      type: "Withdraw",
      date: new Date().toLocaleString(),
    });
    toast.success("Amount Withdraw Successfull");
    setTimeout(() => window.location.reload(), 3000);
  };

  //* Transfer functionality
  const handleTransfer = async () => {
    //* Decrease amount from sender
    let senderBalance = Number(acc.InitialBalanace) - Number(form.amount);
    //* update the balance of the sender
    await api.patch(`/accounts/${acc.id}`, {
      InitialBalanace: senderBalance,
    });
    //* get the balance of receiver
    let recieverAccount = await api.get(`/accounts/${form.accountNo}`);
    //* Increase the amount of the receiver
    let recieverBalance =
      Number(recieverAccount.data.InitialBalanace) + Number(form.amount);
    //* update the balance of the receiver
    await api.patch(`/accounts/${form.accountNo}`, {
      InitialBalanace: recieverBalance,
    });
    //* Create a transaction
    await api.post(`/transactions`, {
      fromAccountNo: acc.id,
      fromAccountName: acc.accountName,
      toAccountNo: form.accountNo,
      toAccountName: form.reciverName,
      amount: form.amount,
      date: new Date().toLocaleString(),
      description: form.description,
      type: "Transfer",
    });
    toast.success("Amount Transfered Successfully");
    setTimeout(() => window.location.reload(), 3000);
  };

  //* Account deletion functionality
  const handleDelete = async () => {
    //* fetch the transactions
    let transaction = await api.get(`/transactions`);

    //* Main account be deleted
    if (acc.id === "MCB570001") {
      toast.error("Main account cannot be deleted");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      return;
    }

    //* looping all the transactions to get the related transactions for a particular user
    let relatedTransaction = transaction.data.filter((item) => {
      return (
        //* Deposits ( or ) withdrawals
        item.accountId === acc.id ||
        //* Transfer sent
        item.fromAccountNo === acc.id ||
        //* Transfer received
        item.toAccountNo === acc.id
      );
    });
    //* From the related transactions of a paricular user delete all the transactions by running a loop (for-of)
    for (let item of relatedTransaction) {
      //* Delete transactions
      await api.delete(`/transactions/${item.id}`);
    }
    //* Delete account
    await api.delete(`/accounts/${acc.id}`);
    toast.success("Account Deleted Successfully");
    setTimeout(() => window.location.reload(), 3000);
  };

  //* createPortal lets you render a component outside parent component
  //* It accepts 2 arguments
  //* 1. Component - what is to render
  //* 2. Location - where is to render (in my case document.body)
  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 z-50 display-flex"
      onClick={onClose}
    >
      {/* e.stopPropoagation When someone clicks this, don't tell any of the
      elements around it */}
      <div onClick={(e) => e.stopPropagation()}>
        {/* Deposit pop-up */}
        {type === "deposit" && (
          <div className="h-70 w-120 popup">
            <div>
              <label className="label" htmlFor="amount">
                Enter Amount
              </label>
              <br />
              <input
                type="number"
                placeholder="Ex: 5000"
                name="amount"
                required
                id="amount"
                className="input"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label" htmlFor="description">
                Enter Description
              </label>
              <br />
              <input
                type="text"
                id="description"
                placeholder="Ex: Repay"
                name="description"
                className="input"
                onChange={handleChange}
              />
            </div>
            <div className="buttonContainer">
              <button className="primaryButton" onClick={handleDeposit}>
                Confirm Deposit
              </button>
              <button className="cancel" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* Withdraw pop-up */}
        {type === "withdraw" && (
          <div className=" h-70 w-120 popup">
            <div>
              <label className="label" htmlFor="amount">
                Enter Amount
              </label>
              <br />
              <input
                type="number"
                placeholder="Ex: 5000"
                name="amount"
                required
                id="amount"
                className="input"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label" htmlFor="description">
                Enter Description
              </label>
              <br />
              <input
                type="text"
                id="description"
                placeholder="Ex: Repaying"
                name="description"
                className="input"
                onChange={handleChange}
              />
            </div>
            <div className="buttonContainer">
              <button className="primaryButton" onClick={handleWithdraw}>
                Confirm Withdrawal
              </button>
              <button className="cancel" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* Transfer pop-up */}
        {type === "transfer" && (
          <div className="h-120 w-110 popup">
            <div>
              <label className="label" htmlFor="amount">
                Enter Amount
              </label>
              <br />
              <input
                type="number"
                placeholder="Enter Amount"
                name="amount"
                className="input"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label" htmlFor="description">
                Enter Description
              </label>
              <br />
              <input
                type="text"
                placeholder="Enter Description"
                name="description"
                className="input"
                id="description"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label" htmlFor="accountNo">
                Enter Receiver Account No
              </label>
              <br />
              <input
                type="text"
                placeholder="Ex: 0Pg-xC_mIXU"
                className="input"
                name="accountNo"
                required
                id="accountNo"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label" htmlFor="reciverName">
                Enter Receiver Name
              </label>
              <br />
              <input
                type="text"
                placeholder="Ex: Alex"
                className="input"
                name="reciverName"
                id="reciverName"
                required
                onChange={handleChange}
              />
            </div>
            <div className="buttonContainer">
              <button className="primaryButton" onClick={handleTransfer}>
                Confirm Transfer
              </button>
              <button className="cancel" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* Account deletion pop-up */}
        {type === "delete" && (
          <div className="h-60 w-105 popup">
            <p className="text-lg font-bold">
              Are you sure you want to delete your account?
            </p>
            <p className="font-semibold">
              This process is irreversible. This results in:
            </p>
            <ol className="list-decimal">
              <li>Account Deletion</li>
              <li>Transactions Deletion</li>
            </ol>
            <div className="buttonContainer">
              <button
                className="secondaryButton bg-red-500"
                onClick={handleDelete}
              >
                Confirm Delete
              </button>
              <button className="primaryButton" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body, //* ← added: second argument to createPortal
    //* it tells where to render the above component
  );
};

export default AccountsAction;
