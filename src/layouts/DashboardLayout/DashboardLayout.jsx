import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Menu, User, PawPrint, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation } from "react-router";
import clsx from "clsx";
import { NavItems } from "@/data/NavItems";
import { LogoBlack } from "@/assets/Logo";
import { dashboardNavItems } from "@/data/DashboardNavItems";
import DashboardTopNavbar from "@/components/dashboard/DashboardTopNavbar/DashboardTopNavbar";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import axios from "axios";
import { AuthRoleProvider } from "@/context/role/AuthRoleProvider";
import { useAuth } from "@/hooks/useAuth";

const DashboardLayout = () => {
  const home = (
    <Link to="/">
      <Button className="mx-2">Go back to home</Button>
    </Link>
  );
  const location = useLocation();

  const { user } = useAuth();

  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!user?.uid) return;
    const fetchUserRole = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/role", {
          params: { uid: user.uid },
        });
        setRole(res.data.role);
      } catch (err) {
        console.error("Axios error:", err);
      }
    };
    fetchUserRole();
  }, [user?.uid]);

  const filteredNavItems =
    role === "admin"
      ? dashboardNavItems
      : dashboardNavItems.filter((item) => item.roles.includes(role));

  return (
    <div>
      {/* Mobile: Only show on small screens */}

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="sm:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 sm:hidden">
          {filteredNavItems.map((item, i) => (
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
          {home}
        </SheetContent>
        {home}
      </Sheet>

      {/* Desktop: Always visible */}
      <aside className="hidden sm:flex flex-col w-64 p-4 border-r bg-muted h-screen fixed top-0 left-0 z-40 gap-2">
        {filteredNavItems.map((item, i) => (
          <Link
            key={i}
            to={item.href}
            className={clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white transition",
              location.pathname === item.href && "bg-white font-semibold"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
        {home}
      </aside>
      <main className="sm:ml-64">
        <DashboardTopNavbar />
        <AuthRoleProvider user={user}>
          <Outlet />
          <Toaster />
        </AuthRoleProvider>
      </main>
    </div>
  );
};

export default DashboardLayout;
