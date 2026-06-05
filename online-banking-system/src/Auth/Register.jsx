import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/register.png";
import { toast, ToastContainer } from "react-toastify";
import api from "../utils/api";

const Register = () => {
  let navigate = useNavigate();

  let [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    phNum: "",
  });

  let handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  let handleReset = () => {
    setUserData({ username: "", email: "", password: "", phNum: "" });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    //* Register and store the user data
    api
      .post(`/register`, userData)
      .then((res) => {
        toast.success("User Registered Successfully");
        setUserData({ username: "", email: "", password: "", phNum: "" });
        //* If user registered, navigate the user to login
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        console.log("error", err);
        toast.error("Registration Failed");
      });
  };
  return (
    <div className="formOuter">
      <ToastContainer />
      <div className="formInner">
        <section className="h-full w-130 display-flex">
          <img src={image} alt="bg" className="h-130 w-130" />
        </section>
        <form onSubmit={handleSubmit} className="form">
          <h1 className="font-bold text-4xl text-blue-500 pb-5">
            Register Here!
          </h1>
          <label htmlFor="username" className="label">
            Enter Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={userData.username}
            required
            placeholder="Ex: Alex"
            className="input"
          />

          <label htmlFor="email" className="label">
            Enter Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={userData.email}
            required
            placeholder="Ex: Alex@gmail.com"
            className="input"
          />

          <label htmlFor="password" className="label">
            Enter Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            value={userData.password}
            name="password"
            required
            placeholder="Ex: Alex@123"
            className="input"
          />

          <label htmlFor="phNum" className="label">
            Enter Ph Number:
          </label>
          <input
            type="tel"
            id="phNum"
            name="phNum"
            onChange={handleChange}
            required
            value={userData.phNum}
            placeholder="Ex: 9874563210"
            className="input"
          />

          <div className="w-full display-flex gap-6 mt-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="primaryButton"
            >
              Submit
            </button>
            <button
              type="reset"
              onClick={handleReset}
              className="secondaryButton"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
