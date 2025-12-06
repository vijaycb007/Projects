// src/components/WelcomeScreen.jsx
import heroImg from '../assets/images/heropage-background.jpg';
function WelcomeScreen({ onLoginClick }) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
      {/* Soft overlay so text card is readable */}
      <div className="w-full min-h-screen bg-gradient-to-r from-slate-900/70 via-slate-900/60 to-slate-900/30 flex items-center">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 lg:px-0 mx-auto">
          {/* Left card */}
          <div
  className="bg-white/80 backdrop-blur-md rounded-[32px] shadow-[0_25px_80px_rgba(15,23,42,0.18)] border border-white/40 px-10 py-12 flex flex-col justify-between transform transition-transform transition-shadow duration-200 ease-out hover:scale-103 hover:shadow-[0_35px_90px_rgba(15,23,42,0.35)]"
>
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
                Inventory
                <br />
                Management
                <br />
                System (IMS)
              </h1> 

              <p className="mt-8 text-base sm:text-lg text-slate-600 max-w-xl">
                Track products, monitor stock levels, and manage sales — all in one clean and efficient dashboard.
              </p>
            </div>

            <button
              onClick={onLoginClick}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all"
            >
              Get Started
            </button>
          </div>

          {/* Right column: no card, just transparent space so background image is visible */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
