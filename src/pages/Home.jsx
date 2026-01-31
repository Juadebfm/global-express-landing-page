import React from "react";
import Header from "../components/Header";
import HomeHero from "../components/HomeHero";
import Numbers from "../components/Numbers";
import HomeAbout from "../components/HomeAbout";
import Achievements from "../components/Achievements";
import HomeServices from "../components/HomeServices";

const Home = () => {
  return (
    <div>
      <Header />
      <HomeHero />
      <Numbers />
      <HomeAbout />
      <Achievements />
      <HomeServices />
    </div>
  );
};

export default Home;
