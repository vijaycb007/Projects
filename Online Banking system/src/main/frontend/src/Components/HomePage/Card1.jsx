import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Card1 = () => {
  //* Slides data for the carousel.
  //* useMemo makes sure this array is created only once, so React doesn’t rebuild it on every render.
  const slides = useMemo(
    () => [
      {
        id: 1,
        badge: "Welcome Back",
        titleTop: "Your Finances,",
        titleAccent: "Beautifully Managed",
        description:
          "Experience banking reimagined — instant transfers, smart savings, and real-time insights, all in one secure platform.",
        primaryText: "Create Account",
        secondaryText: "Learn More",
        gradient: "from-slate-950 via-slate-800 to-blue-700",
        link: "/accounts/createAccount",
      },
      {
        id: 2,
        badge: "New Feature",
        titleTop: "Zero-Fee Transfers",
        titleAccent: "Across India",
        description:
          "Send money instantly to any bank, anywhere in India. No hidden charges, no waiting — just seamless transactions 24/7.",
        primaryText: "Transfer Now",
        secondaryText: "View Details",
        gradient: "from-slate-900 via-emerald-950 to-green-700",
        link: "/accounts",
      },
      {
        id: 3,
        badge: "Smart Savings",
        titleTop: "Grow Your Wealth",
        titleAccent: "Effortlessly",
        description:
          "Automated savings goals, competitive FD rates, and intelligent spending insights built for your future.",
        primaryText: "Open FD Account",
        secondaryText: "Explore Plans",
        gradient: "from-purple-950 via-violet-900 to-violet-600",
        link: "/fd",
      },
      {
        id: 4,
        badge: "Limited Offer",
        titleTop: "Loans at",
        titleAccent: "7.0% Interest",
        description:
          "Turn your dream into reality with quick approvals, minimal documentation, and flexible EMI options.",
        primaryText: "Apply for Loan",
        secondaryText: "Check Eligibility",
        gradient: "from-red-950 via-orange-900 to-orange-600",
        link: "/loans",
      },
    ],
    [],
  );

  //* Where to navigate
  const navigate = useNavigate();

  //* current → which slide is showing
  const [current, setCurrent] = useState(0);

  //* isPaused → stops autoplay when you hover
  const [isPaused, setIsPaused] = useState(false);

  //* intervalRef → keeps the timer so we can clear it
  const intervalRef = useRef(null);

  //* how long each slide stays (5 seconds)
  const AUTO_DURATION = 4000;

  //* the timer updates every 50 milliseconds (very fast).
  const TICK = 50;

  //* jumps to a specific slide by index
  const goTo = (index) => {
    const nextIndex = (index + slides.length) % slides.length;
    setCurrent(nextIndex);
  };

  useEffect(() => {
    //* stop autoplay when paused
    if (isPaused) return;

    //* every AUTO_DURATION (5s), move to the next slide
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, AUTO_DURATION);

    //* When the component unmounts or isPaused changes, it clears the timer to avoid leaks(memory leaks).
    return () => clearInterval(intervalRef.current);
  }, [isPaused, slides.length]);

  return (
    <section
      className="relative h-150 overflow-hidden bg-slate-950"
      aria-roledescription="carousel"
      aria-label="Homepage highlights"
      //* pause when mouse is over
      onMouseEnter={() => setIsPaused(true)}
      //* resume when mouse leaves
      onMouseLeave={() => setIsPaused(false)}
      //* pause when focused (keyboard/tab)
      onFocus={() => setIsPaused(true)}
      //* resume when focus is lost
      onBlur={() => setIsPaused(false)}
    >
      {/* Iterate all the slides */}
      {slides.map((slide, index) => {
        const isActive = index === current;

        return (
          //* wrapper for each individual slide
          <div
            key={slide.id}
            className={`absolute inset-0 flex items-center justify-center overflow-hidden transition-opacity duration-700 ease-in-out ${isActive
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
              }`}
            aria-hidden={!isActive}
          >
            {/* //* background layer for each slide */}
            <div
              className={`absolute inset-0 bg-linear-to-br ${slide.gradient}`}
            />
            {/* //* Decorative background circles */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-20 -top-20 h-125 w-125 rounded-full border border-white/10 bg-white/5" />
              <div className="absolute -bottom-25 right-20 h-87.5 w-87.5 rounded-full border border-white/5 bg-white/5" />
            </div>
            {/* //* content area for each slide */}
            <div className="relative z-10 max-w-3xl px-6 text-center sm:px-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                {slide.badge}
              </div>
              {/* //* main title of each slide */}
              <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                {slide.titleTop}
                <br />
                <span className="text-orange-400">{slide.titleAccent}</span>
              </h2>
              {/* //* Desciption of the slide */}
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
                {slide.description}
              </p>
              {/* //* Buttons in the slide */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  className="primaryButton"
                  onClick={() => navigate(slide.link)}
                >
                  {slide.primaryText}
                </button>

                <button className="rounded-full border border-white/35 px-8 py-2.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10">
                  {slide.secondaryText}
                </button>
              </div>
            </div>
          </div>
        );
      })}
      //* Navigation dots at bottom to switch slides
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={current === index}
            className={`h-2 transition-all duration-300 ${current === index
              ? "w-7 rounded-md bg-white"
              : "w-2 rounded-full bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Card1;
