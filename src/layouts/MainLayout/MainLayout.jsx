import Navbar from "../../components/shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Hero from "../../components/homePage/Hero/Hero";

const MainLayout = () => {
  return (
    <div className="  flex flex-col font-[Laila]">
      <div className=" 2xl:w-9/11 w-[95%] mx-auto my-7 ">
        <Navbar />
      </div>
      <Hero />
      <div className="" />
      <main className="flex-grow flex flex-col justify-center mb-15 2xl:w-9/11 w-[95%] mx-auto ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
