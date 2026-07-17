import React from "react";

const AboutBank = () => {
  return (
    <div className="h-[70vh] w-full display-flex-col justify-evenly mb-10">
      {/* Heading */}
      <p className="font-bold text-lg text-blue-500">About Us</p>
      <div className="display-flex w-full font-bold text-3xl">
        <h1>
          Simple Banking,{" "}
          <span className="inline italic text-blue-500">Seriously</span>
        </h1>
      </div>
      {/* Info */}
      <p className="w-270 text-center">
        We're a modern bank that actually explains things. No jargon. No
        surprise charges. Just smart tools to grow your money and protect it.
        Founded in Mysuru, trusted across India. Mysuru City Bank was built with
        one goal — make banking feel less like a chore and more like a
        superpower. Whether you're saving for a dream, taking your first loan,
        or just managing daily expenses, we're with you every step of the way.
      </p>
      {/* Card container */}
      <div className="h-60 w-280 display-flex justify-evenly">
        {/* Card - 1 */}
        <div className="aboutCard2">
          <div className="aboutIconWrap">
            <i className="fa-solid fa-users aboutIcon2"></i>
          </div>
          <h1 className="font-bold text-3xl">50,000+</h1>
          <p className="font-medium">Customers Served</p>
        </div>
        {/* Card - 2 */}
        <div className="aboutCard2">
          <div className="aboutIconWrap">
            <i className="fa-solid fa-award aboutIcon2"></i>
          </div>
          <h1 className="font-bold text-3xl">Est. 2018</h1>
          <p className="font-medium">Founded in Mysuru</p>
        </div>
        {/* Card - 3 */}
        <div className="aboutCard2">
          <div className="aboutIconWrap">
            <i className="fa-regular fa-heart aboutIcon2"></i>
          </div>
          <h1 className="font-bold text-3xl">4.9/5</h1>
          <p className="font-medium">Average rating</p>
        </div>
      </div>
    </div>
  );
};

export default AboutBank;