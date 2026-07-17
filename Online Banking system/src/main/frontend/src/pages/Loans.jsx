import React, { useEffect, useState } from "react";
import LoanApplication from "../Components/Loans/LoanApplication";
import { ToastContainer, toast } from "react-toastify";
import api from "../utils/api";

const Loans = () => {
  //* get user details
  const user = JSON.parse(localStorage.getItem("user"));

  const [loanType, setLoantype] = useState("Personal Loan");

  const [amount, setAmount] = useState(100000);
  const [tenure, setTenure] = useState(12);
  const [interest, setInterest] = useState(7);

  //* Dynamic loan list
  const [applications, setApplications] = useState([]);

  //* Fetch loans from backend
  const fetchLoans = async () => {
    try {
      const res = await api.get("/loans");
      let allLoans = [];
      //* Backend inconsistently returns loans as a raw array or wrapped in {data}, so handle both shapes
      if (Array.isArray(res.data)) {
        allLoans = res.data;
      } else if (Array.isArray(res.data.data)) {
        allLoans = res.data.data;
      }

      //* Keep only the loans that belong to the currently logged-in user`
      const userLoans = allLoans.filter(
        (loan) =>
          loan.applicantName === user.username ||
          loan.applicantName === user.name ||
          loan.email === user.email
      );

      setApplications(userLoans);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load loan details");
    }
  };

  //* Load the user's loans as soon as this page opens`
  useEffect(() => {
    fetchLoans();
  }, []);

  //* Function to Calculate Emi
  const calculateEMI = () => {
    //* Rate of interest
    const r = interest / 12 / 100;
    const n = tenure;

    if (r === 0) return amount / n;

    //* EMI Formula
    const emi =
      (amount * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - amount;

  //* Format a number as Indian Rupees, e.g. 100000 becomes ₹1,00,000`
  const fmt = (val) =>
    "₹" + Number(val || 0).toLocaleString("en-IN");

  return (
    <div className="size-full flex justify-center items-center flex-row bg-blue-100">
      <ToastContainer />
      {/* Left Container */}

      <section className="w-85 min-h-full self-stretch flex flex-col bg-[#1a2547] text-white">

        <div className="flex items-center flex-col">

          <h3 className="py-10 pb-3 font-bold text-lg">
            Loan Products
          </h3>

          {[
            { type: "Personal Loan", icon: "💵", rate: "From 11.5% p.a" },
            { type: "Home Loan", icon: "🏠", rate: "From 8.65% p.a" },
            { type: "Vehicle Loan", icon: "🚗", rate: "From 9.25% p.a" },
            { type: "Education Loan", icon: "🎓", rate: "From 10.1% p.a" },
          ].map((item) => (
            <button
              key={item.type}
              onClick={() => setLoantype(item.type)}
              className={`flex h-15 w-50 gap-2 items-center rounded-xl pl-2 ${loanType === item.type
                ? "bg-blue-500"
                : "bg-transparent"
                }`}
            >
              <h1 className="h-9 w-9 shrink-0 bg-blue-300 rounded-xl flex justify-center items-center text-lg">
                {item.icon}
              </h1>

              <div>
                <h2 className="font-bold leading-tight text-lg">
                  {item.type}
                </h2>

                <p className="leading-tight text-sm">
                  {item.rate}
                </p>
              </div>
            </button>
          ))}

        </div>

        {/* Account Details */}

        <div className="w-full h-70 flex justify-center items-start flex-col gap-5 p-5">

          <h3 className="text-gray-500 font-bold">
            Account Details
          </h3>

          <span className="h-50 w-full flex justify-evenly items-center flex-col bg-blue-950 rounded-2xl">

            <div className="w-full flex justify-between items-center px-5">
              <p className="text-gray-500 font-medium">
                Name:
              </p>

              <p className="font-bold">
                {user.username}
              </p>
            </div>

            <div className="w-full flex justify-between items-center px-5">
              <p className="text-gray-500 font-medium">
                Email:
              </p>

              <p className="font-bold">
                {user.email}
              </p>
            </div>

            <div className="w-full flex justify-between items-center px-5">
              <p className="text-gray-500 font-medium">
                Phone:
              </p>

              <p className="font-bold">
                {user.phNum}
              </p>
            </div>

            <div className="w-full flex justify-between items-center px-5">
              <p className="text-gray-500 font-medium">
                Credit Score
              </p>

              <p className="font-bold text-green-500">
                750 <i className="fa-solid fa-check"></i>
              </p>
            </div>

          </span>

        </div>

        {/* Dynamic Loan Applications */}

        <div className="w-full flex justify-center items-start flex-col gap-5 p-5">

          <h3 className="font-bold">
            Loan Applications
          </h3>

          <div className="w-full flex flex-col gap-4">

            {applications.length === 0 ? (

              <div className="bg-blue-950 rounded-2xl p-5 text-center text-gray-400">
                No Loan Applications Yet
              </div>

            ) : (

              applications.map((loan) => (

                <span
                  key={loan.id}
                  className="w-full flex justify-evenly items-center flex-col bg-blue-950 rounded-2xl py-5"
                >

                  <div className="w-full flex justify-between px-5">
                    <p className="text-gray-500">
                      Name:
                    </p>

                    <p className="font-bold">
                      {loan.applicantName}
                    </p>
                  </div>

                  <div className="w-full flex justify-between px-5 mt-2">
                    <p className="text-gray-500">
                      Type:
                    </p>

                    <p className="font-bold">
                      {loan.loanType}
                    </p>
                  </div>

                  <div className="w-full flex justify-between px-5 mt-2">
                    <p className="text-gray-500">
                      Amount:
                    </p>

                    <p className="font-bold text-green-400">
                      {fmt(loan.amount)}
                    </p>
                  </div>

                  <div className="w-full flex justify-between px-5 mt-2">
                    <p className="text-gray-500">
                      Account:
                    </p>

                    <p className="font-bold">
                      {loan.accountNumber}
                    </p>
                  </div>

                  <div className="w-full flex justify-between px-5 mt-2">
                    <p className="text-gray-500">
                      EMI:
                    </p>

                    <p className="font-bold text-yellow-300">
                      {fmt(loan.estimatedEmi || emi)}
                    </p>
                  </div>

                  <div className="w-full flex justify-between px-5 mt-2">
                    <p className="text-gray-500">
                      Status:
                    </p>

                    <p
                      className={`font-bold ${loan.status === "Approved"
                        ? "text-green-400"
                        : "text-orange-400"
                        }`}
                    >
                      {loan.status || "Under Review"}
                    </p>
                  </div>

                </span>

              ))

            )}

          </div>

        </div>

      </section>

      {/* Right Container */}

      <section className="w-full h-[170vh] flex justify-evenly items-center flex-col">

        {/* Hero */}

        <aside className="w-275 h-65 rounded-2xl bg-blue-500 text-white flex justify-center items-start gap-4 pl-10 flex-col">

          <p className="rounded-full bg-blue-400 w-fit px-2 font-semibold">
            ⚡Instant Approval
          </p>

          <h2 className="font-bold text-4xl">
            Apply for {loanType} Loan
          </h2>

          <p className="w-92">
            Get funds directly to your account within 2 minutes — no
            paperwork, no branch visit needed.
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

        {/* EMI Section */}

        <aside className="flex justify-evenly items-center gap-11">

          <div className="bg-white w-130 h-70 flex justify-center gap-2.5 items-start flex-col rounded-2xl">

            <h4 className="pl-5 font-bold">
              📊 EMI Calculator
            </h4>

            {/* Amount */}

            <div className="w-full flex justify-between items-center px-5">

              <label className="label">
                Loan Amount
              </label>

              <p className="text-lg font-bold text-blue-500">
                ₹ {amount}
              </p>

            </div>

            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={amount}
              onChange={(e) =>
                setAmount(Number(e.target.value))
              }
              className="w-120 mx-5"
            />

            {/* Tenure */}

            <div className="w-full flex justify-between items-center px-5">

              <label className="label">
                Tenure
              </label>

              <p className="text-lg font-bold text-blue-500">
                {tenure} months
              </p>

            </div>

            <input
              type="range"
              min="6"
              max="36"
              step="1"
              value={tenure}
              onChange={(e) =>
                setTenure(Number(e.target.value))
              }
              className="w-120 mx-5"
            />

            {/* Interest */}

            <div className="w-full flex justify-between items-center px-5">

              <label className="label">
                Interest
              </label>

              <p className="text-lg font-bold text-blue-500">
                {interest} %
              </p>

            </div>

            <input
              type="range"
              min="7"
              max="30"
              step="0.5"
              value={interest}
              onChange={(e) =>
                setInterest(Number(e.target.value))
              }
              className="w-120 mx-5"
            />

          </div>

          {/* EMI Card */}

          <div className="bg-white w-130 h-70 flex justify-center gap-2.5 items-center flex-col rounded-2xl text-white">

            <div className="bg-[#1a2547] h-45 w-115 gap-3 rounded-2xl flex justify-center items-center flex-col">

              <div>

                <p className="text-center">
                  Monthly EMI
                </p>

                <h1 className="font-bold text-3xl">
                  {fmt(emi)}
                </h1>

              </div>

              <div className="h-18 w-full flex justify-evenly items-center">

                <div className="h-full w-45 flex flex-col justify-center items-center rounded-xl bg-blue-950">

                  <h5 className="text-xl font-bold">
                    {fmt(totalInterest)}
                  </h5>

                  <p className="text-sm">
                    Total Interest
                  </p>

                </div>

                <div className="h-full w-45 flex flex-col justify-center items-center rounded-xl bg-blue-950">

                  <h5 className="text-xl font-bold">
                    {fmt(totalPayment)}
                  </h5>

                  <p className="text-sm">
                    Total Payment
                  </p>

                </div>

              </div>

            </div>

          </div>

        </aside>

        {/* Loan Form */}

        <aside className="w-275 h-140 bg-white rounded-3xl flex flex-col items-center justify-evenly">

          <LoanApplication
            emi={emi}
            fetchLoans={fetchLoans}
          />

        </aside>

      </section>

    </div>
  );
};

export default Loans;
