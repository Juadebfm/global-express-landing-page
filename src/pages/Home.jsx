import Header from "../components/Header";
import HomeHero from "../components/HomeHero";
import Numbers from "../components/Numbers";
import HomeAbout from "../components/HomeAbout";

import HomeServices from "../components/HomeServices";
import Clients from "../components/Clients";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <HomeHero />
      <Numbers />
      <HomeAbout />
      <HomeServices />
      <Clients />
      <GetInTouch />
      <Footer /> 
    </div>
  );
};

export default Home;
