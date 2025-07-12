import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Hero from "../../Home/Hero/Hero";

const MainLayout = () => {
  return (
    <div className="min-h-screen  flex flex-col relative font-[Laila]">
      <div className=" 2xl:w-9/11 w-[95%] mx-auto my-7" >
        <Navbar />
      </div>
        <Hero />
      <main className="flex-grow flex flex-col justify-center mb-15  w-8/11 mx-auto ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
