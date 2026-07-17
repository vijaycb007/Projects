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
      setTransactions(res.data.data);
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

  const filteredTransactions = filterTransaction(selectedType);

  //* Derived summary values for the overview cards (presentation only, no logic change)
  const totalEntries = transactions.length;
  const depositedTotal = transactions
    .filter((item) => item.type.toLowerCase() === "deposit")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const withdrawnTotal = transactions
    .filter((item) => item.type.toLowerCase() === "withdraw")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const transferredTotal = transactions
    .filter((item) => item.type.toLowerCase() === "transfer")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <section className="min-h-screen w-full bg-linear-to-b from-slate-50 to-blue-50/40 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Page header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest text-blue-500 uppercase">
              Ledger Overview
            </p>
            <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Transactions
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Review deposits, withdrawals, and transfers across all accounts.
            </p>
          </div>

          {/* Search + type filter */}
          <div className="flex flex-col gap-2 sm:flex-row">y
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="All">All Types</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdraw">Withdraw</option>
              <option value="Transfer">Transfer</option>
            </select>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-500">Total Entries</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{totalEntries}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-500">Deposited</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">₹{depositedTotal}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-500">Withdrawn</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">₹{withdrawnTotal}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-500">Transferred</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">₹{transferredTotal}</p>
          </div>
        </div>

        {/* Transactions table / empty state */}
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
          {filteredTransactions.length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-sm font-semibold text-slate-500">
                No transactions match your filters
              </p>
            </div>
          ) : (
            //* Table header
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="border-b border-slate-100 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Transaction ID
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Account Holder
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Account No
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Type
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Description
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Date
                    </th>
                  </tr>
                </thead>
                //* Entries
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.map((item) => {
                    const typeLower = item.type ? item.type.toLowerCase() : "";
                    return (
                      <tr
                        key={item.id}
                        className="transition-colors duration-100 hover:bg-slate-50"
                      >
                        <td className="px-4 py-3 text-sm text-slate-700">{item.id}</td>
                        {/* Transaction type - Transfer */}
                        {typeLower === "transfer" && (
                          <>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              {item.reciverName}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              {item.reciverAccountNo}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-600">
                                {item.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-green-600">
                              +{item.amount}
                            </td>
                          </>
                        )}
                        {/* Transaction type - Deposit */}
                        {typeLower === "deposit" && (
                          <>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              {item.accountName}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              {item.accountNumber}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                                {item.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-green-600">
                              +{item.amount}
                            </td>
                          </>
                        )}
                        {/* Transaction type - Withdraw */}
                        {typeLower === "withdraw" && (
                          <>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              {item.accountName}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              {item.accountNumber}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
                                {item.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-red-600">
                              -{item.amount}
                            </td>
                          </>
                        )}
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {item.description}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500">{item.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Transaction;