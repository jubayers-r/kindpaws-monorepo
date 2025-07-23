import {
  LayoutDashboard,
  Users,
  PawPrint,
  HandCoins,
  PlusCircle,
  HeartHandshake,
  Megaphone,
  FolderHeart,
  HandHeart,
} from "lucide-react";

export const dashboardNavItems = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
    roles: ["admin", "user"],
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
    roles: ["admin"],
  },
  {
    label: "All pets",
    href: "/dashboard/all-pets",
    icon: PawPrint,
    roles: ["admin"],
  },
  {
    label: "All Donations",
    href: "/dashboard/all-donations",
    icon: HandCoins,
    roles: ["admin"],
  },
  {
    label: "Add a pet",
    href: "/dashboard/add-pet",
    icon: PlusCircle,
    roles: ["user"],
  },
  {
    label: "My added pets (X)",
    href: "/dashboard/my-added-pets",
    icon: PawPrint,
    roles: ["user"],
  },
  {
    label: "Adoption request",
    href: "/dashboard/adoption-requests",
    icon: HeartHandshake,
    roles: ["user"],
  },
  {
    label: "Create donation campaigns",
    href: "/dashboard/create-campaign",
    icon: Megaphone,
    roles: ["user"],
  },
  {
    label: "My donation Campaigns (X)",
    href: "/dashboard/my-campaigns",
    icon: FolderHeart,
    roles: ["user"],
  },
  {
    label: "My donations (X)",
    href: "/dashboard/my-donations",
    icon: HandHeart,
    roles: ["user"],
  },
];
