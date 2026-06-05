import React from "react";
import { useNavigate } from "react-router-dom";

const Deposits = () => {
  let navigate = useNavigate();
  return (
    <div className="w-full display-flex-col">
      {/* Hero Section */}
      <section className="w-full h-[80vh] hero display-flex-col gap-5">
        <div className="text-6xl text-white font-extrabold font-serif display-flex-col">
          <div>
            <span>
              Earn Upto
              <h2 className="inline text-blue-400 italic font-sans font-semibold">
                7.5% p.a.
              </h2>
            </span>
          </div>
          <h1>on Fixed Deposits</h1>
        </div>
        <p className="w-130 text-lg text-center text-gray-300 font-serif">
          Guaranteed returns. Zero risk. Start with as little as ₹10,000 — no
          market dependency, no surprises.
        </p>
        <div className="w-200 h-10 display-flex justify-evenly text-white text-sm">
          <p className="deposit-hero-tag">
            <i className="fa-solid fa-shield"></i> DICGC Insured up to ₹5,00,000
          </p>
          <p className="deposit-hero-tag">⚡Instant Approval</p>
          <p className="deposit-hero-tag">📅 6 months - 5 years</p>
          <p className="deposit-hero-tag">🔄️ Auto-Renewal Option</p>
        </div>
        <hr className="w-350 text-white/25" />
        <div className="h-40 w-200 text-white display-flex">
          <div className=" border-r border-gray-500 deposit-hero-card">
            <h1 className="font-bold font-serif text-3xl">₹100 Cr+</h1>
            <p className="text-sm text-white/50 font-sans">Total Deposits</p>
          </div>
          <div className="deposit-hero-card border-r border-gray-500">
            <h1 className="font-bold font-serif text-3xl">50,000+</h1>
            <p className="text-sm text-white/50 font-sans">Happy Depositors</p>
          </div>
          <div className="deposit-hero-card border-r border-gray-500">
            <h1 className="font-bold font-serif text-3xl">4.9 / 5</h1>
            <p className="text-sm text-white/50 font-sans">Customer Rating</p>
          </div>
          <div className="deposit-hero-card">
            <h1 className="font-bold font-serif text-3xl">2026</h1>
            <p className="text-sm text-white/50 font-sans">
              Founded with a mission
            </p>
          </div>
        </div>
      </section>
      {/* Plans Section */}
      <section className="h-[110vh] w-full display-flex-col gap-5">
        <div className="display-flex-col">
          <p className="text-blue-500 font-semibold">CHOOSE YOUR PLAN</p>
          <h1 className="text-4xl font-bold font-serif">
            Pick the Right Fixed Deposit
          </h1>
          <p className="text-sm text-gray-500">
            All plans offer guaranteed returns. No hidden charges. No paperwork.
          </p>
        </div>
        {/* Plans Container */}
        <div className="w-[75%] display-flex justify-evenly">
          {/* Plan - 1 */}
          <aside className="deposit-plan">
            <div className="display-plan-icon-container">
              <h1 className="display-plan-icon bg-blue-100/50">📈</h1>
            </div>
            <div className="h-15 w-full display-flex-col items-start">
              <p className="text-md text-gray-400">Short Term</p>
              <h3 className="text-blue-950 font-bold text-2xl font-serif">
                Quick Grow FD
              </h3>
            </div>
            <div className="h-15 w-full display-flex-col justify-evenly items-start">
              <h3 className="text-blue-500 font-bold text-4xl">
                6.5%
                <p className="text-lg text-gray-600 inline"> p.a.</p>
              </h3>
            </div>
            <p className="text-left text-sm text-gray-500">
              Perfect for short goals. Park your money safely and earn
              guaranteed interest in under a year.
            </p>
            <hr className="w-full text-gray-400" />
            <div className="h-10 w-full bg-blue-100/50 rounded-2xl display-flex justify-between px-3">
              <p className="text-gray-500">Tenure</p>
              <p className="font-bold">6 – 12 months</p>
            </div>
            <div className="h-30 w-full display-flex">
              <ul className="list-['✅']">
                <li>Min deposit ₹10,000</li>
                <li>Premature withdrawal allowed</li>
                <li>Monthly interest payout option</li>
                <li>Auto-renew on maturity</li>
              </ul>
            </div>
            <button className="primaryButton w-full rounded-lg">
              Apply Now
            </button>
          </aside>
          {/* Plan - 2 */}
          <aside className="h-[85vh] bg-blue-950 w-85 rounded-2xl border-gray-200 border shadow-2xl p-5 display-flex-col justify-evenly">
            <div className="display-plan-icon-container">
              <h1 className="display-plan-icon bg-white/20 ">🏆</h1>
            </div>
            <div className="h-15 w-full display-flex-col items-start">
              <p className="text-md text-gray-400 font-semibold">Mid Term</p>
              <h3 className="text-white font-bold text-2xl font-serif">
                Prime FD
              </h3>
            </div>
            <div className="h-15 w-full display-flex-col items-start">
              <h3 className="text-blue-500 font-bold text-4xl">
                7.0%
                <p className="text-lg text-gray-300 inline"> p.a.</p>
              </h3>
            </div>
            <p className="text-left text-sm text-gray-300">
              Our best-selling plan. Sweet spot between rate and tenure — chosen
              by most of our depositors.
            </p>
            <hr className="w-full text-gray-400" />
            <div className="h-10 w-full bg-blue-100/50 rounded-2xl display-flex justify-between px-3">
              <p className="text-gray-300 font-semibold">Tenure</p>
              <p className="font-bold text-white">1 – 2 years</p>
            </div>
            <div className="h-40 w-full display-flex text-white">
              <ul className="list-['✅']">
                <li>Min deposit ₹10,000</li>
                <li>Quarterly interest payout</li>
                <li>Loan against FD available</li>
                <li>Auto-renew on maturity</li>
              </ul>
            </div>
            <button className="bg-white font-bold px-8 py-2 rounded-lg transition duration-200 text-blue-950 w-full">
              Apply Now
            </button>
            {/* Plan - 3 */}
          </aside>
          <aside className="deposit-plan">
            <div className="display-plan-icon-container">
              <h1 className="display-plan-icon bg-amber-300/50">🌟</h1>
            </div>
            <div className="h-15 w-full display-flex-col items-start">
              <p className="text-md text-gray-400">Long Term</p>
              <h3 className="text-blue-950 font-bold text-2xl font-serif">
                Max Yield FD
              </h3>
            </div>
            <div className="h-15 w-full display-flex-col items-start">
              <h3 className="text-blue-500 font-bold text-4xl">
                7.5%
                <p className="text-lg text-gray-600 inline"> p.a.</p>
              </h3>
            </div>
            <p className="text-left text-sm text-gray-500">
              Highest rate we offer. Let your money compound over years and
              watch your wealth grow steadily.
            </p>
            <hr className="w-full text-gray-400" />
            <div className="h-10 w-full bg-blue-100/50 rounded-2xl display-flex justify-between px-3">
              <p className="text-gray-500">Tenure</p>
              <p className="font-bold">3 – 5 years</p>
            </div>
            <div className="h-30 w-full display-flex">
              <ul className="list-['✅']">
                <li>Min deposit ₹25,000</li>
                <li>Annual interest payout</li>
                <li>Tax saver option (80C)</li>
                <li>Nomination facility</li>
              </ul>
            </div>
            <button className="secondaryButton w-full rounded-lg">
              Apply Now
            </button>
          </aside>
        </div>
      </section>
      {/* Get started section */}
      <section className="h-30 w-full bg-blue-500 display-flex">
        <aside className="h-30 w-7xl display-flex-col items-start">
          <h1 className="text-3xl font-bold font-serif text-white">
            Ready to Open Your Fixed Deposit?
          </h1>
          <p className="text-lg text-white/75">
            Join thousands of customers growing their wealth with Mysuru City
            Bank
          </p>
        </aside>
        <button
          className="bg-white font-bold px-8 py-2 rounded-lg transition duration-200 text-blue-950"
          onClick={() => {
            navigate("/deposits");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          type="button"
        >
          Apply Now <i className="fa-solid fa-arrow-right-long"></i>
        </button>
      </section>
      {/* info Container */}
      <section className="h-[60vh] w-full display-flex-col gap-3">
        <p className="text-blue-500 font-semibold">WHY CHOOSE US</p>
        <h1 className="text-4xl font-bold font-serif">Banking You Can Trust</h1>
        <p className="text-sm text-gray-500">
          We've built every feature around your peace of mind
        </p>
        <div className="h-65 w-full display-flex gap-5">
          <span className="h-55 w-65 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 display-flex-col px-5 gap-3 border-gray-300 border">
            <h1 className="h-13.5 w-13.5 rounded-xl bg-blue-100/50 display-flex text-2xl">
              <i className="fa-solid fa-shield text-gray-500"></i>
            </h1>
            <h3 className="text-black/70 font-semibold text-xl">
              DICGC Protected
            </h3>
            <p className="text-sm text-gray-500 text-center">
              Your deposits insured up to ₹5,00,000 by the Deposit Insurance &
              Credit Guarantee Corporation.
            </p>
          </span>
          <span className="h-55 w-65 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 display-flex-col px-5 gap-3 border-gray-300 border">
            <h1 className="h-13.5 w-13.5 rounded-xl bg-blue-100/50 display-flex text-2xl">
              ⚡
            </h1>
            <h3 className="text-black/70 font-semibold text-xl">
              Instant Booking
            </h3>
            <p className="text-sm text-gray-500 text-center">
              Open your FD in under 2 minutes. No branch visits, no paperwork,
              no waiting.
            </p>
          </span>
          <span className="h-55 w-65 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 display-flex-col px-5 gap-3 border-gray-300 border">
            <h1 className="h-13.5 w-13.5 rounded-xl bg-blue-100/50 display-flex text-2xl">
              💰
            </h1>
            <h3 className="text-black/70 font-semibold text-xl">
              Flexible Payouts
            </h3>
            <p className="text-sm text-gray-500 text-center">
              Choose monthly, quarterly, or on-maturity interest payouts based
              on your cash flow needs.
            </p>
          </span>
          <span className="h-55 w-65 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 display-flex-col px-5 gap-3 border-gray-300 border">
            <h1 className="h-13.5 w-13.5 rounded-xl bg-blue-100/50 display-flex text-2xl">
              🔄️
            </h1>
            <h3 className="text-black/70 font-semibold text-xl">
              Auto-Renewal
            </h3>
            <p className="text-sm text-gray-500 text-center">
              Forget renewal dates. Your FD auto-renews at the prevailing rate —
              no money left idle.
            </p>
          </span>
        </div>
      </section>
      {/* Footer */}
      <section className="h-17.5 w-full bg-blue-950 display-flex text-gray-400">
        <aside>
          <i className="fa-regular fa-copyright"></i> 2026 Mysuru City Bank. All
          rights reserved |
          <p className="text-white inline">
            Mysuru, Karnataka - 570018, +91 9999988888
          </p>
          | Regulated by the Reserve Bank of India
        </aside>
      </section>
    </div>
  );
};

export default Deposits;
