import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col justify-center mb-15">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
