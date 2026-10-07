import { MoveUpRight } from "lucide-react";
import { Logo, LogoBlack } from "../../../assets/Logo";
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
      className={`navbar px-5 transition-[backdrop-filter,background-color,border-radius] duration-300 mt-2 2xl:w-9/11 w-[95%] mx-auto sm:my-7  fixed left-0 right-0 z-50 py-2 sm:py-5 grid grid-cols-[1fr_auto_1fr] items-center ${
        scrolled ? "rounded-full backdrop-blur-md bg-white/70" : ""
      }`}
    >
      {/* logo/ dropdown+logo on mobile */}
      <div className="relative justify-self-start col-start-1 row-start-1">
        <div
          className={`transition-opacity duration-300 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
        >
          <Logo />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <LogoBlack />
        </div>
      </div>
      {/* navcenter */}
      <div
        className={`hidden lg:flex items-center justify-self-center col-start-2 row-start-1 rounded-full px-8 py-2 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "shadow-none" : "bg-white shadow-sm"
        }`}
      >
        <NavLinks />
      </div>
      {/* navend starts */}
      <div className="flex items-center gap-4 justify-self-end col-start-3 row-start-1">
        {!user && (
          <Link to="/register">
            <p
              className={`border-b hover:brightness-90 sm:block hidden transition-colors duration-300 ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              Register
            </p>
          </Link>
        )}
        {!user ? (
          <Link to="/login">
            <Button className=" py-4 rounded-full hover:bg-white hover:text-black ">
              Login
            </Button>
          </Link>
        ) : (
          <AvatarDropdown />
        )}

        {/* Dark Mode Toggle Button */}
        {/* <DarkMode /> */}

        <div
          className={`w-[1px] h-6 rounded-full opacity-60 transition-colors duration-300 ${
            scrolled ? "bg-black/30" : "bg-gray-300"
          }`}
        />
        <Link to="/contact-us">
          <Button
            variant="none"
            className="hidden xl:inline-flex px-6 py-4 min-w-[170px]  items-center justify-center gap-2 rounded-full border border-black/10 bg-white hover:bg-amber-500 text-black hover:text-white"
          >
            Get In Touch <MoveUpRight />
          </Button>
        </Link>

        <div
          className={`xl:hidden transition-colors duration-300 ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          <MobileMenu />
        </div>
      </div>
      {/* navend ends */}
    </div>
  );
};

export default Navbar;
