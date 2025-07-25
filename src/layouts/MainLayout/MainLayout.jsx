import Navbar from "../../components/shared/Navbar/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "./Footer/Footer";
import Hero from "../../components/homePage/Hero/Hero";
import SwiperComponent from "@/components/homePage/SwiperComponent/SwiperComponent";
import HeroElseComponent from "@/components/shared/HeroElseComponent/HeroElseComponent";
import CopyrightComponent from "./Footer/CopyrightComponent";
import { Toaster } from "sonner";

const MainLayout = () => {
  const location = useLocation();
  let heroContent = null;

  if (location.pathname === "/") {
    heroContent = <SwiperComponent />;
  } else {
    heroContent = <HeroElseComponent />;
  }

  return (
    <div>
      <div className="  flex flex-col font-[Laila]">
        <div className=" 2xl:w-9/11 w-[95%] mx-auto my-7 ">
          <Navbar />
        </div>
        <Hero>{heroContent}</Hero>
        <main className="flex-grow flex flex-col justify-center mb-15 2xl:w-9/11 w-[95%] mx-auto ">
          <Outlet />
          <Toaster/>
        </main>
      </div>
      <Footer />
      <hr  />
      <CopyrightComponent />
    </div>
  );
};

export default MainLayout;
