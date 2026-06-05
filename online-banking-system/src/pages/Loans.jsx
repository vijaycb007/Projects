import React, { useState } from "react";
import LoanApplication from "../Components/Loans/LoanApplication";
import { ToastContainer } from "react-toastify";

const Loans = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  let [loanType, setLoantype] = useState("Cash");

  let [amount, setAmount] = useState(100000);
  let [tenure, setTenure] = useState(12);
  let [interest, setInterest] = useState(7);

  //* EMI Formula: P × r × (1+r)^n / ((1+r)^n - 1)
  let calculateEMI = () => {
    //* Monthly rates
    let r = interest / 12 / 100;
    //* Tenure
    let n = tenure;
    //* If interest is 0 then amount divided by no. of period of time
    if (r === 0) return amount / n;
    let emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    //* Remove the decimal (or) Roundof the value
    return Math.round(emi);
  };

  let emi = calculateEMI();
  let totalPayment = emi * tenure;
  let totalInterest = totalPayment - amount;

  //* an arrow function that takes a number and returns a formatted currency string
  let fmt = (val) => "₹" + val.toLocaleString("en-IN");

  return (
    <div className="size-full flex justify-center items-center flex-row bg-blue-100">
      <ToastContainer />
      {/* Left container */}
      <section className="w-85 min-h-full self-stretch flex flex-col bg-[#1a2547] text-white">
        <div className="flex items-center flex-col">
          <h3 className="py-10 pb-3 font-bold text-lg">Loan Products</h3>
          <button
            onClick={() => {
              setLoantype("Cash");
            }}
            //* Setting active state for button
            className={`flex h-15 w-50 gap-2 items-center rounded-xl pl-2 ${
              loanType === "Cash" ? "bg-blue-500" : "bg-transparent"
            }`}
          >
            <h1 className="h-9 w-9 shrink-0 bg-blue-300 rounded-xl flex justify-center items-center text-lg">
              💵
            </h1>
            <div>
              <h2 className="font-bold leading-tight text-lg">Cash Loan</h2>
              <p className="leading-tight text-sm">From 10% p.a</p>
            </div>
          </button>
          <button
            onClick={() => {
              setLoantype("Gold");
            }}
            //* Setting active state for button
            className={`flex h-15 w-50 gap-2 items-center rounded-xl pl-2 ${
              loanType === "Gold" ? "bg-blue-500" : "bg-transparent"
            }`}
          >
            <h1 className="h-9 w-9 shrink-0 bg-blue-300 rounded-xl flex justify-center items-center text-lg">
              🏅
            </h1>
            <div>
              <h2 className="font-bold leading-tight text-lg">Gold Loan</h2>
              <p className="leading-tight text-sm">From 0.83/month</p>
            </div>
          </button>
        </div>
        <div className="w-full h-70 flex justify-center items-start flex-col gap-5 p-5">
          <h3 className="text-gray-500 font-bold">Account Details</h3>
          <span className="h-50 w-full flex justify-evenly items-center flex-col bg-blue-950 rounded-2xl">
            <div className="w-full flex justify-between items-center px-5">
              <p className="text-gray-500 font-medium">Name: </p>
              <p className="font-bold">{user.username}</p>
            </div>
            <div className="w-full flex justify-between items-center px-5">
              <p className="text-gray-500 font-medium">Email: </p>
              <p className="font-bold">{user.email}</p>
            </div>
            <div className="w-full flex justify-between items-center px-5">
              <p className="text-gray-500 font-medium">PhNum: </p>
              <p className="font-bold">{user.phNum}</p>
            </div>
            <div className="w-full flex justify-between items-center px-5">
              <p className="text-gray-500 font-medium">Credit Score </p>
              <p className="font-bold text-green-500">
                750 <i className="fa-solid fa-check"></i>
              </p>
            </div>
          </span>
        </div>
      </section>
      {/* Right Container */}
      {/* Container -1 */}
      <section className="w-full h-[150vh] flex justify-evenly items-center flex-col">
        <aside className="w-275 h-65 rounded-2xl bg-blue-500 text-white flex justify-center items-start gap-4 pl-10 flex-col">
          <p className="rounded-full bg-blue-400 w-fit px-2 font-semibold">
            ⚡Instant Approval
          </p>
          <h2 className="font-bold text-4xl">Apply for {loanType} Loan</h2>
          <p className="w-92">
            Get funds directly to your account within 2 minutes — no paperwork,
            no branch visit needed.
          </p>
          <div className="flex w-170 justify-evenly items-center">
            <p className="rounded-full bg-blue-400 w-fit px-2 font-semibold">
              ₹10,000 - ₹5,00,000
            </p>
            <p className="rounded-full bg-blue-400 w-fit px-2 font-semibold">
              6 - 36 months
            </p>
            <p className="rounded-full bg-blue-400 w-fit px-2 font-semibold">
              Approval in 2 minutes
            </p>
            <p className="rounded-full bg-blue-400 w-fit px-2 font-semibold">
              0% processing fees
            </p>
          </div>
        </aside>
        {/* Container -2  */}
        <aside className="flex justify-evenly items-center gap-11">
          <div className="bg-white w-130 h-70 flex justify-center gap-2.5 items-start flex-col rounded-2xl">
            <h4 className="pl-5 font-bold">📊 EMI Calculator</h4>
            {/* Amount */}
            <div className="w-full flex justify-between items-center px-5">
              <label htmlFor="" className="label">
                Loan Amount
              </label>
              <p className="text-lg font-bold text-blue-500">₹ {amount}</p>
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-120 mx-5"
            />
            {/* Tenure */}
            <div className="w-full flex justify-between items-center px-5">
              <label htmlFor="" className="label">
                Tenure
              </label>
              <p className="text-lg font-bold text-blue-500">{tenure} months</p>
            </div>
            <input
              type="range"
              min="6"
              max="36"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-120 mx-5"
            />
            {/* Interest */}
            <div className="w-full flex justify-between items-center px-5">
              <label htmlFor="" className="label">
                Interest
              </label>
              <p className="text-lg font-bold text-blue-500">{interest} %</p>
            </div>
            <input
              type="range"
              min="7"
              max="30"
              step="0.5"
              value={interest}
              onChange={(e) => setInterest(Number(e.target.value))}
              className="w-120 mx-5"
            />
          </div>
          <div className="bg-white w-130 h-70 flex justify-center gap-2.5 items-center flex-col rounded-2xl text-white">
            <div className="bg-[#1a2547] h-45 w-115 gap-3 rounded-2xl flex justify-center items-center flex-col">
              <div>
                <p className="text-center">Monthly EMI</p>
                <h1 className="font-bold text-3xl">{fmt(emi)}</h1>
              </div>
              <div className="h-18 w-full flex justify-evenly items-center">
                <div className="h-full w-45 flex flex-col justify-center items-center rounded-xl bg-blue-950">
                  <h5 className="text-xl font-bold">{fmt(totalInterest)}</h5>
                  <p className="text-sm">Total Interest</p>
                </div>
                <div className="h-full w-45 flex flex-col justify-center items-center rounded-xl bg-blue-950">
                  <h5 className="text-xl font-bold">{fmt(totalPayment)}</h5>
                  <p className="text-sm">Total Payment</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
        {/* Container - 3 */}
        {/* Loan Application */}
        <aside className="w-275 h-110 bg-white rounded-3xl flex flex-col items-center justify-evenly">
          {/* <LoanApplication /> */}
          <LoanApplication />
        </aside>
      </section>
    </div>
  );
};

export default Loans;
