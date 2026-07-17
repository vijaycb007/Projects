import React, { useEffect, useMemo, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const initialRd = {
    CustomerName: "",
    AccountNumber: "",
    MonthlyDeposit: "",
    Tenure: "12",
    NomineeName: "",
    RelationshipWithNominee: "",
};

//* Format a number as Indian Rupees, e.g. 100000 becomes ₹1,00,000`
const formatMoney = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    });

const RD = () => {
    const [rdDetails, setRdDetails] = useState(initialRd);
    const [rdAccounts, setRdAccounts] = useState([]);
    const interestRate = 6.8;

    //* useMemo avoids redoing this calculation on every re-render — it only recalculates when MonthlyDeposit or Tenure actually change
    const maturityAmount = useMemo(() => {
        //* Convert the entered deposit and tenure into numbers
        const monthlyDeposit = Number(rdDetails.MonthlyDeposit);
        const months = Number(rdDetails.Tenure);

        //* Don't calculate anything if either value is missing
        if (!monthlyDeposit || !months) return 0;

        //* Total money deposited over the whole tenure
        const totalDeposit = monthlyDeposit * months;

        //* Interest earned on that deposit
        const interest = totalDeposit * (interestRate / 100) * ((months + 1) / 24);

        //* Final amount = deposit + interest, rounded to a whole number
        return Math.round(totalDeposit + interest);
    }, [rdDetails.MonthlyDeposit, rdDetails.Tenure]);

    //* Handle the changes in the form 
    const handleChange = (e) => {
        setRdDetails({ ...rdDetails, [e.target.name]: e.target.value });
    };

    const loadRdAccounts = async () => {
        try {
            //* Ask the backend for all Recurring Deposit accounts
            const rdRes = await api.get("/rd");
            //* Save the RD accounts so they can be shown on the page
            setRdAccounts(rdRes.data.data);
        } catch {
            toast.error("Unable to load RD details");
        }
    };

    //*  Load RD accounts as soon as page renders
    useEffect(() => {
        loadRdAccounts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //* Get the list of all bank accounts
            const accountRes = await api.get("/accounts");
            //* Check if the entered account number actually exists
            const existingAccount = accountRes.data.data.find(
                (item) => String(item.AccountNumber) === String(rdDetails.AccountNumber)
            );

            if (!existingAccount) {
                //* Stop here if the account doesn't exist
                toast.error("Account not found. Please create an account first.");
                return;
            }

            //* Save the new RD, including the calculated interest and maturity amount
            await api.post("/rd", {
                ...rdDetails,
                InterestRate: interestRate,
                MaturityAmount: maturityAmount,
                CreatedAt: new Date().toLocaleString(),
            });

            toast.success("RD opened successfully");

            //* Clear the form back to its starting values
            setRdDetails(initialRd);

            //* Refresh the list of RD accounts shown on the page
            loadRdAccounts();
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="w-full display-flex-col">
            {/* Hero / summary */}
            <section className="w-full py-16 hero display-flex-col gap-3">
                <p className="text-blue-400 font-semibold text-sm">RECURRING DEPOSIT</p>
                <h1 className="text-4xl text-white font-extrabold font-serif text-center">
                    Build savings month by month.
                </h1>
                <p className="text-gray-300 text-sm font-serif">
                    Estimated maturity value at {interestRate}% interest
                </p>
                <h2 className="text-3xl font-bold text-blue-400">
                    {formatMoney(maturityAmount)}
                </h2>
            </section>

            {/* Form + Details */}
            <section className="w-full display-flex-col gap-10 py-14">
                <div className="depositShell">
                    <form onSubmit={handleSubmit} className="depositFormPanel flex flex-col gap-6">
                        <h2 className="text-xl font-bold font-serif text-blue-950">
                            Recurring Deposit Application
                        </h2>

                        <div className="grid grid-cols-2 gap-x-7 gap-y-5 w-full">
                            <div className="depositField">
                                <label>Customer Name</label>
                                <input
                                    name="CustomerName"
                                    value={rdDetails.CustomerName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="depositField">
                                <label>Account Number</label>
                                <input
                                    name="AccountNumber"
                                    value={rdDetails.AccountNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter account number"
                                />
                            </div>

                            <div className="depositField">
                                <label>Monthly Deposit ( ₹ )</label>
                                <input
                                    type="number"
                                    min="500"
                                    name="MonthlyDeposit"
                                    value={rdDetails.MonthlyDeposit}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ex: 2000"
                                />
                            </div>

                            <div className="depositField">
                                <label>Tenure</label>
                                <select
                                    name="Tenure"
                                    value={rdDetails.Tenure}
                                    onChange={handleChange}
                                >
                                    <option value="12">12 Months</option>
                                    <option value="24">24 Months</option>
                                    <option value="36">36 Months</option>
                                    <option value="60">60 Months</option>
                                </select>
                            </div>

                            <div className="depositField">
                                <label>Nominee Name</label>
                                <input
                                    name="NomineeName"
                                    value={rdDetails.NomineeName}
                                    onChange={handleChange}
                                    placeholder="Enter nominee name"
                                />
                            </div>

                            <div className="depositField">
                                <label>Relationship with Nominee</label>
                                <input
                                    name="RelationshipWithNominee"
                                    value={rdDetails.RelationshipWithNominee}
                                    onChange={handleChange}
                                    placeholder="Enter relationship"
                                />
                            </div>
                        </div>
                    </form>

                    <aside className="depositSummaryPanel">
                        <div>
                            <p className="depositSummaryTitle">Live Summary</p>
                            <div className="depositSummaryRow">
                                <span>Monthly Deposit</span>
                                <span>{rdDetails.MonthlyDeposit ? formatMoney(rdDetails.MonthlyDeposit) : "—"}</span>
                            </div>
                            <div className="depositSummaryRow">
                                <span>Tenure</span>
                                <span>{rdDetails.Tenure} months</span>
                            </div>
                            <div className="depositSummaryRow">
                                <span>Interest Rate</span>
                                <span>{interestRate}%</span>
                            </div>
                            <p className="depositMaturityLabel">Est. Maturity Value</p>
                            <p className="depositMaturity">{formatMoney(maturityAmount)}</p>
                        </div>
                        <button type="submit" onClick={handleSubmit} className="depositSubmitBtn">
                            Open RD
                        </button>
                    </aside>
                </div>

                {/* Opened RD Accounts */}
                <div className="w-full max-w-5xl display-flex-col gap-4">
                    <div className="display-flex-col gap-1">
                        <p className="text-blue-500 font-semibold text-sm">RD DETAILS</p>
                        <h2 className="text-2xl font-bold font-serif text-blue-950">
                            Opened RD Accounts
                        </h2>
                    </div>
                    //* If accounts are present
                    {rdAccounts.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {rdAccounts.map((item) => (
                                <article
                                    key={item.id}
                                    className="rounded-2xl border border-gray-200 shadow-lg hover:scale-105 transition-transform duration-300 p-5 flex flex-col gap-3"
                                >
                                    <div className="flex flex-col">
                                        <strong className="text-blue-950 text-lg">
                                            {item.CustomerName}
                                        </strong>
                                        <span className="text-sm text-gray-500">
                                            A/C {item.AccountNumber}
                                        </span>
                                    </div>

                                    <hr className="text-gray-200" />

                                    <dl className="grid grid-cols-2 gap-y-2 text-sm">
                                        <div>
                                            <dt className="text-gray-400">Monthly Deposit</dt>
                                            <dd className="font-bold text-blue-950">
                                                {formatMoney(item.MonthlyDeposit)}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-400">Tenure</dt>
                                            <dd className="font-bold text-blue-950">
                                                {item.Tenure} months
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-400">Interest</dt>
                                            <dd className="font-bold text-blue-950">
                                                {item.InterestRate}%
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-400">Maturity</dt>
                                            <dd className="font-bold text-blue-950">
                                                {formatMoney(item.MaturityAmount)}
                                            </dd>
                                        </div>
                                    </dl>

                                    <p className="text-sm text-gray-500">
                                        Nominee: {item.NomineeName || "Not added"}
                                        {item.RelationshipWithNominee
                                            ? ` (${item.RelationshipWithNominee})`
                                            : ""}
                                    </p>
                                    <small className="text-xs text-gray-400">
                                        Opened on {item.CreatedAt}
                                    </small>
                                </article>
                            ))}
                        </div>
                    ) : (
                        //* If accounts not present
                        <div className="text-center text-gray-400 py-10 border border-dashed border-gray-300 rounded-2xl w-full">
                            No RD details available yet
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default RD;