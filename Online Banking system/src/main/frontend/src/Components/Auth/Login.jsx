import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";

const Login = () => {

  let navigate = useNavigate();

  let [email, setEmail] = useState("");

  let [password, setPassword] = useState("");

  //* Handle email field
  let handleEmail = (e) => {
    setEmail(e.target.value);
  };

  //* Handle reset function
  let handleReset = () => {
    setEmail("");
    setPassword("");
  };

  //* Handle password field
  let handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //* Handle form submit
  let handleSubmit = (e) => {
    e.preventDefault();
    //* Fetch data from register to check if user is present
    api
      .get(`/register`)
      .then((res) => {

        //* To fetch each data and check if the email and password of a user is present or not
        let user = res.data.data.find(
          (u) => u.email === email && u.password === password,
        );
        //* If present
        if (user) {
          toast.success("Login Successful!");
          //* Store the user details in browser local storage
          localStorage.setItem("user", JSON.stringify(user));
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          //* If not present
          toast.error("Invalid Credentials");
        }
      })
      //* If data cannot be fetched
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="formOuter">
      <ToastContainer />
      {/* //* heading */}
      <div className="loginShell">
        <form onSubmit={handleSubmit} className="loginFormPanel">
          <h1 className="font-bold text-2xl text-zinc-900 pb-1">
            Login / SignIn
          </h1>
          <p className="text-zinc-400 text-sm mb-6">
            Sign in to your Bank account
          </p>
          {/* //* Form container */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="authLabel">
                Enter Email
              </label>
              <input
                type="email"
                id="email"
                onChange={handleEmail}
                className="authInput"
                name="email"
                value={email}
                required
                placeholder="Ex: Alex@gmail.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="authLabel">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                onChange={handlePassword}
                className="authInput"
                name="password"
                value={password}
                required
                placeholder="Ex: Alex@123"
              />
            </div>
          </div>
          {/* //* Submit and Reset button */}
          <div className="authBtnRow">
            <button type="submit" className="authSubmitBtn">
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="authResetBtn"
            >
              Reset
            </button>
          </div>

          {/* //* If want to go for registration page */}
          <p className="text-sm text-zinc-500 mt-5 text-center">
            New here?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </form>

        {/* Brand panel - replaces illustration */}
        <div className="authBrandPanel">
          <div className="authBrandGlow"></div>
          <div className="relative">
            <p className="font-bold text-xl mb-2">Mysuru City Bank</p>
            <p className="authBrandBadge">Secure Sign-In</p>
          </div>
          <div className="relative">
            <p className="font-semibold text-2xl leading-snug mb-3">
              Welcome back!
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Sign in to check balances, move money, and manage your
              accounts.
            </p>
          </div>
          <p className="relative text-white/50 text-xs">
            Encrypted · RBI compliant
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;