import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import image from "../../assets/create.png";
import api from "../../utils/api";

const CreateAccount = () => {
  let naviage = useNavigate();

  //* To handle the form
  let [formData, setFormData] = useState({
    AccName: "",
    Acctype: "Savings",
    InitialBalanace: "",
  });

  //* To handle the changes in the form like user entering the data
  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //*
  let handleSubmit = (e) => {
    e.preventDefault();
    //* Create a account -> insert method
    api
      .post(`/accounts`, {
        ...formData,
        InitialBalanace: parseFloat(formData.InitialBalanace),
      })
      //* handle the api
      .then((res) => {
        console.log(res);
        toast.success("Account Created");
        //* set form empty so another user can input data
        setFormData({
          AccName: "",
          Acctype: "Savings",
          InitialBalanace: "",
        });
        //* After a particular time navigate
        setTimeout(() => {
          naviage("/accounts");
        }, 3000);
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      });
  };
  return (
    <section className="formOuter flex-col">
      {/* Display the toast message */}
      <ToastContainer />
      {/* Main container (image-form) */}
      <div className="formInner">
        {/* Left - image */}
        <div>
          <img src={image} alt="bg" className="h-140 w-120" />
        </div>
        {/* Right - form */}
        <form onSubmit={handleSubmit} className="form">
          <div className="pb-5">
            <h2 className="text-3xl font-semibold text-blue-500">
              Create Account
            </h2>
            <p>Open a new bank account in seconds</p>
          </div>
          <label htmlFor="AccName" className="label">
            Enter Account Holder Name:
          </label>
          <input
            type="text"
            id="AccName"
            placeholder="Enter Account Name:"
            name="AccName"
            className="input"
            onChange={handleChange}
          />
          <label htmlFor="AccType" className="label">
            Select Account Type
          </label>
          <select
            name="Acctype"
            id="Acctype"
            onChange={handleChange}
            className="input"
          >
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
            <option value="Credit">Credit</option>
          </select>
          <label htmlFor="InitialBalanace" className="label">
            Initial Balanace:
          </label>
          <input
            type="number"
            placeholder="Initial Balance"
            id="InitialBalanace"
            name="InitialBalanace"
            className="input"
            onChange={handleChange}
          />
          <div className="flex gap-2">
            <button className="primaryButton">Create Account</button>
            <button className="secondaryButton">Reset</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateAccount;
