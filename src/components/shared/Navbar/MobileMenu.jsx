import { DropdownMenu } from "radix-ui";

import { NavItems } from "@/data/NavItems";
import { Link, NavLink, useLocation } from "react-router";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Menu, Icon, LogOut, AxeIcon, PawPrint } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { use } from "react";
import { AuthContext } from "@/context/auth/AuthContext";

const MobileMenu = () => {
  const location = useLocation();
  const { user } = use(AuthContext);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64 sm:hidden">
        {user && (
          <NavLink
            className={clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white transition",
              location.pathname === "/dashboard" && "bg-white font-semibold"
            )}
            to="/dashboard"
          >
            <PawPrint className="h-5 w-5" />
            Dashboard
          </NavLink>
        )}

        {NavItems.map((item, i) => (
          <Link
            key={i}
            to={item.href}
            className={clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white transition",
              location.pathname === item.href && "bg-white font-semibold"
            )}
          >
            <PawPrint className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
        {/* <Button variant="outline" className="mt-4 justify-start gap-3 ">
          <LogOut/>
          Logout
        </Button> */}
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
