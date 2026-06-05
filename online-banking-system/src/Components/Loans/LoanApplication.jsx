import React, { useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const LoanApplication = () => {
  let [form, setForm] = useState({
    name: "",
    accountNo: "",
    amount: "",
    tenure: "",
  });

  //* Store the form data
  let handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //* On Submitting the form perform these operations
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //* account id IS the account number (e.g. "LUYaGjw6bZE")
      let res = await api.get(`/accounts/${form.accountNo}`);
      let account = res.data;

      if (!account) {
        toast.error("Account not found!");
        return;
      }

      //* Credit loan amount to that account
      let updatedBalance =
        Number(account.InitialBalanace) + Number(form.amount);
      await api.patch(`/accounts/${account.id}`, {
        InitialBalanace: updatedBalance,
      });

      //* Create transaction
      await api.post(`/transactions`, {
        accountId: account.id,
        accountName: account.AccName,
        amount: form.amount,
        description: `${form.description} - Loan `,
        //* loan = money coming IN = Deposit
        type: "Deposit",
        date: new Date().toLocaleString(),
      });

      toast.success("Loan applied! Amount credited successfully");
      setForm({
        name: "",
        accountNo: "",
        amount: "",
        tenure: "",
        description: "",
      });
      //* Reload the page
      setTimeout(() => window.location.reload(), 3000);
    } catch (err) {
      toast.error("Account not found or something went wrong.");
      console.error(err);
    }
  };
  return (
    <div>
      <h4 className="text-xl font-bold pl-10 pb-5">📋 Loan Applcation</h4>
      <form className="display-flex flex-wrap" onSubmit={handleSubmit}>
        <div className=" w-[95%] display-flex flex-wrap justify-evenly">
          <div className="flex flex-col">
            {/* Namw */}
            <label htmlFor="name" className="label">
              Full Name
            </label>
            <input
              type="text"
              className="input w-120"
              placeholder="Ex: Alex"
              required
              onChange={handleChange}
              name="name"
              id="name"
            />
          </div>
          {/* Account No */}
          <div className="flex flex-col ">
            <label htmlFor="accountNo" className="label">
              Account No
            </label>
            <input
              type="text"
              placeholder="Ex: LUYaGjw6bZE"
              className="input w-120"
              required
              onChange={handleChange}
              name="accountNo"
              id="accountNo"
            />
          </div>
        </div>
        {/* Amount */}
        <div className=" w-[95%] h-30 display-flex flex-wrap justify-evenly">
          <div className="flex flex-col ">
            <label htmlFor="amount" className="label">
              Loan Amount ( ₹ )
            </label>
            <input
              type="number"
              placeholder="Ex: 100000"
              className="input w-120"
              required
              onChange={handleChange}
              name="amount"
              id="amount"
            />
          </div>
          {/* Tenure */}
          <div className="flex flex-col ">
            <label htmlFor="tenure" className="label">
              Months
            </label>
            <select
              name="tenure"
              onChange={handleChange}
              className="input w-120"
            >
              <option value="12 Months">12 Months</option>
              <option value="18 Months">18 Months</option>
              <option value="24 Months">24 Months</option>
              <option value="36 Months">36 Months</option>
            </select>
          </div>
        </div>
        {/* Purpose */}
        <div className=" w-[95%] display-flex-col justify-between">
          <div className="flex flex-col  w-full pl-7">
            <label htmlFor="description" className="label">
              Purpose of Loan
            </label>
            <input
              type="text"
              placeholder="Ex: Education"
              id="description"
              name="description"
              onChange={handleChange}
              className="input w-247"
            />
          </div>
          {/* Terms and conditions checkbox */}
          <div className="w-[95%] display-flex-col items-start gap-5 pt-5">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                required
                className="h-5 w-5 mt-0.5 shrink-0"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 cursor-pointer"
              >
                I agree to the Terms & Conditions and confirm all information
                provided is accurate.
              </label>
            </div>
            {/* Buttons container */}
            <div className="display-flex h-full w-100 justify-evenly">
              <button className="primaryButton" type="submit">
                Submit Application
              </button>
              <button
                className="cancel"
                type="reset"
                onClick={() => {
                  setForm({
                    name: "",
                    accountNo: "",
                    amount: "",
                    tenure: "",
                    description: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoanApplication;
