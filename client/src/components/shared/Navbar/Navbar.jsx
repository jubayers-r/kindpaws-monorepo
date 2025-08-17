import { MoveUpRight } from "lucide-react";
import { Logo } from "../../../assets/Logo";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { AuthContext } from "@/context/auth/AuthContext";
import { AvatarDropdown } from "./AvatarDropdown";
import { Sun, Moon } from "lucide-react";
import DarkMode from "../DarkMode";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // navbar style change on scroll
      setScrolled(window.scrollY > 10); // 10px scroll triggers the change
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { user } = useAuth();

  return (
    <div
      className={`navbar px-5 transition-all duration-300 mt-2 2xl:w-9/11 w-[95%] mx-auto sm:my-7  fixed left-0 right-0 z-50 py-2 sm:py-5 flex items-center justify-between ${
        scrolled
          ? "shadow-sm dark:shadow-white rounded-full bg-secondary/80 backdrop-blur-md mt-0"
          : ""
      }`}
    >
      {/* logo/ dropdown+logo on mobile */}
      <div>
        <Logo />
      </div>
      {/* navcenter */}
      <div className="hidden lg:flex bg-white rounded-full px-8 py-2 shadow-sm">
        <NavLinks />
      </div>
      {/* navend starts */}
      <div className=" flex items-center gap-4 ">
        <Link to="/register">
          <p className=" text-white border-b hover:brightness-90 sm:block hidden">
            Register
          </p>
        </Link>
        {!user ? (
          <Link to="/login">
            <Button className=" py-4 hover:bg-white hover:text-black ">
              Login
            </Button>
          </Link>
        ) : (
          <AvatarDropdown />
        )}

        {/* Dark Mode Toggle Button */}
        {/* <DarkMode /> */}

        <div className="w-[1px] h-6 bg-gray-300 rounded-full opacity-60 " />
        <Link to="/contact-us">
          <Button
            variant="none"
            className="hidden xl:inline-flex px-6 py-4 min-w-[170px]  items-center justify-center gap-2 rounded-full bg-white hover:bg-amber-500 text-black hover:text-white"
          >
            Get In Touch <MoveUpRight />
          </Button>
        </Link>

        <div className="xl:hidden text-white ">
          <MobileMenu />
        </div>
      </div>
      {/* navend ends */}
    </div>
  );
};

export default Navbar;
