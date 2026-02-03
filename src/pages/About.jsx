import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutHero from "../components/AboutHero";
import AboutAbout from "../components/AboutAbout";
import Achievements from "../components/Achievements";
import OurMission from "../components/OurMission";
import Clients from "../components/Clients";
import GetInTouch from "../components/GetInTouch";


const About = () => {
  return (
    <div>
      <Header />
      <AboutHero />
      <AboutAbout />
      <Achievements />
      <OurMission />
      <Clients />
      <GetInTouch />
      <Footer />
    </div>
  );
};

export default About;
