//contact.jsx
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../ThemeContext.jsx";


const Contact = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6btn41f",
        "template_ma1d53n",
        form.current,
        "eioQiRSEqSs0-7aTf"
      )
      .then(
        () => {
          setIsSent(true);
          form.current.reset();
          toast.success("Message sent successfully! ✅", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        },
        (error) => {
          console.error("Error sending message:", error);
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      );
  };

  return (
    <section
      id="contact"
      className={`flex flex-col items-center justify-center py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] ${isLight ? "bg-white" : ""}`}
    >
      <ToastContainer />

      {/* Section Title */}
      <div className="text-center mb-5">
        <h2 className={`text-4xl font-bold ${isLight ? "text-orange-500" : "text-white"}`}>
          CONTACT
        </h2>
        <div className={`w-32 h-1 mx-auto mt-4 ${isLight ? "bg-orange-500" : "bg-purple-500"}`}></div>
        <p className={`mt-4 text-lg font-semibold ${isLight ? "text-gray-600" : "text-gray-400"}`}>
          I’d love to hear from you—reach out for any opportunities or questions!
        </p>
      </div>

      {/* Contact Form */}
      <div
        className={`mt-8 w-full max-w-md p-6 rounded-lg shadow-lg border
        ${isLight
          ? "bg-[#e0f2fe] border-gray-300"
          : "bg-[#0d081f] border-gray-700"}`}
      >
        <h3 className={`text-xl font-semibold text-center ${isLight ? "text-gray-600" : "text-white"}`}>
          Connect With Me <span className="ml-1">🚀</span>
        </h3>

        <form ref={form} onSubmit={sendEmail} className="mt-4 flex flex-col space-y-4">
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className={`w-full p-3 rounded-md border focus:outline-none
            ${isLight
              ? "bg-white text-gray-600 border-gray-300 focus:border-[#fdba74]"
              : "bg-[#131025] text-white border-gray-600 focus:border-purple-500"}`}
          />
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className={`w-full p-3 rounded-md border focus:outline-none
            ${isLight
              ? "bg-white text-gray-600 border-gray-300 focus:border-[#fdba74]"
              : "bg-[#131025] text-white border-gray-600 focus:border-purple-500"}`}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className={`w-full p-3 rounded-md border focus:outline-none
            ${isLight
              ? "bg-white text-gray-600 border-gray-300 focus:border-[#fdba74]"
              : "bg-[#131025] text-white border-gray-600 focus:border-purple-500"}`}
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            required
            className={`w-full p-3 rounded-md border focus:outline-none
            ${isLight
              ? "bg-white text-gray-600 border-gray-300 focus:border-[#fdba74]"
              : "bg-[#131025] text-white border-gray-600 focus:border-purple-500"}`}
          />

          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-md hover:opacity-90 transition
            ${isLight
              ? "bg-gradient-to-r from-orange-500 to-pink-500"
              : "bg-gradient-to-r from-purple-600 to-pink-500"}`}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
