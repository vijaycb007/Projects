import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../../utils/api";

const Register = () => {
  let navigate = useNavigate();

  let [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    phNum: "",
  });

  //* Form input fields handler
  let handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //* Rest functionality handler
  let handleReset = () => {
    setUserData({ username: "", email: "", password: "", phNum: "" });
  };

  //* Form submit handler
  let handleSubmit = (e) => {
    //* Prevent the default functionality of the form 
    e.preventDefault();
    //* Register and store the user data
    api
      .post(`/register`, userData)
      .then((res) => {
        toast.success("User Registered Successfully");
        //* Set form empty after submitting
        setUserData({ username: "", email: "", password: "", phNum: "" });
        //* If user registered, navigate the user to login
        setTimeout(() => {
          navigate("/login");
		  console.log(res);
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
      <div className="registerShell">
        {/* Brand panel - replaces illustration */}
        <div className="authBrandPanel">
          <div className="authBrandGlow"></div>
          <div className="relative">
            <p className="font-bold text-xl mb-2">Mysuru City Bank</p>
            <p className="authBrandBadge">New Account</p>
          </div>
          <div className="relative">
            <p className="font-semibold text-2xl leading-snug mb-3">
              Register Here!
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Fill in your details below to open a savings, current, or
              credit account.
            </p>
          </div>
          <p className="relative text-white/50 text-xs">
            Encrypted · RBI compliant
          </p>
        </div>

        {/* Form panel */}
        <form onSubmit={handleSubmit} className="registerFormPanel">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="authLabel">
                Enter Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                value={userData.username}
                required
                placeholder="Ex: Alex"
                className="authInput"
              />
            </div>

            <div>
              <label htmlFor="email" className="authLabel">
                Enter Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={userData.email}
                required
                placeholder="Ex: Alex@gmail.com"
                className="authInput"
              />
            </div>

            <div className="registerRow">
              <div>
                <label htmlFor="password" className="authLabel">
                  Enter Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={handleChange}
                  value={userData.password}
                  name="password"
                  required
                  placeholder="Ex: Alex@123"
                  className="authInput"
                />
              </div>

              <div>
                <label htmlFor="phNum" className="authLabel">
                  Enter Ph Number
                </label>
                <input
                  type="tel"
                  id="phNum"
                  name="phNum"
                  onChange={handleChange}
                  required
                  value={userData.phNum}
                  placeholder="Ex: 9874563210"
                  className="authInput"
                />
              </div>
            </div>
          </div>

          <div className="authBtnRow">
            <button type="submit" className="authSubmitBtn">
              Submit
            </button>
            <button
              type="reset"
              onClick={handleReset}
              className="authResetBtn"
            >
              Reset
            </button>
          </div>
          {/* //* If want to go for login page */}
          <p className="text-sm text-zinc-500 mt-5 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;