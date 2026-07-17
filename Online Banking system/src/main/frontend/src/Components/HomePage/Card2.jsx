import React from "react";
import { useNavigate } from "react-router-dom";

const Card2 = () => {
  let navigate = useNavigate();

  //* If buttons in loans clicked -> go to loans page
  let handleApplyLoan = () => {
    navigate("/loans");
  };

  //* If button in Deposit clicked -> go to Deposit page
  let handleApplyDeposit = () => {
    navigate("/deposits");
  };

  return (
    <div className="formOuter flex-col">
      {/* Heading */}
      <h3 className="text-xl font-medium">Banking with Ease</h3>
      <br />
      <h1 className="text-4xl font-bold">Catering All Your Needs</h1>
      <div className="h-100 w-300 flex place-content-evenly items-center">
        {/* Card - 1 (Loan) */}
        <aside className="stat-card loan-card">
          <div className="stat-number">₹5L</div>
          <div className="stat-label">maximum loan amount</div>
          <h2>Apply For Instant Loan</h2>
          <p>
            Get funds directly to your account within minutes — no
            paperwork, no hassle.
          </p>
          <button
            className="stat-card-btn loan-btn"
            onClick={handleApplyLoan}
          >
            Apply Now
          </button>
        </aside>

        {/* Card - 2 (Deposit) */}
        <aside className="stat-card deposit-card">
          <div className="stat-number">7.5%</div>
          <div className="stat-label">interest rate per annum</div>
          <h2>Apply For Deposit</h2>
          <p>
            Start earning guaranteed returns on your savings — no risk, no
            market dependency.
          </p>
          <button className="stat-card-btn deposit-btn" onClick={handleApplyDeposit}>
            Apply Now
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Card2;