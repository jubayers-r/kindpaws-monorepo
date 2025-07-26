import { MoveUpRight } from "lucide-react";
import { Logo } from "../../../assets/Logo";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { AuthContext } from "@/context/auth/AuthContext";
import { AvatarDropdown } from "./AvatarDropdown";

const Navbar = () => {
  const { user } = useAuth();

  const loginRegister = (
    <>
      {" "}
      <Link to="/register">
        <p className=" text-white border-b hover:brightness-90 ">Register</p>
      </Link>
      <Link to="/login">
        <Button className=" py-4 hover:bg-white hover:text-black ">
          Login
        </Button>
      </Link>
    </>
  );

  return (
    <div className=" py-4 flex items-center justify-between  ">
      {/* logo/ dropdown+logo on mobile */}
      <div className="">
        <Logo />
      </div>
      {/* navcenter */}
      <div className="hidden xl:flex bg-white rounded-full px-8 py-2 shadow-sm">
        <NavLinks />
      </div>
      {/* navend starts */}
      <div className=" flex items-center gap-4 ">
        {user === null ? <>{loginRegister}</> : <AvatarDropdown />}

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
