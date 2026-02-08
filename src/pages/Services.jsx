import React from "react";
import Header from "../components/Header";
import ServiceHero from "../components/ServiceHero"
import OurServices from "../components/OurServices"
import Clients from "../components/Clients"
import GetInTouch from "../components/GetInTouch"
import Footer from "../components/Footer"

const Services = () => {
  return (
    <div>
      <Header />
      <ServiceHero />
      <OurServices />
      <Clients />
      <GetInTouch />
      <Footer/>
    </div>
  );
};

export default Services;
