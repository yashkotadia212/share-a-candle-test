import React from "react";
import TopHeaderResponsive from "../components/TopHeaderResponsive";
import SamplePageName from "../components/SamplePageName";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <TopHeaderResponsive />
      <SamplePageName text="Home" />
      <Footer />
    </div>
  );
};

export default Home;
