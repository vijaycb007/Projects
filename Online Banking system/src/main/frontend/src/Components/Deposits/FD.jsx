import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const FD = () => {
    let [fddetails, changefd] = useState({
        CustomerName: "",
        AccountNumber: "",
        PANNumber: "",
        MobileNumber: "",
        DepositAmount: "",
        Tenure: "",
        InterestPayout: "",
        NomineeName: "",
        RelationshipWithNominee: "",
    });

    let [fdAccounts, setFdAccounts] = useState([]);

    //* Format a number as Indian Rupees, e.g. 100000 becomes ₹1,00,000`
    const formatMoney = (value) =>
        Number(value || 0).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        });

    const loadFdAccounts = async () => {
        try {
            //* Ask the backend for all Fixed Deposit accounts
            let fdRes = await api.get("/fd");
            //* Save the FD accounts so they can be shown on the page
            setFdAccounts(fdRes.data.data);
        } catch {
            //* If something goes wrong, show an error message
            toast.error("Unable to load FD details");
        }
    };

    //* Load the FD accounts as soon as this page opens`
    useEffect(() => {
        loadFdAccounts();
    }, []);

    //* Handle changes in the form
    let handlechange = (e) => {
        changefd({ ...fddetails, [e.target.name]: e.target.value });
    };

    //* Handle the form submit
    let handlesubmit = async (e) => {
        e.preventDefault();
        try {
            //* Get the list of all bank accounts
            let accdetails = await api.get("/accounts");
            //* Check if the account number entered actually exists
            let existingAccount = accdetails.data.data.find(
                (item) => item.AccountNumber == fddetails.AccountNumber
            );

            //* Stop here if the account doesn't exist
            if (!existingAccount) {
                toast.error("Account not found. Please create an account first.");
                return;
            }

            //* Get the list of all existing FD accounts
            let fdaccdetails = await api.get("/fd");
            //* Check if this account has already opened an FD
            let existingFD = fdaccdetails.data.data.find(
                (item) => item.AccountNumber === fddetails.AccountNumber
            );

            if (existingFD) {
                //* Don't allow a second FD on the same account
                toast.error("Sorry, you have already opened an FD");
            } else {
                //* Save the new FD to the backend
                await api.post("/fd", fddetails);
                toast.success("FD opened successfully");
                //* Clear the form back to empty fields
                changefd({
                    CustomerName: "",
                    AccountNumber: "",
                    PANNumber: "",
                    MobileNumber: "",
                    DepositAmount: "",
                    Tenure: "",
                    InterestPayout: "",
                    NomineeName: "",
                    RelationshipWithNominee: "",
                });
                //* Refresh the list of FD accounts shown on the page
                loadFdAccounts();
            }
        } catch {
            //* If anything above fails, show an error message
            toast.error("Something Went Wrong");
        }
    };

    return (
        <div className="w-full display-flex-col">
            {/* Hero */}
            <section className="w-full py-16 hero display-flex-col gap-3">
                <h1 className="text-4xl text-white font-extrabold font-serif">
                    Open a Fixed Deposit
                </h1>
                <p className="text-gray-300 text-center font-serif w-130">
                    Lock in your savings today and earn guaranteed, predictable returns.
                </p>
            </section>

            {/* Form + Details */}
            <section className="w-full display-flex-col gap-10 py-14">
                <div className="depositShell">
                    <form onSubmit={handlesubmit} className="depositFormPanel flex flex-col gap-6">
                        <h2 className="text-xl font-bold font-serif text-blue-950">
                            Fixed Deposit Application
                        </h2>

                        <div className="grid grid-cols-2 gap-x-7 gap-y-5 w-full">
                            <div className="depositField">
                                <label>Customer Name</label>
                                <input
                                    type="text"
                                    name="CustomerName"
                                    value={fddetails.CustomerName}
                                    placeholder="Enter your name"
                                    onChange={handlechange}
                                />
                            </div>

                            <div className="depositField">
                                <label>Account Number</label>
                                <input
                                    type="text"
                                    name="AccountNumber"
                                    value={fddetails.AccountNumber}
                                    placeholder="Enter account number"
                                    onChange={handlechange}
                                />
                            </div>

                            <div className="depositField">
                                <label>PAN Number</label>
                                <input
                                    type="text"
                                    name="PANNumber"
                                    value={fddetails.PANNumber}
                                    placeholder="Enter PAN number"
                                    onChange={handlechange}
                                />
                            </div>

                            <div className="depositField">
                                <label>Mobile Number</label>
                                <input
                                    type="text"
                                    name="MobileNumber"
                                    value={fddetails.MobileNumber}
                                    placeholder="Enter mobile number"
                                    onChange={handlechange}
                                />
                            </div>

                            <div className="depositField">
                                <label>Deposit Amount ( ₹ )</label>
                                <input
                                    type="number"
                                    name="DepositAmount"
                                    value={fddetails.DepositAmount}
                                    placeholder="Enter amount"
                                    onChange={handlechange}
                                />
                            </div>

                            <div className="depositField">
                                <label>Tenure</label>
                                <select
                                    name="Tenure"
                                    value={fddetails.Tenure}
                                    onChange={handlechange}
                                >
                                    <option value="">Select Tenure</option>
                                    <option value="1 Year">1 Year</option>
                                    <option value="2 Years">2 Years</option>
                                    <option value="3 Years">3 Years</option>
                                    <option value="5 Years">5 Years</option>
                                </select>
                            </div>

                            <div className="depositField">
                                <label>Interest Payout</label>
                                <select
                                    name="InterestPayout"
                                    value={fddetails.InterestPayout}
                                    onChange={handlechange}
                                >
                                    <option value="">Select Payout Type</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="At Maturity">At Maturity</option>
                                </select>
                            </div>

                            <div className="depositField">
                                <label>Nominee Name</label>
                                <input
                                    type="text"
                                    name="NomineeName"
                                    value={fddetails.NomineeName}
                                    placeholder="Enter nominee name"
                                    onChange={handlechange}
                                />
                            </div>

                            <div className="depositField col-span-2">
                                <label>Relationship with Nominee</label>
                                <input
                                    type="text"
                                    name="RelationshipWithNominee"
                                    value={fddetails.RelationshipWithNominee}
                                    placeholder="Enter relationship"
                                    onChange={handlechange}
                                />
                            </div>
                        </div>
                    </form>

                    <aside className="depositSummaryPanel">
                        <div>
                            <p className="depositSummaryTitle">Application Summary</p>
                            <div className="depositSummaryRow">
                                <span>Deposit Amount</span>
                                <span>{fddetails.DepositAmount ? formatMoney(fddetails.DepositAmount) : "—"}</span>
                            </div>
                            <div className="depositSummaryRow">
                                <span>Tenure</span>
                                <span>{fddetails.Tenure || "—"}</span>
                            </div>
                            <div className="depositSummaryRow">
                                <span>Payout</span>
                                <span>{fddetails.InterestPayout || "—"}</span>
                            </div>
                            <p className="depositMaturityLabel">Account Number</p>
                            <p className="depositMaturity text-2xl">
                                {fddetails.AccountNumber || "—"}
                            </p>
                        </div>
                        <button type="submit" onClick={handlesubmit} className="depositSubmitBtn">
                            Open FD
                        </button>
                    </aside>
                </div>

                {/* Opened FD Accounts */}
                <div className="w-full max-w-5xl display-flex-col gap-4">
                    <div className="display-flex-col gap-1">
                        <p className="text-blue-500 font-semibold text-sm">FD DETAILS</p>
                        <h2 className="text-2xl font-bold font-serif text-blue-950">
                            Opened FD Accounts
                        </h2>
                    </div>
                    //* If accounts present
                    {fdAccounts.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {fdAccounts.map((item) => (
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
                                            <dt className="text-gray-400">Deposit Amount</dt>
                                            <dd className="font-bold text-blue-950">
                                                {formatMoney(item.DepositAmount)}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-400">Tenure</dt>
                                            <dd className="font-bold text-blue-950">{item.Tenure}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-400">Payout</dt>
                                            <dd className="font-bold text-blue-950">
                                                {item.InterestPayout}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-400">PAN</dt>
                                            <dd className="font-bold text-blue-950">
                                                {item.PANNumber}
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
                                        Mobile {item.MobileNumber || "Not added"}
                                    </small>
                                </article>
                            ))}
                        </div>
                    ) : (
                        //* If accounts not present
                        <div className="text-center text-gray-400 py-10 border border-dashed border-gray-300 rounded-2xl w-full">
                            No FD details available yet
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default FD;