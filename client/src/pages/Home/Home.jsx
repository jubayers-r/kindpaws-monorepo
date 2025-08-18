import AboutUs from "@/components/homePage/AboutUs/AboutUs";
import Apointment from "@/components/homePage/Apointment/Apointment";
import Categories from "@/components/homePage/Categories/Categories";
import CTA from "@/components/homePage/CTA/CTA";
import FAQ from "@/components/homePage/FAQ/FAQ";
import Newsletter from "@/components/homePage/Newsletter/Newsletter";
import Testimonials from "@/components/homePage/Testimonials/Testimonials";

import React from "react";

const Home = () => {
  return (
    <div className="sm:space-y-20 space-y-10 ">
      <Categories />
      <CTA />
      <AboutUs />
      <Testimonials />
      <Apointment/>
      <Newsletter />
      <FAQ />
    </div>
  );
};

export default Home;
