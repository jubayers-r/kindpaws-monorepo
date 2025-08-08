// DashboardTopNavbar.jsx
import { Button } from "@/components/ui/button";
import { LogOut, Menu, PawPrint } from "lucide-react";
import { SheetTrigger, Sheet, SheetContent } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContext } from "@/context/auth/AuthContext";
import { dashboardNavItems } from "@/data/DashboardNavItems";
import { useLocation } from "react-router";
import DarkMode from "@/components/shared/DarkMode";
// import { dashboardNavItems } from "../DashboardNavItems";
// import clsx from "clsx";
// import { home } from "@/layouts/DashboardLayout/DashboardLayout";
// import { Link } from "react-router";

const DashboardTopNavbar = () => {
  const { user, logOut } = useAuth(); // assume logout is available
  const location = useLocation();
  const activeItem = dashboardNavItems.find((item) =>
    item.href.includes(location.pathname)
  );

  return (
    <header className="w-full flex items-center justify-between px-4 border-b bg-background sticky top-0 z-30">
      {/* Center / Title (optional) */}

      {activeItem && (
        <h2 className="text-lg font-semibold dark:text-primary-foreground">
          {activeItem.label}
        </h2>
      )}

      {/* Right side: user info + logout */}
      <div className="flex items-center gap-3">
        {/* <DarkMode/> */}
        <Avatar className={"dark:bg-white"}>
          <AvatarImage src={user?.photoURL || ""} className={"object-cover"} />
          <AvatarFallback >{user?.displayName?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <p className="hidden md:block dark:text-primary-foreground">{user?.displayName}</p>
        <Button variant="destructive" size="sm" onClick={logOut}>
          <LogOut className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline" onClick={logOut}>
            Logout
          </span>
        </Button>
      </div>
    </header>
  );
};

export default DashboardTopNavbar;
