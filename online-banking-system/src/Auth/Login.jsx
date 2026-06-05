import React, { useState } from "react";
import image from "../assets/login.png";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Login = () => {
  let navigate = useNavigate();

  let [email, setEmail] = useState("");

  let [password, setPassword] = useState("");

  let handleEmail = (e) => {
    setEmail(e.target.value);
  };

  let handleReset = () => {
    setEmail("");
    setPassword("");
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    api
      .get(`/register`)
      .then((res) => {
        //* To fetch each data and check if the email and password of a user is present or not
        let user = res.data.find(
          (u) => u.email === email && u.password === password,
        );
        //* If present
        if (user) {
          toast.success("Login Successful!");
          localStorage.setItem("user", JSON.stringify(user));
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          //*cIf nnot present
          toast.error("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="formOuter">
      <ToastContainer />
      <div className="formInner">
        <form onSubmit={handleSubmit} className="form">
          <h1 className="font-bold text-4xl text-blue-500 pb-5">
            Login / SignIn
          </h1>
          <label htmlFor="email" className="label">
            Enter Email:
          </label>
          <input
            type="email"
            id="email"
            onChange={handleEmail}
            className="input"
            name="email"
            value={email}
            required
            placeholder="Ex: Alex@gmail.com"
          />
          <label htmlFor="password" className="label">
            Enter Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={handlePassword}
            className="input"
            name="password"
            value={password}
            required
            placeholder="Ex: Alex@123"
          />
          <div className="w-full display-flex gap-6 mt-2">
            <button type="submit" className="primaryButton">
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="secondaryButton"
            >
              Reset
            </button>
          </div>
        </form>
        <section className="h-full w-130 display-flex">
          <img src={image} alt="bg" className="h-110 w-140" />
        </section>
      </div>
    </div>
  );
};

export default Login;
