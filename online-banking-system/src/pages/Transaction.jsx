import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../utils/api";

const Transaction = ({ type }) => {
  let [transactions, setTransactions] = useState([]);

  let [selectedType, setSelectedType] = useState("All");

  //* useEffect( ) - To avoid side effects of data
  //* fetches transactions from the backend only once
  //* when the page opens and stores them in transactions state so you can display them later.
  useEffect(() => {
    api.get(`/transactions`).then((res) => {
      setTransactions(res.data);
    });
  }, []);

  //* Function to filter transactions based on selected type.
  let filterTransaction = (selectedType) => {
    //* If selected type is "All" display all transactions
    if (selectedType === "All") {
      return transactions;
    }
    //* Otherwise display the transactions which satisfies the condition
    return transactions.filter(
      (item) => item.type.toLowerCase() === selectedType.toLowerCase(),
    );
  };
  return (
    <section className="h-full w-375 display-flex-col m-2.5 rounded-2xl">
      <aside className="w-full h-20 bg-blue-500 text-white display-flex justify-between px-15 rounded-t-2xl">
        {/* Heading */}
        <h1 className="text-3xl font-bold">Transaction Details</h1>
        {/* Button Container */}
        <div className=" w-150 display-flex justify-evenly">
          <button
            className="primaryButton border"
            onClick={() => setSelectedType("All")}
          >
            All
          </button>
          <button
            className="primaryButton border"
            onClick={() => setSelectedType("Deposit")}
          >
            Deposit
          </button>
          <button
            className="primaryButton border"
            onClick={() => setSelectedType("Withdraw")}
          >
            Withdraw
          </button>
          <button
            className="primaryButton border"
            onClick={() => setSelectedType("Transfer")}
          >
            Transfer
          </button>
        </div>
      </aside>
      {/* Transactions table */}
      <table className="w-full shadow-xl" cellPadding={10}>
        {/* Table header */}
        <thead className="h-12 w-full border-b border-gray-500">
          <tr>
            <td className="tableHead">Transaction ID</td>
            <td className="tableHead">Account Holder</td>
            <td className="tableHead">Account No</td>
            <td className="tableHead">Type</td>
            <td className="tableHead">Amount</td>
            <td className="tableHead">Description</td>
            <td className="tableHead">Date</td>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Filter condition */}
          {filterTransaction(selectedType).map((item) => {
            return (
              <tr className="h-15 border-b border-gray-500">
                <td className="tableData">{item.id}</td>
                {/* Transaction type - Transfer */}
                {item.type === "Transfer" && (
                  <>
                    <td className="tableData">{item.toAccountName}</td>
                    <td className="tableData">{item.toAccountNo}</td>
                    <td className="tableData ">
                      <p className="rounded-full bg-amber-200 text-amber-500">
                        {item.type}
                      </p>
                    </td>
                    <td className="tableData text-green-500">+{item.amount}</td>
                  </>
                )}
                {/* Transaction type - Deposit */}
                {item.type === "Deposit" && (
                  <>
                    <td className="tableData">{item.accountName}</td>
                    <td className="tableData ">{item.accountId}</td>
                    <td className="tableData ">
                      <p className="rounded-full bg-green-200 text-green-500">
                        {item.type}
                      </p>
                    </td>
                    <td className="tableData text-green-500">+{item.amount}</td>
                  </>
                )}
                {/* Transaction type - Withdraw */}
                {item.type === "Withdraw" && (
                  <>
                    <td className="tableData">{item.accountName}</td>
                    <td className="tableData ">{item.accountId}</td>
                    <td className="tableData ">
                      <p className="rounded-full bg-red-200 text-red-500">
                        {item.type}
                      </p>
                    </td>
                    <td className="tableData text-red-500">-{item.amount}</td>
                  </>
                )}
                <td className="tableData">{item.description}</td>
                <td className="tableData">{item.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Transaction;
