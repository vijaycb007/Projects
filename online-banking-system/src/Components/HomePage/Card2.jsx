import React from "react";
import { useNavigate } from "react-router-dom";

const Card2 = () => {
  let navigate = useNavigate();

  //* If any buttons in loans clicked -> go to loans page
  let handleApplyLoan = () => {
    navigate("/loans");
  };

  //* If any buttons in deposits clicked -> go to deposits page
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
        <aside className="card">
          <h2 className="card2Heading">Apply For Instant Loan</h2>
          <p className="card2Info">
            Get funds directly to your account within minutes — no paperwork, no
            hassle.
          </p>
          <ul className="card2List">
            <li className="card2ListItems">Amounts from ₹10,000 to ₹5 lakh</li>
            <li className="card2ListItems">
              Flexible repayment from 3–36 months
            </li>
            <li className="card2ListItems">Approval in under 2 minutes</li>
          </ul>
          <div className="card2ButtonsContainer">
            <button className="primaryButton" onClick={handleApplyLoan}>
              Apply Now
            </button>
            <button
              onClick={handleApplyLoan}
              className="card2KnowMoreButtons border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Know More
            </button>
          </div>
        </aside>
        {/* Card - 2 (Deposit) */}
        <aside className="card">
          <h2 className="card2Heading">Apply For Fixed Deposit</h2>
          <p className="card2Info">
            Start earning guaranteed returns on your savings — no risk, no
            market dependency.
          </p>
          <ul className="card2List">
            <li className="card2ListItems">
              Interest rates up to 7.5% per annum
            </li>
            <li className="card2ListItems">Tenure from 6 months to 5 years</li>
            <li className="card2ListItems">DICGC insured up to ₹5,00,000</li>
          </ul>
          <div className="card2ButtonsContainer">
            <button className="secondaryButton" onClick={handleApplyDeposit}>
              Apply Now
            </button>
            <button
              onClick={handleApplyDeposit}
              className="card2KnowMoreButtons border-amber-600 text-amber-600 hover:bg-amber-50"
            >
              Know More
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Card2;
