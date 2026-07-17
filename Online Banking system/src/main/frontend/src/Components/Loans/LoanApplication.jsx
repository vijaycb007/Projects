import React, { useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const LoanApplication = ({ fetchLoans }) => {
  const initialForm = {
    name: "",
    accountNo: "",
    amount: "",
    tenure: "12",
    income: "",
    loanType: "Personal Loan",
    description: "",
  };

  const [form, setForm] = useState(initialForm);

  //* Store form data
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //* Reset form
  const handleReset = () => {
    setForm(initialForm);
  };

  //* Interest based on loan type
  const loanRates = {
    "Personal Loan": 11.5,
    "Home Loan": 8.65,
    "Vehicle Loan": 9.25,
    "Education Loan": 10.1,
  };

  const interestRate = loanRates[form.loanType];

  //* Live EMI Calculation
  const calculateEMI = () => {
    // Convert the loan amount and tenure into numbers
    const principal = Number(form.amount);
    const months = parseInt(form.tenure);

    // Don't calculate anything if the amount or tenure is invalid
    if (principal <= 0 || months <= 0) {
      return 0;
    }

    // Convert yearly interest rate into a monthly rate
    const r = Number(interestRate) / 12 / 100;

    // Standard EMI formula: monthly payment based on loan amount, rate, and tenure
    const emi =
      (principal * r * Math.pow(1 + r, months)) /
      (Math.pow(1 + r, months) - 1);

    // Safety check in case the math produces an invalid result
    if (isNaN(emi) || !isFinite(emi)) {
      return 0;
    }

    // Round to the nearest whole rupee
    return Math.round(emi);
  };

  const calculatedEMI = Number(calculateEMI()) || 0;

  //* Submit Loan
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //* Fetch account
      const res = await api.get(
        `/accounts?AccountNumber=${form.accountNo}`
      );

      //* Get the first matching account, if any
      const account = res.data.data[0];

      if (!account) {
        //* Stop here if no account was found
        toast.error("Account not found!");
        return;
      }

      //* Add the loan amount to the account's current balance
      const updatedBalance =
        Number(account.InitialBalance) +
        Number(form.amount);

      //* Save the new balance to the backend
      await api.patch(`/accounts/${account.id}`, {
        InitialBalance: updatedBalance,
      });

      //* Record this loan payout as a transaction
      await api.post("/transactions", {
        accountID: account.id,
        accountNumber: account.AccountNumber,
        accountName: account.AccName,
        amount: form.amount,
        description: `${form.description} - Loan`,
        type: "deposit",
        date: new Date().toLocaleString(),
      });

      //* Save the loan application details
      await api.post("/loans", {
        applicantName: form.name,
        accountNumber: String(account.AccountNumber),
        loanType: form.loanType,
        amount: String(form.amount),
        tenure: String(form.tenure),
        income: String(form.income),
        purpose: form.description,
      });

      toast.success(
        "Loan Applied Successfully!"
      );

      //* Reset the form back to empty
      handleReset();

      //* Refresh the loans list, if a refresh function was provided
      if (fetchLoans) {
        fetchLoans();
      }
    } catch (err) {
      console.error(err);
      toast.error(
        "Account not found or something went wrong."
      );
    }
  };

  return (
    <div>
      <h4 className="w-250 text-xl font-bold pl-10 pb-5">
        📋 Loan Application
      </h4>

      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        {/* Row 1 */}

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="label">
              Full Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ex: Alex"
              className="input w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="accountNo" className="label">
              Account No
            </label>

            <input
              type="text"
              id="accountNo"
              name="accountNo"
              value={form.accountNo}
              onChange={handleChange}
              required
              placeholder="Ex:1234567890"
              className="input w-full"
            />
          </div>
        </div>

        {/* Row 2 */}

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="amount" className="label">
              Loan Amount ( ₹ )
            </label>

            <input
              type="number"
              id="amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              placeholder="Ex:100000"
              className="input w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="tenure" className="label">
              Months
            </label>

            <select
              id="tenure"
              name="tenure"
              value={form.tenure}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="12">12 Months</option>
              <option value="18">18 Months</option>
              <option value="24">24 Months</option>
              <option value="36">36 Months</option>
            </select>
          </div>
        </div>

        {/* Row 3 */}

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="label"
            >
              Purpose of Loan
            </label>

            <input
              type="text"
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ex: Education"
              className="input w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="income"
              className="label"
            >
              Monthly Income ( ₹ )
            </label>

            <input
              type="number"
              id="income"
              name="income"
              value={form.income}
              onChange={handleChange}
              required
              placeholder="Ex:40000"
              className="input w-full"
            />
          </div>
        </div>

        {/* Row 4 */}

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="loanType"
              className="label"
            >
              Loan Type
            </label>

            <select
              id="loanType"
              name="loanType"
              value={form.loanType}
              onChange={handleChange}
              className="input w-full"
            >
              {Object.keys(loanRates).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="label">
              Monthly EMI
            </label>

            <aside className="input w-full">
              <p className="font-bold text-green-500 pt-1.5">
                ₹{" "}
                {calculatedEMI.toLocaleString(
                  "en-IN"
                )}
              </p>
            </aside>
          </div>
        </div>

        {/* Terms */}

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            required
            className="h-5 w-5 mt-0.5 shrink-0"
          />

          <label
            htmlFor="terms"
            className="text-sm text-gray-600 cursor-pointer"
          >
            I agree to the Terms & Conditions
            and confirm all information
            provided is accurate.
          </label>
        </div>

        {/* Buttons */}

        <div className="flex justify-evenly w-100">
          <button
            type="submit"
            className="primaryButton"
          >
            Submit Application
          </button>

          <button
            type="button"
            className="cancel"
            onClick={handleReset}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanApplication;