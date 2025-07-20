import {
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
    icon: Users,
    href: {
      admin: "/dashboard/admin",
      user: "/dashboard/user",
    },
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
    roles: ["admin", "user"],
  },
  {
    label: "All Donations",
    href: "/all-donations",
    icon: HandCoins,
    roles: ["admin"],
  },
  {
    label: "Add a pet",
    href: "/add-pet",
    icon: PlusCircle,
    roles: ["user"],
  },
  {
    label: "Adoption request",
    href: "/adoption-requests",
    icon: HeartHandshake,
    roles: ["user"],
  },
  {
    label: "Create donation campaigns",
    href: "/create-campaign",
    icon: Megaphone,
    roles: ["user"],
  },
  {
    label: "My donation Campaigns",
    href: "/my-campaigns",
    icon: FolderHeart,
    roles: ["user"],
  },
  {
    label: "My donations",
    href: "/my-donations",
    icon: HandHeart,
    roles: ["user"],
  },
];
