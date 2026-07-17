import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  //* to handle email
  let [email, setEmail] = useState("");

  return (
    <div className="formOuter h-[70vh] flex-col">
      {/* Upper container with get started button */}
      <section className="h-40 w-full footer-cta text-white display-flex justify-evenly">
        <aside>
          <h1 className="text-4xl font-bold">Ready To Open Account</h1>
          <p className="text-lg">
            Join Thousands of customers banking smarter with Mysuru City Bank
          </p>
        </aside>
        <aside>
          <button className="border px-4 py-2.5 font-bold text-xl rounded-lg">
            {/* Navigate to accounts if button is clicked */}
            <NavLink to="/accounts">Get Started Today</NavLink>
          </button>
        </aside>
      </section>
      {/* Lower container */}
      <div className="h-100 w-full bg-blue-950 text-white display-flex-col">
        <section className="display-flex justify-evenly gap-15">
          {/* About bank container */}
          <aside className="display-flex-col gap-4">
            <h1 className="text-4xl font-bold">
              <i className="fa-solid fa-building-columns"></i>Mysuru City Bank
            </h1>
            <p className="text-lg h-30 w-80 text-justify">
              Regulated by the Reserve bank of India, Trusted by customers of
              India, Deposits insured by DICGC up to ₹5,00,000.
            </p>
            {/* Icons */}
            <div className="h-15 w-80 display-flex gap-3 mt-4 justify-evenly">
              <div className="footerIcons">
                <i className="fa-brands fa-facebook-f"></i>
              </div>
              <div className="footerIcons">
                <i className="fa-brands fa-youtube"></i>
              </div>
              <div className="footerIcons">
                <i className="fa-brands fa-twitter"></i>
              </div>
              <div className="footerIcons">
                <i className="fa-brands fa-square-linkedin"></i>
              </div>
            </div>
          </aside>
          {/* lists container */}
          <aside className="list">
            <h4 className="h4">SERVICES</h4>
            <ul className="list-none">
              <li className="listItems">Accounts</li>
              <li className="listItems">Cash Loan</li>
              <li className="listItems">Gold Loan</li>
              <li className="listItems">Deposit</li>
            </ul>
          </aside>
          <aside className="list">
            <h4 className="h4">COMPANY</h4>
            <ul className="list-none">
              <li className="listItems">About</li>
              <li className="listItems">Careers</li>
              <li className="listItems">Contact</li>
              <li className="listItems">Press</li>
            </ul>
          </aside>
          <aside className="list">
            <h4 className="h4">LEGAL</h4>
            <ul className="list-none">
              <li className="listItems">Privacy Policy</li>
              <li className="listItems">Grievance</li>
              <li className="listItems">Terms</li>
              <li className="listItems">Fraud Alerts</li>
            </ul>
          </aside>
          {/* Contact us container */}
          <aside className="contact-card">
            <h2>Contact Us</h2>
            <p>Email Us: helpDesk@mysurubank.com</p>
            <p>Call Us: +91 9999988888</p>
            <button className="primaryButton">Subscribe to Newsletter</button>
          </aside>
        </section>
      </div>
      <hr className="text-gray-600" />
      {/* Copyrights container */}
      <div className="h-17.5 w-full bg-blue-950 display-flex justify-evenly text-white">
        <p>
          <i className="fa-regular fa-copyright"></i> 2026 Mysuru City Bank. All
          rights reserved
        </p>
        <p>Mysuru, Karnataka - 570018, +91 9999988888</p>
      </div>
    </div>
  );
};

export default Footer;