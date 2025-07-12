import { MoveUpRight } from "lucide-react";
import Logo from "../../assets/Logo";
import { NavItems } from "../../data/NavItems";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <div className=" p-4 flex items-center justify-between  ">
      {/* logo/ dropdown+logo on mobile */}
      <div className="">
        <Logo />
      </div>
      {/* navcenter */}
      <div className="hidden xl:flex bg-white rounded-full px-8 py-2 shadow-sm">
        <NavLinks />
      </div>
      {/* navend starts */}
      <div className=" flex items-center gap-4">
        {/* <Button className="btn">Toggle</Button> */}

        <p className=" text-white border-b hover:brightness-90 ">Register</p>
        <Button className=" py-4 hover:bg-white hover:text-black ">
          Login
        </Button>
        <div className="w-[1px] h-6 bg-gray-300 rounded-full opacity-60" />
        <Button
          variant="none"
          className="px-6 py-4 min-w-[170px] inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-amber-500 text-black hover:text-white"
        >
          Get In Touch <MoveUpRight />
        </Button>

        <div className="md:hidden text-white ">
          <MobileMenu />
        </div>
      </div>
      {/* navend ends */}
    </div>
  );
};

export default Navbar;
