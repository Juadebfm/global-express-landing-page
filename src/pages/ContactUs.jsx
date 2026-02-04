import React from "react";
import Footer from "../components/Footer";
import GetInTouch from "../components/GetInTouch";
import Header from "../components/Header";

const ContactUs = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-1 max-sm:pt-2">
        <GetInTouch />
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;